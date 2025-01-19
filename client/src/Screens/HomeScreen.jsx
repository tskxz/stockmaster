import React from 'react'
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <>
        <h1>Bem vindo ao StockMaster</h1>
        <ul>
          <li> <Link to={"/meus_armazens"}>Veja os seus armazéns </Link></li>
        </ul>
      </>
  )
}

export default HomeScreen