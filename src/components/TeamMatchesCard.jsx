// react
import { useState, useEffect } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
// server API
const SERVER = import.meta.env.VITE_API_URL;

function TeamMatchesCard({ teamId }) {

  const [lastMatch, setLastMatch] = useState();
  const [nextMatch, setNextMatch] = useState();
  const [match, setMatch] = useState();

  useEffect(() => {
    // getMatches();
  }, []);

  async function getMatches() {
    const url = `${SERVER}/matches/team/${teamId}`;

    try {

      const response = await axios.get(url);
      const matchesResponse = response.data.matches;

      setLastMatch(matchesResponse.past[matchesResponse.past.length - 1]);
      setNextMatch(matchesResponse.future[0]);
      setMatch(matchesResponse.past[matchesResponse.past.length - 1])

    } catch (error) {
      console.error(error.message);
    }
  }

  function toggleMatch(event) {
    event.target.id === 'next' ? setMatch(nextMatch) : setMatch(lastMatch);
  }

  return (
    (match && <Card style={{ width: '20rem' }}>

      <Card.Img variant='top' src={match.homeTeam.crest} alt={match.homeTeam.name} />

      <Card.Header>
        <Nav fill variant="tabs" defaultActiveKey="#last">
          <Nav.Item>
            <Nav.Link href="#last" id='last' onClick={toggleMatch}>Last Match</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#next" id='next' onClick={toggleMatch}>Next Match</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Home: {match.homeTeam.name}</ListGroup.Item>
          <ListGroup.Item>
            {match.homeTeam.tla} : {match.result.homeScore} | {match.awayTeam.tla} : {match.result.awayScore}
          </ListGroup.Item>
          <ListGroup.Item>Away: {match.awayTeam.name}</ListGroup.Item>
        </ListGroup>
      </Card.Body>

      <Card.Footer>
        {match.match.date}
      </Card.Footer>

      <Card.Img variant='bottom' src={match.awayTeam.crest} alt={match.awayTeam.name} />

    </Card>)
  )
}

export default TeamMatchesCard;
