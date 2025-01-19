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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/signup" element={<SignupScreen/>}/>
      
        {/* Rota privada */}
        <Route element={<PrivateRoute />}>
          <Route path="/meus_armazens" element={<MeusArmazens />} />
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
