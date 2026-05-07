import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardContent from '../components/dashboard/DashboardContent';
import EmployeesContent from '../components/dashboard/EmployeesContent';
import SettingsContent from '../components/dashboard/SettingsContent';

const DashboardParent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Initialize immediately from localStorage - No flicker!
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem('nisi_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Only handles changes from OTHER tabs/windows
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('nisi_user');
      setUserData(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const renderContent = () => {
    // We use a mapping object for cleaner code than a switch
    const sections = {
      dashboard: <DashboardContent user={userData} />,
      employees: <EmployeesContent user={userData} />,
      settings: <SettingsContent user={userData} />,
      payroll: <div className="p-10 text-white font-agenda">Payroll Section (Coming Soon)</div>,
      calculator: <div className="p-10 text-white font-agenda">Calculator Section (Coming Soon)</div>,
    };

    return sections[activeSection] || sections.dashboard;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 font-sans">
      <Sidebar 
        active={activeSection} 
        setActive={setActiveSection} 
        user={userData} 
      />

      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardParent;