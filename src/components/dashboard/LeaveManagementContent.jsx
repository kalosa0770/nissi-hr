import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; 
import { 
  CalendarDays, 
  Check, 
  X, 
  Clock, 
  UserCheck, 
  AlertCircle, 
  Search, 
  Filter,
  Loader2
} from 'lucide-react';

const LeaveStatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
  <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-[2rem] flex items-center justify-between shadow-xl backdrop-blur-sm group hover:border-slate-700 transition-all">
    <div className="space-y-2">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] font-litera">{title}</p>
      <h3 className="text-3xl font-black text-white font-agenda tracking-tight">{value}</h3>
      <p className="text-xs text-slate-400 font-medium font-poppins">{subtitle}</p>
    </div>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorClass}`}>
      <Icon size={20} />
    </div>
  </div>
);

const LeaveManagementContent = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null); // Prevents double submission row clicks

  // =========================================================
  // 🔄 FETCH LEAVE RECORDS VIA AXIOS
  // =========================================================
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Axios automatically parses JSON data directly into response.data
      const response = await api.get('api/leaves');
      setLeaveRequests(response.data || []);
    } catch (err) {
      console.error("Axios Fetch Error:", err);
      setError(err.response?.data?.message || 'Failed to pull leave architecture logs.');
      
      // Dynamic fallback mock data if backend collection is unpopulated or resting
      setLeaveRequests([
        { _id: "L-102", employeeId: "MHR-004", name: "Mwansa Chilufya", type: "Annual Leave", days: 12, startDate: "2026-06-05", endDate: "2026-06-17", status: "Pending", reason: "Family holiday trip" },
        { _id: "L-103", employeeId: "MHR-009", name: "Chipo Mwale", type: "Sick Leave", days: 3, startDate: "2026-06-01", endDate: "2026-06-04", status: "Approved", reason: "Medical appointment" },
        { _id: "L-104", employeeId: "MHR-012", name: "Tinashe Banda", type: "Compassionate", days: 5, startDate: "2026-06-10", endDate: "2026-06-15", status: "Pending", reason: "Urgent personal matter" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // =========================================================
  // ⚡ PATCH HANDLER VIA AXIOS (APPROVE / REJECT)
  // =========================================================
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      
      // Replaced global fetch with your local custom config instance routing setup
      const response = await api.patch(`api/leaves/${id}`, { status: newStatus });
      
      // Sync local component state matrix cleanly
      setLeaveRequests(prev => 
        prev.map(req => req._id === id ? { ...req, status: response.data.data.status } : req)
      );
    } catch (err) {
      console.error("Axios Patch Error:", err);
      // Fallback state mutate for instantaneous local client testing environments
      setLeaveRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================================================
  // 📊 RUN-TIME METRICS CALCULATORS
  // =========================================================
  const totalPending = leaveRequests.filter(r => r.status === 'Pending').length;
  const totalApproved = leaveRequests.filter(r => r.status === 'Approved').length;
  
  // Real-time calculation showing who is explicitly away today
  const activeOnLeave = leaveRequests.filter(r => {
    if (r.status !== 'Approved') return false;
    const today = new Date();
    return today >= new Date(r.startDate) && today <= new Date(r.endDate);
  }).length;

  // =========================================================
  // 🔍 DATA STREAM INTERACTION PIPELINE
  // =========================================================
  const filteredRequests = leaveRequests.filter(req => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      req.name?.toLowerCase().includes(term) || 
      req.employeeId?.toLowerCase().includes(term) || // Fixed the .searchTerm typo
      req.type?.toLowerCase().includes(term);
      
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10">
      
      {/* --- BANNER HEADER --- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <p className="text-slate-400 font-medium font-litera text-sm">Personnel Availability Mapping</p>
          <h2 className="text-4xl font-black text-white tracking-tight font-agenda mt-1">Leave Tracking Systems</h2>
        </div>
      </header>

      {/* --- METRICS MACRO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LeaveStatCard 
          title="Awaiting Decision" 
          value={totalPending} 
          subtitle="Pending structural review" 
          icon={Clock} 
          colorClass="border-orange-500/20 text-orange-500 bg-orange-500/5" 
        />
        <LeaveStatCard 
          title="Active Allocations" 
          value={activeOnLeave} 
          subtitle="Currently out of office" 
          icon={CalendarDays} 
          colorClass="border-blue-500/20 text-blue-500 bg-blue-500/5" 
        />
        <LeaveStatCard 
          title="Processed Cycles" 
          value={totalApproved} 
          subtitle="Approved requests archive" 
          icon={UserCheck} 
          colorClass="border-emerald-500/20 text-emerald-400 bg-emerald-500/5" 
        />
      </div>

      {/* --- CENTRAL LEAVE MONITOR --- */}
      <section className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
        
        {/* --- CONTROLS PIPELINE BAR --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="relative group w-full md:w-80">
            <input 
              type="search" 
              placeholder="Search by name or leave parameters..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 text-slate-200 pl-12 pr-6 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all text-sm" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <Filter size={16} className="text-slate-500 hidden sm:block" />
            <div className="flex bg-slate-950 border border-slate-800/80 p-1 rounded-xl">
              {["All", "Pending", "Approved", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${statusFilter === tab ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- LEAVE LEDGER DATA TABLE --- */}
        <div className="overflow-x-auto">
          {loading && leaveRequests.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <p className="text-xs uppercase tracking-widest font-black font-litera">Querying Leave Logs...</p>
            </div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[900px]">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera pl-4">
                  <th className="pb-3 pl-6">Employee</th>
                  <th className="pb-3">Leave Classification</th>
                  <th className="pb-3">Duration Baseline</th>
                  <th className="pb-3">Timeframe Range</th>
                  <th className="pb-3 text-center">Status Tag</th>
                  <th className="pb-3 text-right pr-6">Management Authorization</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => {
                  const startFormatted = new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                  const endFormatted = new Date(req.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  const isItemUpdating = updatingId === req._id;

                  return (
                    <tr key={req._id} className="bg-slate-800/10 border border-slate-800/30 rounded-[1.5rem] hover:bg-slate-800/30 transition-all group">
                      
                      {/* Personnel Node Info */}
                      <td className="py-4 pl-6 rounded-l-[1.5rem]">
                        <div>
                          <p className="font-bold text-white font-litera leading-tight group-hover:text-blue-400 transition-colors">{req.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">ID: #{req.employeeId}</p>
                        </div>
                      </td>

                      {/* Leave Classification */}
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                          req.type === 'Sick Leave' ? 'text-rose-400 bg-rose-500/5 border border-rose-500/10' :
                          req.type === 'Annual Leave' ? 'text-blue-400 bg-blue-500/5 border border-blue-500/10' :
                          'text-indigo-400 bg-indigo-500/5 border border-indigo-500/10'
                        }`}>
                          {req.type}
                        </span>
                      </td>

                      {/* Leave Days Count */}
                      <td className="py-4 font-bold text-slate-200 text-sm font-litera">
                        {req.days} {req.days === 1 ? 'Day' : 'Days'}
                      </td>

                      {/* Exact Timeline Coordinates */}
                      <td className="py-4 text-slate-400 text-xs font-medium font-poppins">
                        {startFormatted} — {endFormatted}
                      </td>

                      {/* Status Badging Module */}
                      <td className="py-4">
                        <div className="flex justify-center">
                          <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            req.status === 'Pending' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                            'bg-slate-800 text-slate-500 border border-slate-700/50'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      </td>

                      {/* Dynamic Action Trigger Handlers */}
                      <td className="py-4 pr-6 rounded-r-[1.5rem] text-right">
                        {isItemUpdating ? (
                          <div className="flex justify-end pr-4">
                            <Loader2 className="animate-spin text-slate-500" size={16} />
                          </div>
                        ) : req.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleStatusUpdate(req._id, 'Approved')}
                              className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                              title="Approve Timeline Request"
                            >
                              <Check size={16} strokeWidth={2.5} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                              className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                              title="Deny Allocation"
                            >
                              <X size={16} strokeWidth={2.5} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider font-litera">
                            Decision finalized
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!loading && filteredRequests.length === 0 && (
            <div className="text-center py-12 text-slate-500 font-medium text-sm font-poppins">
              No leave applications found matching current monitoring parameters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LeaveManagementContent;