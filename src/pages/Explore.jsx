import { useState } from 'react';
import axios from 'axios';
import leaguesDictionary from '../../config/leagues';
import teamDictionary from '../../config/teamDictionary';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const SERVER = import.meta.env.VITE_API_URL;

export default function ExploreTest() {
  const [teams, setTeams] = useState('');
  const [teamName, setTeamName] = useState('');
  const [favLeague, setFavLeague] = useState('');

  const flattenedLeagues = leaguesDictionary.flatMap(Object.values);

  async function getTeam() {
    const teamId = getTeamId(teamName);
    console.log(teamId);

    if (!teamId) {
      console.error(`Team name not found in teamDictionary: ${teamName}`);
      return;
    }
    let dbURL = `${SERVER}/teams/${teamId}`;
    console.log({ dbURL });
    try {
      const response = await axios.get(dbURL);
      const teamData = response.data;
      setTeams(teamData);
      console.log(teamData);
    } catch (error) {
      console.error(error);
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
  }

  function handleTeamSubmit(event) {
    event.preventDefault();
    getTeam();
  }

  const team = teams[0];
  const competition = team?.runningCompetitions[0];
  return (
    <Container>
      <h1 className='title'>Explore</h1>
      <div className='returnDiv d-flex justify-content-center align-items-center'>
        <Form onSubmit={handleTeamSubmit} className='d-flex flex-column align-items-center'>
          <input
            style={{ marginTop: '10px', marginBottom: '15px' }}
            onChange={updateTeamQuery}
          />
          <Button type='submit' variant='info' style={{ margin: '10px' }}>
            Explore Team!
          </Button>
        </Form>
        <Form onSubmit={handleTeamSubmit}>
      <Stack gap={3}>
        <InputGroup size='lg'>
          <InputGroup.Text>Favorite League</InputGroup.Text>
          <Form.Select id='favLeague' value={favLeague} onChange={updateLeagueQuery}>
            {flattenedLeagues.map((league) =>
              <option key={league.compId} value={league.compId}>{league.name}</option>
            )}
          </Form.Select>
        </InputGroup>
        <InputGroup size='lg'>
          <InputGroup.Text>Favorite Team</InputGroup.Text>
          <Form.Select id='favTeam' value={teamName} onChange={updateTeamQuery}>
            {teamDictionary
              .filter((team) => team.runningCompetitions
              .some((competition) => competition.id === parseInt(favLeague)))
              .map((team) =>
                <option key={team.id} value={team.id}>{team.name}</option>
              )}
          </Form.Select>
        </InputGroup>
        <Button type='submit' variant='success'>Submit</Button>
      </Stack>
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
    </Container>
  );
}
