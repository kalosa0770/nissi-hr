import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import SolutionPage from "./pages/SolutionPage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import WaitlistPage from "./pages/WaitlistPage";
import ProtectedRoute from "./components/ProtectedRoute";
// Import your dashboard when you create it
import Dashboard from "./pages/DashboardParent"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/solutions/:solution" element={<SolutionPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/waitlist" element={<WaitlistPage />} />

        {/* Protected Routes Group */}
        <Route element={<ProtectedRoute />}>
          {/* All routes inside here require a valid token */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/employees" element={<Employees />} /> */}
          {/* <Route path="/payroll" element={<Payroll />} /> */}
        </Route>
      </Routes>

      <ToastContainer theme="dark" position="top-right" />
    </Router>
  );
};

export default App;