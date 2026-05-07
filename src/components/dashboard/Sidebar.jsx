import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Receipt, 
  Calculator, 
  UserCircle 
} from 'lucide-react';
import nisiLogo from '/nisi-icon.svg';
import nisiLogoWords from '../../assets/nisi-logo.svg';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Employees', icon: Users, id: 'employees' },
  { name: 'Payroll', icon: CreditCard, id: 'payroll' },
  { name: 'Calculator', icon: Calculator, id: 'calculator' }, // Re-added
];

const Sidebar = ({ active, setActive, user }) => {
  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
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

        {/* Desktop Profile Area */}
        <div className="mt-auto border-t border-slate-100 pt-6">
          <button 
            onClick={() => setActive('settings')}
            className={`flex items-center gap-4 w-full text-left transition-all hover:bg-slate-50 p-2 rounded-xl group ${active === 'settings' ? 'bg-slate-50 border-l-4 border-blue-500' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
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

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-1 py-3 flex justify-between items-center z-50">
        {/* We show all 4 main items + Profile = 5 total icons (Standard for mobile) */}
        {menuItems.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button 
              key={item.id} 
              onClick={() => setActive(item.id)} 
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400'}`}>
                <Icon size={18} />
              </div>
              <span className={`text-[9px] font-bold ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
                {item.name}
              </span>
            </button>
          );
        })}

        <button 
          onClick={() => setActive('settings')} 
          className="flex flex-col items-center gap-1 flex-1"
        >
          <div className={`p-2 rounded-xl transition-all ${active === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}>
            <UserCircle size={18} />
          </div>
          <span className={`text-[9px] font-bold ${active === 'settings' ? 'text-blue-600' : 'text-slate-400'}`}>
            Profile
          </span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;