import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado (token JWT presente no localStorage)
  const token = localStorage.getItem('jwt');

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove o token
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>StockMaster</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* Se o usuário não estiver autenticado, exibe o link de Login */}
              {!token ? (
                <Nav.Link href='/login'>
                  <FaUser /> Login
                </Nav.Link>
              ) : (
                // Se o usuário estiver autenticado, exibe o link de Logout
                <Nav.Link onClick={handleLogout}>
                  <FaUser /> Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
