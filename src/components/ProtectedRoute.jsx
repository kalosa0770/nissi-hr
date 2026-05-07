import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem('nisi_token');
  const user = localStorage.getItem('nisi_user');

  // If token exists, render the child routes (Outlet)
  // If not, redirect to the login page
  if (token && user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;