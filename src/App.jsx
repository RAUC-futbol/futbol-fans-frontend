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

const SERVER = import.meta.env.VITE_API_URL;

function App() {
  const [standings, setStandings] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('PL');
  const [selectedTeam, setSelectedTeam] = useState('Chelsea FC');

  useEffect(() => {
    fetchStandings();
  }, [selectedLeague, selectedTeam]); // fetch standing when selected league changes or new team selected

  async function fetchStandings() {
    let dbURL = `${SERVER}/standings/team/${selectedLeague}/${selectedTeam}`;

    try {
      //console.log('url: ', dbURL);
      const leagueResponse = await axios.get(dbURL);
      setStandings(leagueResponse.data);
      //console.log('Fetched standings: ', leagueResponse.data);
    } catch (error) {
      console.error(error);
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
              <Standings standings={standings} />
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
