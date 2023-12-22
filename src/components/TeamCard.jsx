import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const TeamCard = ({ team }) => {
    return (
        <Container>
        <Card style={{ width: '15rem' }}>
          <Card.Img variant="top" src={team.crest} alt={`${team.name} Crest`} />
          <Card.Body>
            <Card.Title className='card-title'>{team.name}</Card.Title>
            <Card.Text>
              Position: {team.position} <br />
              Played Games: {team.playedGames} <br />
              Won: {team.won} <br />
              Draw: {team.draw} <br />
              Lost: {team.lost} <br />
              Points: {team.points} <br />
              Goals For: {team.goalsFor} <br />
              Goals Against: {team.goalsAgainst} <br />
              Goal Difference: {team.goalDifference} <br />
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
      );
    };

  export default TeamCard;