import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamCard from '../components/TeamCard';
import LeagueStandings from '../components/LeagueStandings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import leaguesDictionary from '../../config/leagues';
import teamDictionary from '../../config/teamDictionary';

const SERVER = import.meta.env.VITE_API_URL;

export default function Standings({ user }) {
  const [teamStandings, setTeamStandings] = useState([]);
  const [leagueStandings, setLeagueStandings] = useState([]);

  useEffect(() => {
    fetchLeagueStandings();
    fetchTeamStandings();
  }, [user.favLeague, user.favTeam]);

  async function fetchTeamStandings() {
    const selectedLeagueCode = getLeagueCode(user.favLeague);
    const selectedTeamName = getTeamName(user.favTeam);
    // console.log({ selectedLeagueCode });
    // console.log({ selectedTeamName });
    const dbURL = `${SERVER}/standings/team/${selectedLeagueCode}/${selectedTeamName}`;
    if (!selectedTeamName) {
      console.error(
        `Team name not found in teamDictionary with ID: ${user.favTeam}`
      );
      return;
    }

    try {
      // console.log('Team Standings url: ', dbURL);
      const leagueResponse = await axios.get(dbURL);
      setTeamStandings(leagueResponse.data);
      console.log('Fetched team standings: ', leagueResponse.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchLeagueStandings() {
    const selectedLeagueCode = getLeagueCode(user.favLeague);
    // console.log('Selected League Code:', selectedLeagueCode);

    if (!selectedLeagueCode) {
      return;
    }

    const dbURL = `${SERVER}/standings/${selectedLeagueCode}`;

    try {
      // console.log('fetchStandings url: ', dbURL);
      const response = await axios.get(dbURL);
      setLeagueStandings(response.data);
      console.log('Fetched league standings: ', response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function getLeagueCode(compId) {
    // Use flatMap to flatten the array of league objects
    const flattenedLeagues = leaguesDictionary.flatMap(Object.values);

    const leagueEntry = flattenedLeagues.find(
      (data) => data.compId === parseInt(compId, 10)
    );

    return leagueEntry ? leagueEntry.leagueCode : null;
  }

  function getTeamName(teamId) {
    const teamEntry = teamDictionary.find((team) => team.id === teamId);
    return teamEntry ? teamEntry.name : null;
  }

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
            leaguesDictionary={leaguesDictionary}
          />
        </Col>
      </Row>
    </Container>
  );
}
