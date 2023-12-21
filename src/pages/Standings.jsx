import TeamCard from '../components/TeamCard';
import LeagueStandings from '../components/LeagueStandings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Standings({
  teamStandings,
  leagueStandings,
  selectedLeague,
  leaguesDictionary,
}) {
  return (
    <Container>
      <h1>Standings</h1>
      <Row>
        {teamStandings.map((teamData) => (
          <Col key={teamData.team._id} xs={12} md={6}>
            <TeamCard team={teamData.team} />
          </Col>
        ))}
        {/* LeagueStandings */}
        <Col xs={12} md={6}>
          <LeagueStandings
            selectedLeague={selectedLeague}
            leagueStandings={leagueStandings}
            leaguesDictionary={leaguesDictionary}
          />
        </Col>
      </Row>
    </Container>
  );
}
