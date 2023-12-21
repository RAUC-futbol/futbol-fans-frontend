import axios from 'axios';
import { useEffect, useState } from 'react';
import TeamCard from '../components/TeamCard';
import LeagueStandings from '../components/LeagueStandings';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import leaguesDictionary from '../../config/leagues';

const SERVER = import.meta.env.VITE_API_URL;

export default function Standings({
  user
}) {
  const [teamStandings, setTeamStandings] = useState([]);
  const [leagueStandings, setLeagueStandings] = useState([]);

  useEffect(() => {
    fetchLeagueStandings();
    fetchTeamStandings();
  }, [user.favLeague, user.favTeam]);

  console.log('user.favLeague:', user.favLeague);


  async function fetchTeamStandings() {
    console.log('user.favLeague:', user.favLeague);
    const selectedLeagueCode = getLeagueCode(user.favLeague);
    console.log({selectedLeagueCode})
    const dbURL = `${SERVER}/standings/team/${selectedLeagueCode}/${user.favTeam}`;

    try {
      console.log('url: ', dbURL);
      const leagueResponse = await axios.get(dbURL);
      setTeamStandings(leagueResponse.data);
      console.log('Fetched team standings: ', leagueResponse.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchLeagueStandings() {
    const selectedLeagueCode = getLeagueCode(user.favLeague);
    console.log('Selected League Code:', selectedLeagueCode);

    if (!selectedLeagueCode) {
      // Handle the case where selectedLeagueCode is null
      return;
    }

    const dbURL = `${SERVER}/standings/${selectedLeagueCode}`;

    try {
      console.log('fetchStandings url: ', dbURL);
      const response = await axios.get(dbURL);
      console.log('API Response:', response);
      setLeagueStandings(response.data);
      console.log('Fetched league standings: ', response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function getLeagueCode(leagueId) {
    console.log('Trying to find league with ID:', leagueId);
  
    // Use flatMap to flatten the array of league objects
    const flattenedLeagues = leaguesDictionary.flatMap(Object.values);
  
    const leagueEntry = flattenedLeagues.find(data => data.compId === parseInt(leagueId, 10));
  
    console.log('Found league entry:', leagueEntry);
    return leagueEntry ? leagueEntry.leagueCode : null;
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
