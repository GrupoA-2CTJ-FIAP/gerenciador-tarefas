import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/brand-icon.png';
import mail from '../../assets/mail.svg';
import './header.css';
import { Link } from 'react-router-dom';
import { checkLoginState, requestPermission, logOut } from '../../services/firebase';
import ProtectedRoute from '../routes/ProtectedRoute';

function Header() {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Sistema de Gerenciamento de Tarefas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/teams">Equipes</Nav.Link>
            {/*<Nav.Link as={Link} to="/login">Login</Nav.Link>*/}
            <ProtectedRoute>
              <Nav.Link as={Link} onClick={logOut} style={{ color: 'red' }}>Sair</Nav.Link>
            </ProtectedRoute>
            <Nav.Link onClick={requestPermission}><img alt=""
              src={mail}
              width="30"
              height="30"
              className="d-inline-block align-top"></img></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;