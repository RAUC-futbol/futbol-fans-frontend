import axios from 'axios';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Standings from './pages/Standings';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Filters from './components/Filters';
// import leaguesDictionary from '../config/leagues';

const SERVER = import.meta.env.VITE_API_URL;

function App() {
  const [standings, setStandings] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('PL');
  const [selectedTeam, setSelectedTeam] = useState('Chelsea FC');

  useEffect(() => {
    // Call only fetchLeagueStandings when the component mounts
    fetchLeagueStandings();
  }, []); // Empty dependency array, will run once when the component mounts

  useEffect(() => {
    fetchTeamStandings();
    fetchLeagueStandings();
  }, [selectedLeague, selectedTeam]); // fetch standing when selected league changes or new team selected

  async function fetchTeamStandings() {
    let dbURL = `${SERVER}/standings/team/${selectedLeague}/${selectedTeam}`;

    try {
      console.log('url: ', dbURL);
      const leagueResponse = await axios.get(dbURL);
      setStandings(leagueResponse.data);
      console.log('Fetched standings: ', leagueResponse.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLeagueStandings() {
    let dbURL = `${SERVER}/standings/${selectedLeague}`;

    try {
      console.log('fetchStandings url: ', dbURL);
      const response = await axios.get(dbURL);
      setStandings(response.data);
      console.log('Fetched standings: ', response.data);
    } catch(error) {
      console.log(error);
    }

  }

  function handleLeagueChange(event) {
    setSelectedLeague(event.target.value);
  }

  function handleTeamChange(event) {
    setSelectedTeam(event.target.value);
  }

  return (
    <BrowserRouter className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/matches' element={<Matches />} />
        <Route
          path='/standings'
          element={
            <>
             <Filters
                selectedLeague={selectedLeague}
                selectedTeam={selectedTeam}
                handleLeagueChange={handleLeagueChange}
                handleTeamChange={handleTeamChange}
              />
              <Standings standings={standings} selectedLeague={selectedLeague}/>
            </>
          }
        />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
