import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardContent from '../components/dashboard/DashboardContent';
import EmployeesContent from '../components/dashboard/EmployeesContent';

const DashboardParent = () => {
  const [activeSection, setActiveSection] = useState('employees');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 1. Retrieve the token and user info from localStorage
    const token = localStorage.getItem('nisi_token');
    
    // Assuming you saved user details as a stringified object during login
    // e.g., localStorage.setItem('nisi_user', JSON.stringify(userResponse))
    const savedUser = localStorage.getItem('nisi_user');

    if (token && savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  // Pass userData to the content sections so they can say "Welcome, Elijah"
  const sections = {
    dashboard: <DashboardContent user={userData} />,
    employees: <EmployeesContent user={userData} />,
    payroll: <div className="p-10 text-white">Payroll Section (Coming Soon)</div>,
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar switches from side-on-desktop to bottom-on-mobile automatically */}
      <Sidebar active={activeSection} setActive={setActiveSection} user={userData} />

      {/* pb-24 adds space at the bottom on mobile so the content isn't covered by the Nav bar */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        {sections[activeSection]}
      </main>

    </div>
  );
};

export default DashboardParent;