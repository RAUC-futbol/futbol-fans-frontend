import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default function TeamStats({ teamInfo }) {
  // Check if teamInfo is undefined or an empty array
  if (!teamInfo || teamInfo.length === 0) {
    // You can render a loading state or an error message here
    return <p>Loading team information...</p>;
  }

  const teamStats = teamInfo[0];
  return (
    <Container>
      {/* <p>{JSON.stringify()}</p> */}
      <Card style={{ width: '15rem' }}>
        <Card.Img
          variant='top'
          src={teamStats.crest}
          alt={`${teamStats.name} Crest`}
        />
        <Card.Body>
          <Card.Title>{teamStats.name}</Card.Title>
          <Card.Text>
            Founded: {teamStats.founded} <br />
            Address: {teamStats.address} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}