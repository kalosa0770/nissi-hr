import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/axios';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  DollarSign, 
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const QuickStat = ({ title, value, change, icon: Icon }) => (
  <div className="bg-slate-900/40 border border-slate-800 p-3 md:p-6 rounded-sm hover:border-slate-700 transition-all group items-center justify-center text-center">
    <div className="flex justify-between items-center mb-4">
      <div className="text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all p-1.5 rounded-lg">
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
  // =========================================================
  // AUTOMATED CALCULATION STATE MANAGEMENT HOOKS
  // =========================================================
  const [payrollData, setPayrollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingCycle, setProcessingCycle] = useState(false);
  const currentMonthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date());

  // Fetch current month's computed state if it exists, otherwise trigger clean initial parameters
  const fetchActivePayrollState = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch calculation metrics based on the active timeframe
      const response = await api.get(`/api/payroll/summary?monthYear=${encodeURIComponent(currentMonthYear || "May 2026")}`);
      const data = response.data;
      setPayrollData(data.summaryTotals || {
        totalGrossPay: 0,
        totalDeductions: 0,
        totalNetPay: 0,
        averageSalary: 0,
        pipelineProgress: 0,
        steps: { attendance: 'done', tax: 'pending', disbursement: 'pending' }
      });
    } catch (err) {
      console.error("Error connecting to payroll data endpoints:", err);
      setPayrollData({
        totalGrossPay: 0,
        totalDeductions: 0,
        totalNetPay: 0,
        averageSalary: 0,
        pipelineProgress: 0,
        steps: { attendance: 'done', tax: 'pending', disbursement: 'pending' }
      });
    } finally {
      setLoading(false);
    }
  }, [currentMonthYear]);

  useEffect(() => {
    fetchActivePayrollState();
  }, [fetchActivePayrollState]);

  // =========================================================
  // TRIGGER BATCH RUNNER CALCULATIONS FUNCTION
  // =========================================================
  const handleRunPayrollCycle = async () => {
    try {
      setProcessingCycle(true);
      const response = await api.post('/api/payroll/run', { monthYear: currentMonthYear || "May 2026" });
      const resData = response.data;
      if (response.status >= 400) throw new Error(resData.message || "Failed execution engine loops.");

      // Hydrate local state fields instantly with backend computational matrix aggregates
      setPayrollData({
        totalGrossPay: resData.summaryTotals.totalGrossPay,
        totalDeductions: resData.summaryTotals.totalPAYE + resData.summaryTotals.totalNAPSA + resData.summaryTotals.totalNHIMA,
        totalNetPay: resData.summaryTotals.totalNetPay,
        averageSalary: resData.summaryTotals.totalGrossPay / resData.summaryTotals.headcount,
        pipelineProgress: 100, // Process completed
        steps: { attendance: 'done', tax: 'done', disbursement: 'done' }
      });

    } catch (err) {
      alert(`Calculation Engine Alert: ${err.message}`);
    } finally {
      setProcessingCycle(false);
    }
  };

  // Helper utility to format raw currency balances safely into clean string vectors
  const formatCurrencyValue = (num) => {
    if (!num) return "0.0";
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <p className="text-xs uppercase tracking-widest font-black font-poppins">Syncing Core Parameters...</p>
      </div>
    );
  }

  // Active steps layout matrix based on current database state tracking parameters
  const pipelineSteps = [
    { label: 'Attendance', status: payrollData?.steps?.attendance || 'done' },
    { label: 'Tax & NAPSA', status: payrollData?.steps?.tax || 'pending' },
    { label: 'Disbursement', status: payrollData?.steps?.disbursement || 'pending' }
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-10">
      
      {/* --- WELCOME HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-normal font-agenda leading-tight">
            Welcome back,{" "}
            <span className="text-blue-500">
              {user?.firstName || 'Caleb'}
            </span>
            !
          </h2>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-sm flex items-center justify-center gap-3 text-slate-300 font-bold text-xs md:text-sm shadow-xl self-center md:self-auto uppercase tracking-wider font-litera">
          <Calendar size={18} className="text-blue-500" />
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </header>

      {/* --- QUICK STATS GRID --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <QuickStat title="Gross Pay" value={formatCurrencyValue(payrollData?.totalGrossPay)} change="+12%" icon={DollarSign} />
        <QuickStat title="Deductions" value={formatCurrencyValue(payrollData?.totalDeductions)} change="+4%" icon={AlertCircle} />
        <QuickStat title="Net Pay" value={formatCurrencyValue(payrollData?.totalNetPay)} change="+8%" icon={Clock} />
        <QuickStat title="Avg Salary" value={formatCurrencyValue(payrollData?.averageSalary || (payrollData?.totalGrossPay / 10))} change="+2%" icon={TrendingUp} />
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
                  {payrollData?.pipelineProgress === 100 ? "Calculations Locked" : "Tax Calculation"}
                </span>
                <span className="text-xs md:text-sm font-black text-white">
                  {payrollData?.pipelineProgress !== undefined ? payrollData.pipelineProgress : 82}%
                </span>
              </div>
              <div className="overflow-hidden h-3 md:h-4 flex rounded-full bg-slate-800 border border-slate-700/50 p-0.5 md:p-1">
                <div 
                  style={{ width: `${payrollData?.pipelineProgress !== undefined ? payrollData.pipelineProgress : 82}%` }} 
                  className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all duration-1000 ease-out"
                />
              </div>
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
               {pipelineSteps.map((step) => (
                 <div key={step.label} className={`p-4 rounded-sm border transition-all ${step.status === 'done' ? 'bg-blue-600/5 border-blue-600/10' : 'bg-slate-800/20 border-slate-800'} scaling-effect`}>
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
        <div className="bg-slate-900 rounded-sm p-6 md:p-8 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-black text-white font-agenda mb-6">Compliance</h3>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-4 p-4 rounded-sm bg-orange-500/10 border border-orange-500/20">
                <div className="p-2 rounded-lg bg-orange-500 text-slate-900"><AlertCircle size={18} strokeWidth={3} /></div>
                <div>
                  <p className="text-sm font-bold text-white">ZRA PAYE</p>
                  <p className="text-[9px] text-orange-200/60 font-black uppercase tracking-widest">Due 14th</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-sm bg-indigo-500/10 border border-indigo-500/20">
                <div className="p-2 rounded-lg bg-indigo-500 text-white"><Clock size={18} strokeWidth={3} /></div>
                <div>
                  <p className="text-sm font-bold text-white">NAPSA</p>
                  <p className="text-[9px] text-indigo-200/60 font-black uppercase tracking-widest">Due 10th</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            disabled={processingCycle}
            onClick={handleRunPayrollCycle}
            className="w-full mt-8 bg-white text-slate-950 p-4 rounded-xl font-black font-agenda text-xs md:text-sm hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {processingCycle ? (
              <>
                <Loader2 className="animate-spin text-slate-950" size={16} />
                <span>Running Engine Math...</span>
              </>
            ) : (
              "Run Payroll Cycle"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;