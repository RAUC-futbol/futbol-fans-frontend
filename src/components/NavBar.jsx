import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import logo2 from '/img/logo2.jpg';

export default function NavBar({ toggleShowSignUp, toggleShowLogin, user }) {
  return (
    <Navbar expand='lg' className='navbar'>
      <Link to='/' className='navbar-brand'>
        <img src={logo2} alt='futbol logo' className='logo' />
        Fútbol Fans
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
          <Link to='/dashboard' className='nav-link'>
            Dashboard
          </Link>
          <Link to='/matches' className='nav-link'>
            Matches
          </Link>
          <Link to='/standings' className='nav-link'>
            Standings
          </Link>
          <Link to='/explore' className='nav-link'>
            Explore
          </Link>
          <Link to='/highlights' className='nav-link'>
            Highlights
          </Link>
          <Link to='/profile' className='nav-link'>
            Profile
          </Link>
          <Nav.Item>
            <DropdownButton variant='info' title={user.username === 'username' ? 'Account' : user.username}>
              <Dropdown.Item onClick={toggleShowLogin}>Login</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowSignUp}>Sign Up</Dropdown.Item>
            </DropdownButton>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
