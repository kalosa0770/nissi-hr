import React from 'react';
import { LayoutDashboard, Users, CreditCard, Receipt, Calculator, Scale } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Employees', icon: Users, id: 'employees' },
  { name: 'Payroll', icon: CreditCard, id: 'payroll' },
  { name: 'Payslip', icon: Receipt, id: 'payslip' },
  { name: 'Calculator', icon: Calculator, id: 'calculator' }, // Shortened for mobile
];

const Sidebar = ({ active, setActive, user }) => {
  return (
    <>
      {/* --- DESKTOP SIDEBAR (Visible on md and up) --- */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl font-agenda">N</div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-agenda leading-none">Nissi HR</h1>
        </div>

        <nav className="space-y-3 flex-1">
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

        <div className="mt-10 border-t border-slate-100 pt-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs uppercase">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <div className="truncate">
            <p className="font-bold text-slate-950 text-sm truncate">{user?.firstName || 'Founder'}</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">{user?.companyName}</p>
          </div>
        </div>
      </aside>

      {/* --- MOBILE BOTTOM NAV (Visible on small screens only) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-3 flex justify-around items-center z-50">
        {menuItems.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center gap-1 min-w-[64px]"
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-orange-500 text-white' : 'text-slate-400'}`}>
                <Icon size={20} />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
                {item.name.split(' ')[0]} {/* Shorten names like "Payroll Calculator" */}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;