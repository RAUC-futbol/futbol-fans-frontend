import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function NavBar() {
    return (
        <Navbar expand='lg' className='navbar'>
            <Link to='/' className='navbar-brand'>Statistics</Link>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <ul>
                    <Nav className='mr-auto'>
                        <CustomLink to='/' className='nav-link'>Matches</CustomLink>
                        <CustomLink to='/' className='nav-link'>Standings</CustomLink>
                        <CustomLink to='/' className='nav-link'>Learn More</CustomLink>
                        <CustomLink to='/' className='nav-link'>Profile</CustomLink>
                    </Nav>
                </ul>
            </Navbar.Collapse>
        </Navbar>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolved = useResolvedPath(to);
    const isActive = useMatch({ path: resolved.pathname, end: true });

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
