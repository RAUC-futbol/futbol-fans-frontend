import TeamCard from '../components/TeamCard';
import TeamStats from '../components/TeamStats'
import LeagueStandings from '../components/LeagueStandings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Dashboard({
  teamInfo,
  teamStandings,
  leagueStandings,
  selectedLeague,
}) {
  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        {teamStandings.map((teamData) => (
          <Col key={teamData.team._id} xs={12} md={6}>
            <TeamCard team={teamData.team} />
          </Col>
        ))}
        {/* LeagueStandings */}
        <Col xs={12} md={6}>
        <TeamStats teamInfo={teamInfo}/>
          <LeagueStandings
            selectedLeague={selectedLeague}
            leagueStandings={leagueStandings}

          />
          
        </Col>
      </Row>
      </Container>
  );
}
