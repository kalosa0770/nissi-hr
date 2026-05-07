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
  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-slate-700 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      <span className="flex items-center text-emerald-400 text-[10px] font-black bg-emerald-400/10 px-2 py-1 rounded-lg">
        {change} <ArrowUpRight size={12} className="ml-1" />
      </span>
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] font-litera">{title}</p>
    <h4 className="text-2xl font-black text-white mt-1 font-agenda">ZK {value}</h4>
  </div>
);

const DashboardContent = () => {
  return (
    <div className="p-8 lg:p-12 space-y-10">
      {/* --- WELCOME HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tight font-agenda leading-none">
            Dashboard <span className="text-blue-500">Overview.</span>
          </h2>
          <p className="text-slate-400 font-medium font-litera text-sm">
            Everything is set for the mid-month payroll cycle.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-2xl flex items-center gap-3 text-slate-300 font-bold text-sm shadow-xl">
          <Calendar size={18} className="text-blue-500" />
          Thursday, May 7, 2026
        </div>
      </header>

      {/* --- QUICK STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStat title="Gross Payroll" value="245,600" change="+12.5%" icon={DollarSign} />
        <QuickStat title="Total Deductions" value="48,200" change="+4.2%" icon={AlertCircle} />
        <QuickStat title="Net Payouts" value="197,400" change="+8.1%" icon={Clock} />
        <QuickStat title="Average Salary" value="12,500" change="+2.0%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- PAYROLL PROGRESS TRACKER --- */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-white font-agenda">Payroll Pipeline</h3>
            <button className="text-blue-500 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-colors">
              Full Report
            </button>
          </div>
          
          <div className="space-y-8">
            <div className="relative">
              <div className="flex mb-4 items-center justify-between">
                <span className="text-[10px] font-black py-1.5 px-3 uppercase rounded-lg text-blue-500 bg-blue-500/10 border border-blue-500/20">
                  Current: Tax Calculation
                </span>
                <span className="text-sm font-black text-white font-litera">82%</span>
              </div>
              <div className="overflow-hidden h-4 flex rounded-full bg-slate-800 border border-slate-700/50 p-1">
                <div style={{ width: "82%" }} className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               {[
                 { label: 'Review Attendance', status: 'done' },
                 { label: 'Tax & NAPSA', status: 'done' },
                 { label: 'Bank Disbursement', status: 'pending' }
               ].map((step, i) => (
                 <div key={step.label} className={`p-5 rounded-2xl border transition-all ${step.status === 'done' ? 'bg-blue-600/5 border-blue-600/20' : 'bg-slate-800/20 border-slate-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {step.status === 'done' ? <CheckCircle2 size={14} className="text-blue-500" /> : <Clock size={14} className="text-slate-600" />}
                        <p className={`text-[9px] font-black uppercase tracking-tighter ${step.status === 'done' ? 'text-blue-500' : 'text-slate-600'}`}>
                            {step.status === 'done' ? 'Completed' : 'Upcoming'}
                        </p>
                    </div>
                    <p className="text-sm font-bold text-white font-litera leading-tight">{step.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* --- COMPLIANCE & ACTIONS --- */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-[50px]" />
          
          <h3 className="text-xl font-black text-white font-agenda mb-8">Compliance Deadlines</h3>
          <div className="space-y-4 relative z-10">
            <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-orange-500/10 border border-orange-500/20 group hover:bg-orange-500/20 transition-all">
              <div className="p-3 rounded-xl bg-orange-500 text-slate-900"><AlertCircle size={20} strokeWidth={3} /></div>
              <div>
                <p className="text-sm font-bold text-white">PAYE Return (ZRA)</p>
                <p className="text-[10px] text-orange-200/60 font-black uppercase tracking-widest mt-0.5">Due: May 14</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 group hover:bg-indigo-500/20 transition-all">
              <div className="p-3 rounded-xl bg-indigo-500 text-white"><Clock size={20} strokeWidth={3} /></div>
              <div>
                <p className="text-sm font-bold text-white">NAPSA Submission</p>
                <p className="text-[10px] text-indigo-200/60 font-black uppercase tracking-widest mt-0.5">Due: May 15</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-10 bg-white text-slate-950 p-5 rounded-2xl font-black font-agenda text-sm hover:bg-slate-100 active:scale-95 transition-all shadow-lg shadow-white/5">
            Run Payroll Cycle
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;