import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardContent from '../components/dashboard/DashboardContent';
import EmployeesContent from '../components/dashboard/EmployeesContent';
import SettingsContent from '../components/dashboard/SettingsContent';
import LeaveManagementContent from '../components/dashboard/LeaveManagementContent';
import PayrollContent from '../components/dashboard/PayrollContent';
import NotificationContent from '../components/dashboard/NotificationContent';

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
    const sections = {
      dashboard: <DashboardContent user={userData} />,
      employees: <EmployeesContent user={userData} />,
      settings: <SettingsContent user={userData} />,
      payroll: <PayrollContent user={userData} />,
      leaves: <LeaveManagementContent user={userData} />,
      notifications: <NotificationContent user={userData} />,
    };

    return sections[activeSection] || sections.dashboard;
  };

  return (
    // Unified workspace background: slate-50 makes a white/light-gray sidebar feel premium 
    // If you want a full dark mode application, change this to bg-slate-950 and make the sidebar dark!
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-slate-100 font-sans antialiased selection:bg-blue-500/30">
      
      {/* Responsive Navigation Context */}
      <Sidebar 
        active={activeSection} 
        setActive={setActiveSection} 
        user={userData} 
      />

      {/* Main Presentation Window */}
      {/* Added pb-32 on mobile to guarantee scrollable elements clear the floating dock perfectly */}
      <main className="flex-1 overflow-y-auto pt-6 px-4 md:px-10 pb-32 md:pb-10">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardParent;