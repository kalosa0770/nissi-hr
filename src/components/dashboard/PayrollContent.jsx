import React, { useState, useEffect } from 'react';
import { Search, Download, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

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

  const downloadPayrollCsv = () => {
    if (!filteredEntries.length) return;

    const headers = [
      'Employee ID',
      'Name',
      'Job Title',
      'Basic Salary',
      'Allowances',
      'PAYE',
      'NAPSA',
      'NHIMA',
      'Gross Pay',
      'Net Pay'
    ];

    const rows = filteredEntries.map((entry) => [
      entry.employeeId,
      entry.name,
      entry.jobTitle,
      entry.basicSalary || 0,
      entry.meta?.totalAllowances || 0,
      entry.deductions?.paye || 0,
      entry.deductions?.napsa || 0,
      entry.deductions?.nhima || 0,
      entry.grossPay || 0,
      entry.netPay || 0
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payroll-${currentMonth.replace(/\s+/g, '-').toLowerCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-2 lg:p-4 space-y-10 relative">
      
      {/* --- TOP HEADER --- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white md:text-start text-center tracking-tight font-agenda mt-1">Payroll Summary</h2>
          <p className="mt-2 text-sm md:text-start text-center text-slate-400 max-w-xl">Review payroll totals and individual employee breakdowns. Select a month and search to find payroll details.</p>
        </div>
      </header>

      {/* --- AUTOMATED STATS GRID --- */}
      {summary && (
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Gross Pay</p>
              <p className="text-base font-normal text-white">{formatZMW(summary.totalGrossPay)}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Deductions</p>
              <p className="text-base font-normal text-white">{formatZMW(summary.totalDeductions)}</p>
            </div>
          </div>
          <div className="bg-white p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-900/60">Net Pay</p>
              <p className="text-base  font-normal text-slate-900">{formatZMW(summary.totalNetPay)}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- PAYROLL LEDGER CONTAINER --- */}
      <section className="bg-slate-900/40 rounded-lg border border-slate-800/50 p-2 lg:p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-white font-agenda text-center">Payroll Ledger</h3>
          <div className="flex items-center justify-between gap-3">
            <select 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(e.target.value)}
              className="bg-slate-800/70 border border-slate-700 text-slate-300 px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm transition-all"
            >
              <option value="May 2026">May 2026</option>
              <option value="June 2026">June 2026</option>
            </select>
            <button
              onClick={downloadPayrollCsv}
              disabled={!filteredEntries.length || loading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between mb-8">
          <div className="relative group w-full lg:max-w-sm">
            <input 
              type="search" 
              placeholder="Search employee..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/80 border border-slate-800 text-slate-200 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all text-sm" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <p className="text-xs uppercase tracking-widest font-black font-litera">Processing Payroll Data...</p>
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
            <div className="min-w-full">
              <div className="hidden md:grid grid-cols-6 px-6 mb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera">
                <div className="col-span-2">Employee Name</div>
                <div>Basic Salary</div>
                <div>Allowances</div>
                <div>Deductions</div>
                <div className="text-right">Net Pay</div>
              </div>

              <div className="space-y-3">
                {filteredEntries.map((emp) => {
                  return (
                    <div 
                      key={emp.employeeId}
                      className="grid grid-cols-1 md:grid-cols-6 items-start gap-4 md:items-center bg-slate-800/20 border border-slate-800/30 p-4 rounded-[1.5rem] hover:bg-slate-800/40 transition-all cursor-pointer group"
                    >
                      <div className="md:col-span-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center font-bold text-slate-950 shadow-lg flex-shrink-0">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-white font-litera leading-tight group-hover:text-blue-400 transition-colors">{emp.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">ID: #{emp.employeeId}</p>
                        </div>
                      </div>
                      <div className="text-slate-400 font-medium text-sm">
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Basic Salary</span>
                        {formatZMW(emp.basicSalary)}
                      </div>
                      <div className="text-slate-400 font-medium text-sm">
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Allowances</span>
                        {formatZMW(emp.meta?.totalAllowances || 0)}
                      </div>
                      <div className="text-slate-400 font-medium text-sm">
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Deductions</span>
                        {formatZMW((emp.deductions?.paye || 0) + (emp.deductions?.napsa || 0) + (emp.deductions?.nhima || 0))}
                      </div>
                      <div className="text-emerald-400 font-black text-sm font-litera text-right">
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 text-left">Net Pay</span>
                        {formatZMW(emp.netPay)}
                      </div>
                    </div>
                  );
                })}

                {filteredEntries.length === 0 && (
                  <div className="text-center py-12 text-slate-500 font-medium text-sm font-poppins">
                    No payroll items found matching that selection.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PayrollContent;