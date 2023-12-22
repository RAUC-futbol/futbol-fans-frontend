import TeamCard from '../components/TeamCard';
import TeamStats from '../components/TeamStats';
import LeagueStandings from '../components/LeagueStandings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeamMatchesCard from '../components/TeamMatchesCard';
import { CardGroup } from 'react-bootstrap';

export default function Dashboard({
  teamInfo,
  teamStandings,
  leagueStandings,
  selectedLeague,
  teamId,
}) {
  return (
    <Container>
      <h1 className='title'>Dashboard</h1>
      <Row>
        <CardGroup>
          {teamStandings.map((teamData) => (
            <Col key={teamData.team._id} xs={12} md={4}>
              <div style={{ margin: '10px' }}>
                <TeamStats teamInfo={teamInfo} />
              </div>
              <div style={{ margin: '10px' }}>
                <TeamCard team={teamData.team} />
              </div>
            </Col>
          ))}
          <Col xs={12} md={4}>
            {/* Adjust the width as needed */}
            <div style={{ margin: '10px' }}>
              <TeamMatchesCard teamId={teamId} />
            </div>
          </Col>
        </CardGroup>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '5px',
            }}
          >
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
