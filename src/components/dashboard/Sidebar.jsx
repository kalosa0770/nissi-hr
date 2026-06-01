import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Calculator,
  Bell, 
  UserCircle,
  CalendarDays,
  Menu,
  X 
} from 'lucide-react';
import nisiLogo from '/nisi-icon.svg';
import nisiLogoWords from '../../assets/nisi-logo.svg';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Employees', icon: Users, id: 'employees' },
  { name: 'Payroll Details', icon: CreditCard, id: 'payroll' },
  { name: 'Leave Management', icon: CalendarDays, id: 'leaves' },
  { name: 'Notifications', icon: Bell, id: 'notifications' },
];

const Sidebar = ({ active, setActive, user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMobileNavClick = (id) => {
    setActive(id);
    setIsDrawerOpen(false); // Close drawer on selection
  };

  return (
    <>
      {/* --- DESKTOP SIDEBAR (UNCHANGED) --- */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <img src={nisiLogo} alt="Nisi Logo" className="w-8 h-8" />
          <img src={nisiLogoWords} alt="Nisi Logo Words" className="w-24 h-auto" />
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/20' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-6">
          <button 
            onClick={() => setActive('settings')}
            className={`flex items-center gap-4 w-full text-left transition-all hover:bg-slate-50 p-2 rounded-xl group ${active === 'settings' ? 'bg-slate-50 border-l-4 border-blue-500' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase transition-colors ${
              active === 'settings' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {user?.firstName?.charAt(0) || 'U'}
              {user?.lastName?.charAt(0) || user?.firstName?.charAt(1) || 'N'}
            </div>
            <div className="truncate flex-1">
              <p className="font-bold text-slate-950 text-sm truncate">{user?.firstName || 'Founder'}</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">{user?.companyName}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* --- MOBILE FLOATING DOCK (MATCHING IMAGE STRUCTURE) --- */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-6 z-50">
        <nav className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-950/10 h-20 px-8 flex justify-between items-center relative">
          
          {/* Left Button: Profile */}
          <button 
            onClick={() => handleMobileNavClick('settings')} 
            className="flex flex-col items-center justify-center gap-1 transition-all"
          >
            <UserCircle size={24} className={active === 'settings' ? 'text-blue-500' : 'text-slate-400'} />
          </button>

          {/* Center Button: Floating Menu Trigger */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all border-4 border-slate-950"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Right Button: Contextual Indicator (Shows current active option icon) */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center justify-center gap-1 transition-all"
          >
            {active === 'settings' ? (
              <LayoutDashboard size={24} className="text-slate-400" />
            ) : (
              (() => {
                const ActiveIcon = menuItems.find(item => item.id === active)?.icon || LayoutDashboard;
                return <ActiveIcon size={24} className="text-blue-500" />;
              })()
            )}
          </button>

        </nav>
      </div>

      {/* --- SIDE DRAWER FOR MOBILE NAVIGATION --- */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
            />

            {/* Left Sliding Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800 p-6 z-50 flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <img src={nisiLogo} alt="Nisi Logo" className="w-6 h-6" />
                    <span className="font-bold text-white tracking-wide font-agenda text-lg">Nissi HR</span>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = active === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMobileNavClick(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                      >
                        <Icon size={20} />
                        {item.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Profile Info inside Drawer */}
              <div className="pt-4 border-t border-slate-800">
                <button 
                  onClick={() => handleMobileNavClick('settings')}
                  className="flex items-center gap-4 w-full text-left p-2 rounded-xl hover:bg-slate-800/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user?.firstName?.charAt(0) || 'U'}
                    {user?.lastName?.charAt(0) || user?.firstName?.charAt(1) || 'N'}
                  </div>
                  <div className="truncate flex-1">
                    <p className="font-bold text-white text-sm truncate">{user?.firstName || 'Founder'}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{user?.companyName}</p>
                  </div>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;