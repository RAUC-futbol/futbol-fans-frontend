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
    <h1 className='title'>Dashboard</h1>
    <Row>
      {teamStandings.map((teamData) => (
        <Col key={teamData.team._id} xs={12} md={6}>
           <div style={{ margin: '10px' }}>
              <TeamCard team={teamData.team} />
            </div>
            <div style={{ margin: '10px' }}>
              <TeamStats teamInfo={teamInfo} />
            </div>
        </Col>
      ))}
      <Col xs={6} md={6}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
            <LeagueStandings
              selectedLeague={selectedLeague}
              leagueStandings={leagueStandings}
            />
          </div>
        </Col>
    </Row>
  </Container>
  );
}
