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
import leaguesDictionary from '../config/leagues';
import SignUp from './components/SignUp';
import Login from './components/Login';
import teamDictionary from '../config/teamDictionary';

const SERVER = import.meta.env.VITE_API_URL;

function App() {
  // user
  const [user, setUser] = useState({});

  function updateUser(userObj) {
    setUser(userObj);
  }

  // standings API
  const [teamStandings, setTeamStandings] = useState([]);
  const [leagueStandings, setLeagueStandings] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(
    leaguesDictionary[0].PL.leagueCode
  );
  const [selectedTeam, setSelectedTeam] = useState('Chelsea FC');
  const [teamInfo, setTeamInfo] = useState([]);

  useEffect(() => {
    // Call only fetchLeagueStandings when the component mounts
    fetchLeagueStandings();
  }, [selectedLeague]);

  useEffect(() => {
    fetchTeamStandings();
    fetchLeagueStandings();
    fetchTeamInfo();
  }, [selectedLeague, selectedTeam]); // fetch standing when selected league changes or new team selected

  async function fetchTeamStandings() {
    let dbURL = `${SERVER}/standings/team/${selectedLeague}/${selectedTeam}`;

    try {
      console.log('url: ', dbURL);
      const leagueResponse = await axios.get(dbURL);
      setTeamStandings(leagueResponse.data);
      console.log('Fetched standings: ', leagueResponse.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchLeagueStandings() {
    let dbURL = `${SERVER}/standings/${selectedLeague}`;

    try {
      console.log('fetchStandings url: ', dbURL);
      const response = await axios.get(dbURL);
      setLeagueStandings(response.data);
      console.log('Fetched standings: ', response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchTeamInfo() {
    try {
      const selectedTeamObject = teamDictionary.find(
        (team) => team.name === selectedTeam
      );

      if (!selectedTeamObject) {
        console.error(`Team not found in teamDictionary: ${selectedTeam}`);
        return;
      }

      // Extract the teamId from the selected team object
      const teamId = selectedTeamObject.id;
      let dbURL = `${SERVER}/teams/${teamId}`;

      console.log('fetchTeams url: ', dbURL);
      const response = await axios.get(dbURL);
      console.log('Fetched team info: ', response.data);
      setTeamInfo(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleLeagueChange(event) {
    setSelectedLeague(event.target.value);
  }

  function handleTeamChange(event) {
    setSelectedTeam(event.target.value);
  }

  // sign up and login modals show handlers
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function toggleShowSignUp() {
    setShowSignUp(showSignUp ? false : true);
  }

  function toggleShowLogin() {
    setShowLogin(showLogin ? false : true);
  }

  return (
    <BrowserRouter className='App'>
      <NavBar
        toggleShowSignUp={toggleShowSignUp}
        toggleShowLogin={toggleShowLogin}
        user={user}
      />

      <Login
        show={showLogin}
        onHide={toggleShowLogin}
        updateUser={updateUser}
      />
      <SignUp show={showSignUp} onHide={toggleShowSignUp} />

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
              <Standings
                teamStandings={teamStandings}
                leagueStandings={leagueStandings}
                selectedLeague={selectedLeague}
              />
            </>
          }
        />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route
          path='/dashboard'
          element={
            <Dashboard
              teamInfo={teamInfo}
              teamStandings={teamStandings}
              leagueStandings={leagueStandings}
              selectedLeague={selectedLeague}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
