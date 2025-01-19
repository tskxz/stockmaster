import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
         <Outlet/>
        </Container>
      </main>
      <Footer />
    </div>
  );
}


export default App