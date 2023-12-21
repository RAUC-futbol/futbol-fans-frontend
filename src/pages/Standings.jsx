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

  // function getTeamName(teamId) {
  //   const teamEntry = teamDictionary.find((team) => team.id === teamId);
  //   return teamEntry ? teamEntry.name : null;
  // }


  return (
    <Container>
      <h1>Standings</h1>
      <p>{JSON.stringify(user)}</p>
      <Row>
        {teamStandings.map((teamData) => (
          <Col key={teamData.team._id} xs={12} md={6}>
            <TeamCard team={teamData.team} />
          </Col>
        ))}
        {/* LeagueStandings */}
        <Col xs={12} md={6}>
          <LeagueStandings
            selectedLeague={getLeagueCode(user.favLeague)}
            leagueStandings={leagueStandings}
          />
        </Col>
      </Row>
    </Container>
  );
}
