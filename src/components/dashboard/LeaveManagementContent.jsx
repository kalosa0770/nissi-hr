import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; 
import { 
  CalendarDays, 
  X, 
  UserCheck, 
  Search, 
  Loader2,
  Phone,
  Mail,
  FileText,
  Clock,
  ShieldCheck
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
  
  // Drawer & Detailed Profile States
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('api/leaves');
      // Filter out any lingering historic non-approved states if they exist in the DB
      const approvedOnly = (response.data || []).filter(req => req.status === 'Approved');
      setLeaveRequests(approvedOnly);
    } catch (err) {
      console.error("Axios Fetch Error:", err);
      setError(err.response?.data?.message || 'Failed to fetch leave requests.');
      
      // Seed fallback with only Approved logs
      setLeaveRequests([
        { _id: "L-102", employeeId: "MHR-004", name: "Mwansa Chilufya", type: "Annual Leave", days: 12, startDate: "2026-06-05", endDate: "2026-06-17", status: "Approved", reason: "Family holiday trip to Livingstone" },
        { _id: "L-103", employeeId: "MHR-009", name: "Chipo Mwale", type: "Sick Leave", days: 3, startDate: "2026-05-28", endDate: "2026-06-02", status: "Approved", reason: "Post-malaria medical checkup review" },
        { _id: "L-104", employeeId: "MHR-012", name: "Tinashe Banda", type: "Compassionate Leave", days: 5, startDate: "2026-06-10", endDate: "2026-06-15", status: "Approved", reason: "Family funeral attendance" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Deep fetch of employee contact and structural data when opening drawer
  // Deep fetch of employee contact and structural data when opening drawer
  const handleRowClick = async (leaveRecord) => {
    setSelectedLeave(leaveRecord);
    setLoadingDetails(true);
    setEmployeeDetails(null);
    setError(null); // Clear any old errors
    
    try {
      const response = await api.get(`api/employees/${leaveRecord.employeeId}`);
      
      // Defensive check: If your backend returns { success: true, data: { ... } }
      if (response.data && response.data.data) {
        setEmployeeDetails(response.data.data);
      } else {
        // Fallback if the backend returns the raw employee document directly
        setEmployeeDetails(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch employee details:", err);
      setError(err.response?.data?.message || 'Failed to sync employee data.');
    } finally {
      setLoadingDetails(false);
    }
  };

  // =========================================================
  // 📊 TIME-SENSITIVE METRICS LOGIC
  // =========================================================
  const totalApprovedArchives = leaveRequests.length;
  
  const activeOnLeaveNow = leaveRequests.filter(r => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const start = new Date(r.startDate);
    const end = new Date(r.endDate);
    return today >= start && today <= end;
  }).length;

  const upcomingAllocations = leaveRequests.filter(r => {
    return new Date(r.startDate) > new Date();
  }).length;

  // =========================================================
  // 🔍 SEARCH FILTERS
  // =========================================================
  const filteredRequests = leaveRequests.filter(req => {
    const term = searchTerm.toLowerCase();
    return (
      req.name?.toLowerCase().includes(term) || 
      req.employeeId?.toLowerCase().includes(term) || 
      req.type?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 relative">
      
      {/* --- BANNER HEADER --- */}
      <header>
        <p className="text-slate-400 font-medium font-litera text-sm">Leave Management System</p>
        <h2 className="text-4xl font-black text-white tracking-tight font-agenda mt-1">Approvals </h2>
      </header>

      {/* --- METRICS MACRO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LeaveStatCard 
          title="Currently Out of Office" 
          value={activeOnLeaveNow} 
          subtitle="Active absence tracks running today" 
          icon={CalendarDays} 
          colorClass="border-orange-500/20 text-orange-400 bg-orange-500/5" 
        />
        <LeaveStatCard 
          title="Scheduled Approved Leaves" 
          value={upcomingAllocations} 
          subtitle="Approved periods locked ahead" 
          icon={Clock} 
          colorClass="border-blue-500/20 text-blue-400 bg-blue-500/5" 
        />
        <LeaveStatCard 
          title="Total Approved Records" 
          value={totalApprovedArchives} 
          subtitle="Complete finalized logs baseline" 
          icon={UserCheck} 
          colorClass="border-emerald-500/20 text-emerald-400 bg-emerald-500/5" 
        />
      </div>

      {/* --- MONITOR LEDGER PANEL --- */}
      <section className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="relative group w-full md:w-96">
            <input 
              type="search" 
              placeholder="Filter by staff name, ID, or leave type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 text-slate-200 pl-12 pr-6 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all text-sm" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Status: Administrative Verified Only</p>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <p className="text-xs uppercase tracking-widest font-black font-litera">Querying Leave Vectors...</p>
            </div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-3 min-w-[850px]">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera pl-4">
                  <th className="pb-3 pl-6">Name</th>
                  <th className="pb-3">Leave Details</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Start-End Date</th>
                  <th className="pb-3 pr-6 text-right">View Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => {
                  const startFormatted = new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                  const endFormatted = new Date(req.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  
                  return (
                    <tr 
                      key={req._id} 
                      onClick={() => handleRowClick(req)}
                      className="bg-slate-800/10 border border-slate-800/30 rounded-[1.5rem] hover:bg-slate-800/40 transition-all group cursor-pointer"
                    >
                      <td className="py-4 pl-6 rounded-l-[1.5rem]">
                        <div>
                          <p className="font-bold text-white font-litera leading-tight group-hover:text-orange-400 transition-colors">{req.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">ID: #{req.employeeId}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                          req.type === 'Sick Leave' ? 'text-rose-400 bg-rose-500/5 border border-rose-500/10' :
                          req.type === 'Annual Leave' ? 'text-blue-400 bg-blue-500/5 border border-blue-500/10' :
                          'text-indigo-400 bg-indigo-500/5 border border-indigo-500/10'
                        }`}>
                          {req.type}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-slate-200 text-sm font-litera">
                        {req.days} {req.days === 1 ? 'Day' : 'Days'}
                      </td>
                      <td className="py-4 text-slate-400 text-xs font-medium font-poppins">
                        {startFormatted} — {endFormatted}
                      </td>
                      <td className="py-4 pr-6 rounded-r-[1.5rem] text-right text-slate-500 group-hover:text-slate-300 text-xs font-bold font-litera transition-colors">
                        View Details →
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {!loading && filteredRequests.length === 0 && (
            <div className="text-center py-12 text-slate-500 font-medium text-sm font-poppins">
              No approved leave requests found.
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          SLIDE-OVER DRAWER: DEEP ANALYTICS & CONTACT DETAILS
          ========================================================= */}
      {selectedLeave && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all">
          <div className="absolute inset-0" onClick={() => setSelectedLeave(null)} />
          
          <div className="relative w-full max-w-md bg-slate-950 border-l border-slate-800/80 h-full shadow-2xl flex flex-col z-10 text-white p-8 space-y-6 overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <div>
                <h3 className="text-xl font-black font-agenda text-white">Leave Records</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: #{selectedLeave._id}</p>
              </div>
              <button 
                onClick={() => setSelectedLeave(null)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Core User Summary */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-1">
              <h4 className="text-lg font-black font-litera text-orange-400">{selectedLeave.name}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase">{employeeDetails?.jobTitle || 'Loading Position...'} — {employeeDetails?.department}</p>
              <p className="text-[10px] text-slate-600 font-mono">Employee ID: {selectedLeave.employeeId}</p>
            </div>

            {/* Leave Justification & Motivation Block */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-wider font-litera">
                <FileText size={12} className="text-orange-500" />
                <span>Leave Justification</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl text-xs text-slate-300 leading-relaxed italic">
                "{selectedLeave.reason || 'No additional administrative notes provided.'}"
              </div>
            </div>

            {/* Contact Vectors & Coordinates Grid */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-litera">Contact Details</p>
              
              {loadingDetails ? (
                <div className="flex items-center gap-2 text-xs text-slate-600 py-2">
                  <Loader2 className="animate-spin" size={14} />
                  <span>Fetching active communication lines...</span>
                </div>
              ) : employeeDetails ? (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                    <Phone size={14} className="text-blue-400" />
                    <span className="font-mono text-slate-200">{employeeDetails.phone || 'No phone registered'}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                    <Mail size={14} className="text-blue-400" />
                    <span className="text-slate-200 break-all">{employeeDetails.email}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-500">Failed to fetch employee details.</p>
              )}
            </div>

            {/* Wallet Metrics Standings */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-wider font-litera">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Remaining given leave days</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Remaining Annual Credit Pool</span>
                <span className="font-black text-white px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg">
                  {employeeDetails ? `${employeeDetails.leaveBalance} Days` : '...'}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default LeaveManagementContent;