// react
import { useState, useEffect } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// server API
const SERVER = import.meta.env.VITE_API_URL;

function Matches({ teamId }) {
  const [results, setResults] = useState({});
  const [allMatches, setAllMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);
  const [activeMatches, setActiveMatches] = useState([]);
  const [matchesToRender, setMatchesToRender] = useState([]);

  useEffect(() => {
    getMatches();
  }, []);

  async function getMatches(params) {
    const url = `${SERVER}/matches/team/${teamId}`;

    try {
      const response = await axios.get(url, { params });
      const resultsResponse = response.data.results;
      const matchesResponse = response.data.matches;

      setResults(resultsResponse);
      setPastMatches(matchesResponse.past);
      setFutureMatches(matchesResponse.future);
      setActiveMatches(matchesResponse.active);
      setAllMatches([
        ...matchesResponse.active,
        ...matchesResponse.past,
        ...matchesResponse.future,
      ]);
      setMatchesToRender([
        ...matchesResponse.active,
        ...matchesResponse.past,
        ...matchesResponse.future,
      ]);
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
    <>
      <h1 className='title'>Matches</h1>
      <Stack>
        <MatchesForm
          filterMatches={filterMatchesData}
          updateMatches={getMatches}
        />

        <MatchesTable matches={matchesToRender} />
      </Stack>
    </>
  );
}

function MatchesTable({ matches }) {
  return (
    <Table size='sm' striped>
      <thead>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Matchday</th>
          <th>Home</th>
          <th>Score</th>
          <th>Away</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) => (
          <tr key={match.match.id}>
            <td>{match.match.status}</td>
            <td>{match.match.date}</td>
            <td>{match.match.matchday}</td>
            <td>{match.homeTeam.name}</td>
            <td>{match.result.homeScore}</td>
            <td>{match.awayTeam.name}</td>
            <td>{match.result.awayScore}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function MatchesForm({ filterMatches, updateMatches }) {
  const [season, setSeason] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  function filterStatus(event) {
    filterMatches(event.target.value);
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
      dateTo: dateTo,
    };

    updateMatches(queryParams);

    console.log({ queryParams });
  }

  return (
    <Form>
      <Row>
        <Col>
          <InputGroup size='sm'>
            <InputGroup.Text>Status</InputGroup.Text>
            <Form.Select onChange={filterStatus}>
              <option value='all'>All</option>
              <option value='past'>Finished</option>
              <option value='future'>Scheduled</option>
              <option value='active'>In Play</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup size='sm'>
            <InputGroup.Text>Season</InputGroup.Text>
            <Form.Select id='season' onChange={handleQueryChange}>
              <option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
            </Form.Select>
            <InputGroup.Text>From</InputGroup.Text>
            <Form.Control
              id='dateFrom'
              type='date'
              onChange={handleQueryChange}
            ></Form.Control>
            <InputGroup.Text>To</InputGroup.Text>
            <Form.Control
              id='dateTo'
              type='date'
              onChange={handleQueryChange}
            ></Form.Control>
            <Button onClick={queryMatches}>Update</Button>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
}

export default Matches;
