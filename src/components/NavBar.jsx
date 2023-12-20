import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function NavBar({ toggleShowSignUp, toggleShowLogin }) {
    return (
        <Navbar expand='lg' className='navbar'>
        <Link to='/' className='navbar-brand'>
          Futbol Fans
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Link to='/' className='nav-link'>
              Home
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
            <Link to='/profile' className='nav-link'>
              Profile
            </Link>
            <Button onClick={toggleShowLogin}>Login</Button>
            <Button onClick={toggleShowSignUp}>Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
