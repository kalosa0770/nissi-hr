import React from 'react';
import { Search, Bell, Filter, Plus } from 'lucide-react';

// Mock data to match your screenshot
const employees = [
  { id: 1, initials: 'LC', name: 'Leonardo Courtris', position: 'HR Manager', department: 'HR', joinDate: '12/08/2018', status: 'Active', color: 'bg-rose-400' },
  { id: 2, initials: 'RE', name: 'Ralph Edwards', position: 'Software Developer', department: 'IT', joinDate: '03/01/2020', status: 'Leave', color: 'bg-orange-400' },
];

const StatCard = ({ title, value, color, textDark = false }) => (
  <div className={`${color} p-8 rounded-[2rem] flex items-center justify-between shadow-xl`}>
    <div className="space-y-1">
      <p className={`text-xs font-bold uppercase tracking-wider ${textDark ? 'text-slate-900/60' : 'text-white/60'}`}>
        {title}
      </p>
      <p className={`text-5xl font-black ${textDark ? 'text-slate-900' : 'text-white'}`}>
        {value}
      </p>
    </div>
    {/* Decorative circle icon found in your mockup */}
    <div className={`w-12 h-12 rounded-full border-4 ${textDark ? 'border-slate-900/10' : 'border-white/20'} flex items-center justify-center`}>
       <div className={`w-2 h-2 rounded-full ${textDark ? 'bg-slate-900' : 'bg-white'}`} />
    </div>
  </div>
);

const EmployeesContent = () => {
  return (
    <div className="p-8 lg:p-12 space-y-10">
      
      {/* --- TOP HEADER --- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <p className="text-slate-400 font-medium font-litera text-sm">Welcome Back, Caleb</p>
          <h2 className="text-4xl font-black text-white tracking-tight font-agenda mt-1">Company Employees</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input 
              type="search" 
              placeholder="Search employee..." 
              className="bg-slate-900/50 border border-slate-800 text-slate-200 pl-12 pr-6 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 transition-all" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
          </div>
          <button className="relative p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-slate-950" />
          </button>
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-800">
             <img src="https://ui-avatars.com/api/?name=Caleb+Adebayo&background=0D8ABC&color=fff" alt="User" />
          </div>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Employees" value="108" color="bg-orange-500" />
        <StatCard title="Active Employees" value="98" color="bg-white" textDark={true} />
        <StatCard title="Inactive Employees" value="10" color="bg-indigo-600" />
      </div>

      {/* --- EMPLOYEE TABLE CONTAINER --- */}
      <section className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-white font-agenda">Employee List</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-all text-sm font-bold">
              <Filter size={18} /> Filter
            </button>
            <button className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
              <Plus size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* --- CUSTOM TABLE --- */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-6 px-6 mb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera">
                <div className="col-span-2">Employee Name</div>
                <div>Position</div>
                <div>Department</div>
                <div>Joining Date</div>
                <div className="text-center">Status</div>
            </div>

            {/* Table Body */}
            <div className="space-y-3">
                {employees.map((emp) => (
                    <div 
                      key={emp.id} 
                      className="grid grid-cols-6 items-center bg-slate-800/20 border border-slate-800/30 p-4 rounded-[1.5rem] hover:bg-slate-800/40 transition-all cursor-pointer group"
                    >
                        <div className="col-span-2 flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-full ${emp.color} flex items-center justify-center font-bold text-slate-900 shadow-lg`}>
                                {emp.initials}
                            </div>
                            <div>
                              <p className="font-bold text-white font-litera leading-tight">{emp.name}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">ID: #00{emp.id}</p>
                            </div>
                        </div>
                        <div className="text-slate-400 font-medium text-sm">{emp.position}</div>
                        <div className="text-slate-400 font-medium text-sm">{emp.department}</div>
                        <div className="text-slate-400 font-medium text-sm font-litera">{emp.joinDate}</div>
                        <div className="flex justify-center">
                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                              emp.status === 'Active' 
                                ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' 
                                : 'bg-slate-700/30 text-slate-400 border border-slate-700'
                            }`}>
                                {emp.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeesContent;