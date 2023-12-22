import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import teamDictionary from '../../config/teamDictionary';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const SERVER = import.meta.env.VITE_API_URL;

export default function ExploreTest() {
  const [teams, setTeams] = useState('');
  const [teamName, setTeamName] = useState('');

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
    const teamEntry = teamDictionary.find((team) => team.name.toLowerCase().includes(lowerCaseTeamName));
    return teamEntry ? teamEntry.id : null;
  }
  

  function updateQuery(event) {
    setTeamName(event.target.value);
  }

  const team = teams[0];
  const competition = team?.runningCompetitions[0];
  return (
    <Container>
      <h1 className='title'>Explore</h1>
    <div className='returnDiv'>
      {/* Wrap the input and button in a form */}
      <form onSubmit={(event) => { event.preventDefault(); getTeam(); }}>
        <input
          style={{ marginTop: '10px', marginBottom: '15px' }}
          onChange={updateQuery}
        />
        <Button type='submit' variant='info' style={{ margin: '10px' }}>
          Explore Team!
        </Button>
      </form>
      {team && (
      <Card style={{ width: '36rem' }}>
        <Card.Header>{team?.name}</Card.Header>
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
