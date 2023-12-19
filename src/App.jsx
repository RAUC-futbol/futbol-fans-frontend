import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Matches from './pages/Matches'
import Standings from './pages/Standings'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/matches' element={<Matches />} />
        <Route path='/standings' element={<Standings />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
