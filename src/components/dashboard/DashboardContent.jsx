import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/axios';
import { 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

// =========================================================
// MAIN CORE DASHBOARD CONTAINER
// =========================================================
const DashboardContent = ({ user }) => {
  const [payrollData, setPayrollData] = useState(null);
  const [variances, setVariances] = useState({ gross: 0, deductions: 0, net: 0, avg: 0 });
  const [loading, setLoading] = useState(true);
  const [processingCycle, setProcessingCycle] = useState(false);
  
  const currentMonthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date());

  // Helper calculation engine to deduce growth variances
  const calculateVariance = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const fetchActivePayrollState = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/payroll/summary?monthYear=${encodeURIComponent(currentMonthYear || "June 2026")}`);
      const data = response.data;

      // Expecting backend structural layout to provide current metrics vs historic baseline records
      const currentTotals = data.summaryTotals || {};
      const historicTotals = data.previousTotals || {};

      setPayrollData(currentTotals);

      // Compute calculations changes instantly
      const currentGross = currentTotals.totalGrossPay || 0;
      const prevGross = historicTotals.totalGrossPay || 0;
      
      const currentDeductions = currentTotals.totalDeductions || (currentTotals.totalPAYE + currentTotals.totalNAPSA + currentTotals.totalNHIMA) || 0;
      const prevDeductions = historicTotals.totalDeductions || (historicTotals.totalPAYE + historicTotals.totalNAPSA + historicTotals.totalNHIMA) || 0;

      const currentNet = currentTotals.totalNetPay || 0;
      const prevNet = historicTotals.totalNetPay || 0;

      const currentAvg = currentTotals.averageSalary || (currentGross / (currentTotals.headcount || 1));
      const prevAvg = historicTotals.averageSalary || (prevGross / (historicTotals.headcount || 1));

      setVariances({
        gross: calculateVariance(currentGross, prevGross),
        deductions: calculateVariance(currentDeductions, prevDeductions),
        net: calculateVariance(currentNet, prevNet),
        avg: calculateVariance(currentAvg, prevAvg)
      });

    } catch (err) {
      console.error("Error connecting to payroll data endpoints:", err);
    } finally {
      setLoading(false);
    }
  }, [currentMonthYear]);

  useEffect(() => {
    fetchActivePayrollState();
  }, [fetchActivePayrollState]);

  const handleRunPayrollCycle = async () => {
    try {
      setProcessingCycle(true);
      const response = await api.post('/api/payroll/run', { monthYear: currentMonthYear || "June 2026" });
      const resData = response.data;
      if (response.status >= 400) throw new Error(resData.message || "Failed execution engine loops.");

      const activeGross = resData.summaryTotals.totalGrossPay;
      const activeDeductions = resData.summaryTotals.totalPAYE + resData.summaryTotals.totalNAPSA + resData.summaryTotals.totalNHIMA;
      const activeNet = resData.summaryTotals.totalNetPay;
      const activeAvg = activeGross / (resData.summaryTotals.headcount || 1);

      setPayrollData({
        totalGrossPay: activeGross,
        totalDeductions: activeDeductions,
        totalNetPay: activeNet,
        averageSalary: activeAvg,
        pipelineProgress: 100,
        steps: { attendance: 'done', tax: 'done', disbursement: 'done' }
      });

      // Recalculate variance values with refreshed numbers post-run
      setVariances(prev => ({
        ...prev,
        gross: calculateVariance(activeGross, resData.previousTotals?.totalGrossPay || 0),
        deductions: calculateVariance(activeDeductions, resData.previousTotals?.totalDeductions || 0),
        net: calculateVariance(activeNet, resData.previousTotals?.totalNetPay || 0),
        avg: calculateVariance(activeAvg, resData.previousTotals?.averageSalary || 0)
      }));

    } catch (err) {
      alert(`Calculation Engine Alert: ${err.message}`);
    } finally {
      setProcessingCycle(false);
    }
  };

  const formatCurrencyValue = (num) => {
    const formatter = new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (num === null || num === undefined || Number.isNaN(num)) {
      return formatter.format(0);
    }

    return formatter.format(Number(num));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="animate-spin text-blue-500" size={32} />
        <p className="text-xs uppercase tracking-widest font-black font-poppins">Syncing Core Parameters...</p>
      </div>
    );
  }

  const pipelineSteps = [
    { label: 'Attendance', status: payrollData?.steps?.attendance || 'done' },
    { label: 'Tax & NAPSA', status: payrollData?.steps?.tax || 'pending' },
    { label: 'Disbursement', status: payrollData?.steps?.disbursement || 'pending' }
  ];

  return (
    <div className="p-2 lg:p-4 space-y-10 relative">
      
      {/* --- TOP HEADER --- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white md:text-start text-center tracking-tight font-agenda mt-1">Dashboard</h2>
          <p className="mt-2 text-sm md:text-start text-center text-slate-400 max-w-xl">Welcome back, {user?.firstName || 'HR Manager'}! Monitor payroll metrics, compliance deadlines, and pipeline progress.</p>
        </div>
      </header>

      {/* --- AUTOMATED STATS GRID --- */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Gross Pay</p>
            <p className="text-base font-normal text-white">{formatCurrencyValue(payrollData?.totalGrossPay)}</p>
            <p className="text-[10px] text-white/60 font-bold">{variances.gross > 0 ? '+' : ''}{variances.gross.toFixed(1)}%</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Net Pay</p>
            <p className="text-base font-normal text-white">{formatCurrencyValue(payrollData?.totalNetPay)}</p>
            <p className="text-[10px] text-white/60 font-bold">{variances.net > 0 ? '+' : ''}{variances.net.toFixed(1)}%</p>
          </div>
        </div>
        <div className="bg-white p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-900/60">Avg Salary</p>
            <p className="text-base font-normal text-slate-900">{formatCurrencyValue(payrollData?.averageSalary || (payrollData?.totalGrossPay / (payrollData?.headcount || 10)))}</p>
            <p className="text-[10px] text-slate-600 font-bold">{variances.avg > 0 ? '+' : ''}{variances.avg.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* --- PAYROLL PROGRESS TRACKER --- */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/50 rounded-lg p-4 lg:p-6 space-y-6 backdrop-blur-sm">
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
                 <div key={step.label} className={`p-4 rounded-lg border transition-all ${step.status === 'done' ? 'bg-blue-600/5 border-blue-600/10' : 'bg-slate-800/20 border-slate-800'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        {step.status === 'done' ? <CheckCircle2 size={12} className="text-blue-500" /> : <AlertCircle size={12} className="text-slate-600" />}
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
        <div className="bg-slate-900/40 rounded-lg p-4 lg:p-6 border border-slate-800/50 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <h3 className="text-lg md:text-xl font-black text-white font-agenda mb-6">Compliance</h3>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="p-2 rounded-lg bg-orange-500 text-slate-900"><AlertCircle size={18} strokeWidth={3} /></div>
                <div>
                  <p className="text-sm font-bold text-white">ZRA PAYE</p>
                  <p className="text-[9px] text-orange-200/60 font-black uppercase tracking-widest">Due 14th</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
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
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white p-4 rounded-lg font-black text-xs md:text-sm transition-all flex items-center justify-center gap-2"
          >
            {processingCycle ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Running Payroll...</span>
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