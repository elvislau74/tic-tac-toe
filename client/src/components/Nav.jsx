import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useLogin } from '../utils/LoginContext';
// import '../styles/Nav.css';

// Creates a nav bar with routing to other pages
export default function NavTabs() {
    const [ state ] = useLogin();
    const currentPage = useLocation().pathname;

    return (
        <header>
            <Navbar expand='lg' className=' navigation-bar'>
                <Container>
                    <Navbar.Brand className='nav-name'>Tic Tac Toe</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto tabs'>
                            <Link
                                to="/"
                                className={currentPage === "/" ? "nav-link active" : "nav-link"}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/play"
                                className={currentPage === "/play" ? "nav-link active": "nav-link"}
                            >
                                Play
                            </Link>
                            {state.loggedIn ? (
                                <Link 
                                    to="/logout"
                                    className={currentPage === "/logout" ? "nav-link active": "nav-link"}
                                >
                                    Logout
                                </Link>
                            ) : (
                                <Link 
                                    to="/login"
                                    className={currentPage === "/login" ? "nav-link active": "nav-link"}
                                >
                                    Login/Signup
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}