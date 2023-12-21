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
import leaguesDictionary from '../config/leagues';
import SignUp from './components/SignUp';
import Login from './components/Login';
import teamDictionary from '../config/teamDictionary';
import Highlights from './pages/Highlights';

const SERVER = import.meta.env.VITE_API_URL;

function App() {
  // user
  const [user, setUser] = useState({
    username: 'username',
    name: 'name',
    favLeague: 2021,
    favTeam: 57,
  });

  function updateUser(userObj) {
    setUser(userObj);
  }

  const [teamInfo, setTeamInfo] = useState([]);
  const [teamStandings, setTeamStandings] = useState([]);
  const [leagueStandings, setLeagueStandings] = useState([]);

  useEffect(() => {
    fetchLeagueStandings();
    fetchTeamStandings();
  }, [user.favLeague, user.favTeam]);

  useEffect(() => {
    fetchTeamInfo();
  }, [user.favTeam]);

  async function fetchTeamStandings() {
    const selectedLeagueCode = getLeagueCode(user.favLeague);
    const selectedTeamName = getTeamName(user.favTeam);
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

  async function fetchTeamInfo() {
    try {
      const teamId = user.favTeam;
      let dbURL = `${SERVER}/teams/${teamId}`;

      console.log('fetchTeams url: ', dbURL);
      const response = await axios.get(dbURL);
      console.log('Fetched team info: ', response.data);
      setTeamInfo(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
        <Route path='/matches' element={<Matches teamId={user.favTeam} />} />
        <Route path='/' element={<Home toggleShowSignUp={toggleShowSignUp} />} />
        <Route
          path='/standings'
          element={
            <>
              <Standings
                user={user}
                teamStandings={teamStandings}
                leagueStandings={leagueStandings}
              />
            </>
          }
        />
        <Route path='/explore' element={<Explore />} />
        <Route
          path='/profile'
          element={<Profile user={user} updateUser={updateUser} />}
        />
        <Route
          path='/dashboard'
          element={
            <Dashboard
              teamInfo={teamInfo}
              selectedLeague={getLeagueCode(user.favLeague)}
              teamStandings={teamStandings}
              leagueStandings={leagueStandings}
            />
          }
        />
        <Route path='/highlights' element={<Highlights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
