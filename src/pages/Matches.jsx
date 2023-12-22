// react
import { useState, useEffect } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
// server API
const SERVER = import.meta.env.VITE_API_URL;
// league and team data
import leaguesDictionary from '../../config/leagues';
import teamDictionary from '../../config/teamDictionary';
// components
import TeamMatchesCard from '../components/TeamMatchesCard';

function Matches({ user }) {

  const [allMatches, setAllMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);
  const [activeMatches, setActiveMatches] = useState([]);
  const [matchesToRender, setMatchesToRender] = useState([]);

  useEffect(() => {
    getMatches();
  }, []);

  async function getMatches(team = user.favTeam, params) {
    const url = `${SERVER}/matches/team/${team}`;

    try {

      const response = await axios.get(url, { params });
      const matchesResponse = response.data.matches;

      setPastMatches(matchesResponse.past);
      setFutureMatches(matchesResponse.future);
      setActiveMatches(matchesResponse.active);
      setAllMatches([...matchesResponse.active, ...matchesResponse.past, ...matchesResponse.future]);
      setMatchesToRender([...matchesResponse.active, ...matchesResponse.past, ...matchesResponse.future]);

    } catch (error) {
      console.error(error.message);
    }
  }

  function filterMatchesData(statusFilter) {
    if (statusFilter === 'past') {
      setMatchesToRender(pastMatches);
    } else if (statusFilter === 'future') {
      setMatchesToRender(futureMatches);
    } else if (statusFilter === 'active') {
      setMatchesToRender(activeMatches);
    } else {
      setMatchesToRender(allMatches);
    }
  }

  return (
    <Container fluid>
      <Row>

        <Col xs={6} md={2} className='d-flex justify-content-center'>
          <TeamMatchesCard teamId={user.favTeam} />
        </Col>

        <Col xs={12} md={10} className='d-flex justify-content-center'>
          <Stack gap={2}>

            <MatchesForm filterMatches={filterMatchesData} updateMatches={getMatches} user={user} updateTeam={getMatches} />

            <MatchesTable matches={matchesToRender} />

          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

function MatchesTable({ matches }) {

  return (
    <Table size='sm' striped hover>
      <thead>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Competition</th>
          <th>Matchday</th>
          <th>Home</th>
          <th>Score</th>
          <th>Away</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) =>
          <tr key={match.match.id}>
            <td>{match.match.status}</td>
            <td>{match.match.date}</td>
            <td>
              <Image src={match.competition.emblem} alt='competition league emblem' style={{ width: '2rem' }} thumbnail />
              {match.competition.name}
            </td>
            <td>{match.match.matchday}</td>
            <td>
              <Image src={match.homeTeam.crest} alt='team crest' style={{ width: '2rem' }} thumbnail />
              {match.homeTeam.name}
            </td>
            <td>{match.result.homeScore}</td>
            <td>
              <Image src={match.awayTeam.crest} alt='team crest' style={{ width: '2rem' }} thumbnail />
              {match.awayTeam.name}
            </td>
            <td>{match.result.awayScore}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function MatchesForm({ filterMatches, updateMatches, user }) {

  const [season, setSeason] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [selectedLeague, setSelectedLeague] = useState(user.favLeague);
  const [selectedTeam, setSelectedTeam] = useState(user.favTeam);

  const flattenedLeagues = leaguesDictionary.flatMap(Object.values);

  function handleTeamChange(event) {
    const field = event.target.id;
    const value = event.target.value;

    if (field === 'league') {
      setSelectedLeague(value);
    } else if (field === 'team') {
      setSelectedTeam(value);
    }
  }

  function updateTeam() {
    updateMatches(selectedTeam);
  }

  function filterStatus(event) {
    filterMatches(event.target.value)
  }

  function handleQueryChange(event) {
    const queryField = event.target.id;
    const value = event.target.value;

    if (queryField === 'season') {
      setSeason(value);
    } else if (queryField === 'dateFrom') {
      setDateFrom(value);
    } else if (queryField === 'dateTo') {
      setDateTo(value);
    }
  }

  function queryMatches() {
    const queryParams = {
      season: season,
      dateFrom: dateFrom,
      dateTo: dateTo
    };

    updateMatches(selectedTeam, queryParams);

  }

  return (
    <Form>
      <Stack gap={2}>
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Text>League</InputGroup.Text>
              <Form.Select id='league' onChange={handleTeamChange} value={selectedLeague}>
                {flattenedLeagues.map((league) =>
                  <option key={league.compId} value={league.compId}>{league.name}</option>
                )}
              </Form.Select>
              <InputGroup.Text>Team</InputGroup.Text>
              <Form.Select id='team' onChange={handleTeamChange} value={selectedTeam}>
                {teamDictionary
                  .filter((team) => team.runningCompetitions
                    .some((competition) => competition.id === parseInt(selectedLeague)))
                  .map((team) =>
                    <option key={team.id} value={team.id}>{team.name}</option>
                  )}
              </Form.Select>
              <Button onClick={updateTeam}>Update Team</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Text>Status</InputGroup.Text>
              <Form.Select onChange={filterStatus}>
                <option value="all">All</option>
                <option value="past">Finished</option>
                <option value="future">Scheduled</option>
                <option value="active">In Play</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>Filters:</InputGroup.Text>
              <InputGroup.Text>Season</InputGroup.Text>
              <Form.Select id='season' onChange={handleQueryChange}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </Form.Select>
              <InputGroup.Text>From</InputGroup.Text>
              <Form.Control id='dateFrom' type='date' onChange={handleQueryChange}></Form.Control>
              <InputGroup.Text>To</InputGroup.Text>
              <Form.Control id='dateTo' type='date' onChange={handleQueryChange}></Form.Control>
              <Button onClick={queryMatches}>Update Filters</Button>
            </InputGroup>
          </Col>
        </Row>
      </Stack>
    </Form >
  )
}

export default Matches;
