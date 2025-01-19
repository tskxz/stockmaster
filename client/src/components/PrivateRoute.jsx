import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('jwt'); // Verifica se o token está presente

  // Se não tiver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Caso contrário, exibe as rotas internas da aplicação
  return <Outlet />;
};

export default PrivateRoute;
