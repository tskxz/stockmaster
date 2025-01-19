import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>StockMaster</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/'>About</Nav.Link>
              <Nav.Link href='/'>Contact</Nav.Link>
              <Nav.Link href='/login'>
                <FaUser /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header