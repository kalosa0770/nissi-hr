import React, { useState, useEffect } from 'react';
import { Search, Download, RefreshCw, Layers, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const PayrollContent = () => {
  const [payrollEntries, setPayrollEntries] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState("May 2026");

  const fetchPayrollDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch the calculated metrics straight from your new history endpoint
      const response = await fetch(`http://localhost:5000/api/payroll/summary?monthYear=${encodeURIComponent(currentMonth)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No payroll cycle has been executed for this period yet. Please run a cycle from the dashboard.");
        }
        throw new Error("Failed to pull active payroll parameters.");
      }

      const data = await response.json();
      setPayrollEntries(data.individualLineItems || []);
      setSummary(data.summaryTotals || null);
    } catch (err) {
      setError(err.message);
      setPayrollEntries([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollDetails();
  }, [currentMonth]);

  // Client-side search matrix filtering through names or identification strings
  const filteredEntries = payrollEntries.filter(entry => 
    entry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clean monetary utility wrapper
  const formatZMW = (val) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2
    }).format(val).replace('ZMW', 'ZK');
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10">
      
      {/* --- TOP BANNER INTERACTIVE ROUTER --- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <p className="text-slate-400 font-medium font-litera text-sm">Financial Accounting Nodes</p>
          <h2 className="text-4xl font-black text-white tracking-tight font-agenda mt-1">Payroll Ledger</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select 
            value={currentMonth} 
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 px-5 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all"
          >
            <option value="May 2026">May 2026</option>
            <option value="June 2026">June 2026</option>
          </select>

          <button 
            onClick={fetchPayrollDetails}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Data Nodes"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* --- LIVE BATCH STATUS SUMMARY CARD --- */}
      {summary && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/20 border border-slate-800/80 rounded-[2rem] p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-litera">Aggregate Gross Pay</p>
            <p className="text-2xl font-black text-white">{formatZMW(summary.totalGrossPay)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-litera">Total Statutory Deductions</p>
            <p className="text-2xl font-black text-rose-400">{formatZMW(summary.totalDeductions)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-litera">Disbursable Net Pay</p>
            <p className="text-2xl font-black text-emerald-400">{formatZMW(summary.totalNetPay)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase font-litera">Engine Verification</p>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mt-1">
              <CheckCircle2 size={16} /> <span>Locked & Checked</span>
            </div>
          </div>
        </div>
      )}

      {/* --- LEDGER TABLE BLOCK --- */}
      <section className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="relative group w-full md:w-80">
            <input 
              type="search" 
              placeholder="Search statements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 text-slate-200 pl-12 pr-6 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all text-sm" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-slate-300 hover:text-white transition-all text-sm font-bold shadow-md">
            <Download size={18} /> Export Bank File
          </button>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <p className="text-xs uppercase tracking-widest font-black font-litera">Compiling Balance Arrays...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[1000px]">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera px-4">
                  <th className="pb-3 pl-6">Personnel Details</th>
                  <th className="pb-3">Basic Salary</th>
                  <th className="pb-3">Allowances</th>
                  <th className="pb-3">Statutory Deductions</th>
                  <th className="pb-3 text-orange-400">Gross Pay</th>
                  <th className="pb-3 text-emerald-400">Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((emp) => (
                  <tr 
                    key={emp.employeeId}
                    className="bg-slate-800/10 border border-slate-800/30 rounded-[1.5rem] hover:bg-slate-800/30 transition-all cursor-pointer group"
                  >
                    {/* Column 1: Info */}
                    <td className="py-4 pl-6 rounded-l-[1.5rem]">
                      <div>
                        <p className="font-bold text-white font-litera leading-tight group-hover:text-blue-400 transition-colors">{emp.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">{emp.jobTitle} • ID: #{emp.employeeId}</p>
                      </div>
                    </td>
                    
                    {/* Column 2: Basic Base */}
                    <td className="py-4 text-slate-300 font-medium text-sm font-litera">
                      {formatZMW(emp.basicSalary)}
                    </td>
                    
                    {/* Column 3: Allowances */}
                    <td className="py-4 text-slate-400 text-sm font-litera">
                      {formatZMW(emp.meta?.totalAllowances || 0)}
                    </td>
                    
                    {/* Column 4: Deductions Dropdown View summary */}
                    <td className="py-4">
                      <div className="space-y-0.5 text-[11px] text-slate-500 font-medium font-poppins">
                        <p><span className="text-slate-600">PAYE:</span> {formatZMW(emp.deductions?.paye)}</p>
                        <p><span className="text-slate-600">NAPSA:</span> {formatZMW(emp.deductions?.napsa)}</p>
                        <p><span className="text-slate-600">NHIMA:</span> {formatZMW(emp.deductions?.nhima)}</p>
                      </div>
                    </td>
                    
                    {/* Column 5: Gross Value */}
                    <td className="py-4 text-orange-400/90 font-bold text-sm font-litera">
                      {formatZMW(emp.grossPay)}
                    </td>
                    
                    {/* Column 6: Final Take-home Net */}
                    <td className="py-4 text-emerald-400 font-black text-sm font-litera rounded-r-[1.5rem]">
                      {formatZMW(emp.netPay)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEntries.length === 0 && (
              <div className="text-center py-12 text-slate-500 font-medium text-sm font-poppins">
                No payroll items found matching that selection.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default PayrollContent;