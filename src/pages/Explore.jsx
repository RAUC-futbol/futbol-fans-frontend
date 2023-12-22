import { useState } from 'react';
import axios from 'axios';
import leaguesDictionary from '../../config/leagues';
import teamDictionary from '../../config/teamDictionary';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import LeagueStandings from '../components/LeagueStandings';

const SERVER = import.meta.env.VITE_API_URL;

export default function Explore({ getLeagueCode }) {
  const [teams, setTeams] = useState('');
  const [teamName, setTeamName] = useState('');
  const [favLeague, setFavLeague] = useState('');
  const [leagueStandings, setLeagueStandings] = useState([]);
  const [leagueCode, setLeagueCode] = useState([]);

  const flattenedLeagues = leaguesDictionary.flatMap(Object.values);

  async function getTeam() {
    const teamId = getTeamId(teamName);
    // console.log(teamId);

    if (!teamId) {
      console.error(`Team name not found in teamDictionary: ${teamName}`);
      return;
    }
    let dbURL = `${SERVER}/teams/${teamId}`;
    // console.log({ dbURL });
    try {
      const response = await axios.get(dbURL);
      const teamData = response.data;
      setTeams(teamData);
      // console.log(teamData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLeagueStandings() {
    const selectedLeagueCode = getLeagueCode(favLeague);
    // console.log('Selected League Code:', selectedLeagueCode);

    if (!selectedLeagueCode) {
      return;
    }

    const dbURL = `${SERVER}/standings/${selectedLeagueCode}`;
    // console.log({dbURL})

    try {
      console.log('fetchStandings url: ', dbURL);
      const response = await axios.get(dbURL);
      setLeagueStandings(response.data);
      setLeagueCode(selectedLeagueCode);
      console.log('Fetched league standings: ', response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function getTeamId(teamName) {
    const lowerCaseTeamName = teamName.toLowerCase();
    const teamEntry = teamDictionary.find((team) =>
      team.name.toLowerCase().includes(lowerCaseTeamName)
    );
    return teamEntry ? teamEntry.id : null;
  }

  function updateTeamQuery(event) {
    setTeamName(event.target.value);
  }

  function updateLeagueQuery(event) {
    setFavLeague(event.target.value);
    // console.log(favLeague);
  }

  function handleTeamSubmit(event) {
    event.preventDefault();
    getTeam();
  }

  function handleLeagueSubmit(event) {
    event.preventDefault();
    // console.log(favLeague)
    fetchLeagueStandings();
  }

  const team = teams[0];
  const competition = team?.runningCompetitions[0];
  return (
    <Container>
      <h1 className='title'>Explore</h1>
      <div className='forms-section d-flex flex-column align-items-center'>
        <Form
          onSubmit={handleTeamSubmit}
          className='mb-3'
        >
          <input
            style={{ marginTop: '10px', marginBottom: '15px' }}
            onChange={updateTeamQuery}
          />
          <Button type='submit' variant='info' style={{ margin: '10px' }}>
            Explore Team!
          </Button>
        </Form>
        <Form onSubmit={handleLeagueSubmit}>
          <InputGroup size='lg'>
            <InputGroup.Text>Explore Leagues</InputGroup.Text>
            <Form.Select
              id='favLeague'
              onChange={updateLeagueQuery}
              value={favLeague}
            >
              {flattenedLeagues.map((league) => (
                <option key={league.compId} value={league.compId}>
                  {league.name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
          <Button type='submit' variant='info' style={{ margin: '10px' }}>
            Explore Leagues!
          </Button>
        </Form>

        {team && (
          <Card style={{ width: '36rem' }} className='mx-auto'>
            <Card.Header className='card-title'>{team?.name}</Card.Header>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                overflow: 'hidden',
              }}
            >
              <img
                src={team?.crest}
                alt={team?.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <ListGroup variant='flush'>
              <ListGroup.Item className='listGroup'>
                Year Founded: {team?.founded}
              </ListGroup.Item>
              <ListGroup.Item className='listGroup'>
                Address: {team?.address}
              </ListGroup.Item>
              <ListGroup.Item className='listGroup'>
                TLA: {team?.tla}
              </ListGroup.Item>
              <ListGroup.Item className='listGroup'>
                Competition Name: {competition?.name}
              </ListGroup.Item>
              <ListGroup.Item className='listGroup'>
                Competition Type: {competition?.type}
              </ListGroup.Item>
              <ListGroup.Item className='listGroup'>
                Coach Name: {team?.coach.name}
              </ListGroup.Item>
              <ListGroup.Item className='listGroup'>
                <h5>List of Players</h5>
                <ul>
                  {team?.squad.map((person, index) => (
                    <li key={index}>
                      <p>
                        Name: {person.name}; Position: {person.position};
                        Nationality: {person.nationality}{' '}
                      </p>
                    </li>
                  ))}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )}
      </div>
      <LeagueStandings selectedLeague={leagueCode} leagueStandings={leagueStandings}/>
    </Container>
  );
}
