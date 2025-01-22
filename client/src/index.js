import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import MeusArmazens from './Screens/MeusArmazensScreen';
import PrivateRoute from './components/PrivateRoute';
import ProdutosScreen from './Screens/ProdutosScreen';
import CriarArmazemScreen from './Screens/CriarArmazemScreen';
import AdicionarProdutoScreen from './Screens/AdicionarProdutoScreen';
import EditarProdutoScreen from './Screens/EditarProdutoScreen';
import EditarArmazemScreen from './Screens/EditarArmazemScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/signup" element={<SignupScreen/>}/>
      
        {/* Rota privada */}
        <Route element={<PrivateRoute />}>
          <Route path="/meus_armazens" element={<MeusArmazens />} />
          <Route path="/produtos/:armazemId" element={<ProdutosScreen />} />
          <Route path="/criararmazem" element={<CriarArmazemScreen />} />
          <Route path="/adicionar_produto/:armazemId" element={<AdicionarProdutoScreen />} />
          <Route path="/editar_produto/:produtoId" element={<EditarProdutoScreen />} />
          <Route path="/editar_armazem/:armazemId" element={<EditarArmazemScreen />} />

        </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
