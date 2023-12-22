import TeamCard from '../components/TeamCard';
import LeagueStandings from '../components/LeagueStandings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import leaguesDictionary from '../../config/leagues';


export default function Standings({ user, teamStandings, leagueStandings }) {

  function getLeagueCode(compId) {
    // Use flatMap to flatten the array of league objects
    const flattenedLeagues = leaguesDictionary.flatMap(Object.values);

    const leagueEntry = flattenedLeagues.find(
      (data) => data.compId === parseInt(compId, 10)
    );

    return leagueEntry ? leagueEntry.leagueCode : null;
  }


  return (
    <>
    <Container>
    <h1 className='title'>Standings</h1>
      <Row>
        {teamStandings.map((teamData) => (
          <Col key={teamData.team._id} xs={12} md={6}>
            <TeamCard team={teamData.team} />
          </Col>
        ))}
        <Col xs={12} md={6}>
          <LeagueStandings
            selectedLeague={getLeagueCode(user.favLeague)}
            leagueStandings={leagueStandings}
          />
        </Col>
      </Row>
    </Container>
    </>
  );
}
