import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  DollarSign, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const QuickStat = ({ title, value, change, icon: Icon }) => (
  <div className="bg-slate-900/40 border border-slate-800 p-3 md:p-6 rounded-sm hover:border-slate-700 transition-all group items-center justify-center text-center">
    <div className="flex justify-between items-center mb-4">
      <div className=" text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <span className="flex items-center text-emerald-400 text-[10px] font-black bg-emerald-400/10 px-2 py-1 rounded-lg">
        {change} <ArrowUpRight size={12} className="ml-1" />
      </span>
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] font-litera">{title}</p>
    <h4 className="text-xl md:text-2xl font-black text-white/80 mt-1 font-agenda tracking-wide">ZK {value}</h4>
  </div>
);

const DashboardContent = ({ user }) => {
  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-10">
      
      {/* --- WELCOME HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-normal font-agenda leading-tight">
          Welcome back,{" "}
          <span className="text-blue-500">
            {user?.firstName || 'User'}{user?.lastName ? ` ${user.lastName}` : ''}
          </span>
          !
        </h2>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-sm flex items-center justify-center gap-3 text-slate-300 font-bold text-xs md:text-sm shadow-xl self-center md:self-auto">
          <Calendar size={18} className="text-blue-500" />
          Thursday, May 7, 2026
        </div>
      </header>

      {/* --- QUICK STATS GRID --- */}
      {/* grid-cols-2 on mobile makes it feel like a pro dashboard without being too long */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <QuickStat title="Gross Pay" value="245.6k" change="+12%" icon={DollarSign} />
        <QuickStat title="Deductions" value="48.2k" change="+4%" icon={AlertCircle} />
        <QuickStat title="Net Pay" value="197.4k" change="+8%" icon={Clock} />
        <QuickStat title="Avg Salary" value="12.5k" change="+2%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* --- PAYROLL PROGRESS TRACKER --- */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-sm p-6 md:p-8 space-y-6 md:space-y-8 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-black text-white font-agenda">Payroll Pipeline</h3>
            <button className="text-blue-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              Report
            </button>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <div className="relative">
              <div className="flex mb-3 items-center justify-between">
                <span className="text-[9px] md:text-[10px] font-black py-1 px-3 uppercase rounded-sm text-blue-500 bg-blue-500/10 border border-blue-500/20">
                  Tax Calculation
                </span>
                <span className="text-xs md:text-sm font-black text-white">82%</span>
              </div>
              <div className="overflow-hidden h-3 md:h-4 flex rounded-full bg-slate-800 border border-slate-700/50 p-0.5 md:p-1">
                <div style={{ width: "82%" }} className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
              </div>
            </div>

            {/* Steps grid: stacks on small mobile, 3-cols on tablets/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
               {[
                 { label: 'Attendance', status: 'done' },
                 { label: 'Tax & NAPSA', status: 'done' },
                 { label: 'Disbursement', status: 'pending' }
               ].map((step) => (
                 <div key={step.label} className={`p-4 rounded-sm border transition-all ${step.status === 'done' ? 'bg-blue-600/5 border-blue-600/10' : 'bg-slate-800/20 border-slate-800'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        {step.status === 'done' ? <CheckCircle2 size={12} className="text-blue-500" /> : <Clock size={12} className="text-slate-600" />}
                        <p className={`text-[8px] font-black uppercase ${step.status === 'done' ? 'text-blue-500' : 'text-slate-600'}`}>
                            {step.status === 'done' ? 'Done' : 'Next'}
                        </p>
                    </div>
                    <p className="text-xs font-bold text-white leading-tight">{step.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* --- COMPLIANCE & ACTIONS --- */}
        <div className="bg-slate-900 rounded-sm  p-6 md:p-8 border border-slate-800 relative overflow-hidden">
          <h3 className="text-lg md:text-xl font-black text-white font-agenda mb-6">Compliance</h3>
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-4 p-4 rounded-sm bg-orange-500/10 border border-orange-500/20">
              <div className="p-2 rounded-lg bg-orange-500 text-slate-900"><AlertCircle size={18} strokeWidth={3} /></div>
              <div>
                <p className="text-sm font-bold text-white">ZRA PAYE</p>
                <p className="text-[9px] text-orange-200/60 font-black uppercase tracking-widest">May 14</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-sm bg-indigo-500/10 border border-indigo-500/20">
              <div className="p-2 rounded-lg bg-indigo-500 text-white"><Clock size={18} strokeWidth={3} /></div>
              <div>
                <p className="text-sm font-bold text-white">NAPSA</p>
                <p className="text-[9px] text-indigo-200/60 font-black uppercase tracking-widest">May 15</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-8 bg-white text-slate-950 p-4 rounded-xl font-black font-agenda text-xs md:text-sm hover:bg-slate-100 active:scale-95 transition-all">
            Run Payroll Cycle
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;