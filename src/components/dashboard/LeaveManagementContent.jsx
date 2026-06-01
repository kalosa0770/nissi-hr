import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; 
import { 
  Search, 
  X, 
  Loader2,
  Phone,
  Mail,
  FileText,
  ShieldCheck
} from 'lucide-react';

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
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white md:text-start text-center tracking-tight font-agenda mt-1">Leave Approvals</h2>
          <p className="mt-2 text-sm md:text-start text-center text-slate-400 max-w-xl">Monitor and manage approved leave requests. Search staff to view their leave schedules and contact details.</p>
        </div>
      </header>

      {/* --- METRICS MACRO GRID --- */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Currently Out</p>
            <p className="text-base font-normal text-white">{activeOnLeaveNow}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Upcoming Leaves</p>
            <p className="text-base font-normal text-white">{upcomingAllocations}</p>
          </div>
        </div>
        <div className="bg-white p-4 w-full rounded-lg flex flex-col sm:flex-row text-center items-center justify-center gap-3 shadow-xl transition-all duration-300">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-900/60">Total Approved</p>
            <p className="text-base font-normal text-slate-900">{totalApprovedArchives}</p>
          </div>
        </div>
      </div>

      {/* --- MONITOR LEDGER PANEL --- */}
      <section className="bg-slate-900/40 rounded-lg border border-slate-800/50 p-2 lg:p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-white font-agenda text-center">Leave Records</h3>
          <div className="relative group w-full lg:max-w-sm">
            <input 
              type="search" 
              placeholder="Search by name, ID, or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/80 border border-slate-800 text-slate-200 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all text-sm" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="animate-spin text-orange-500" size={32} />
            <p className="text-xs uppercase tracking-widest font-black font-litera">Loading Leave Records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="hidden md:grid grid-cols-5 px-6 mb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera">
                <div className="col-span-2">Employee Name</div>
                <div>Leave Type</div>
                <div>Duration</div>
                <div className="text-right">Dates</div>
              </div>

              <div className="space-y-3">
                {filteredRequests.map((req) => {
                  const startFormatted = new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                  const endFormatted = new Date(req.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  
                  return (
                    <div 
                      key={req._id} 
                      onClick={() => handleRowClick(req)}
                      className="grid grid-cols-1 md:grid-cols-5 items-start gap-4 md:items-center bg-slate-800/20 border border-slate-800/30 p-4 rounded-[1.5rem] hover:bg-slate-800/40 transition-all cursor-pointer group"
                    >
                      <div className="md:col-span-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center font-bold text-slate-950 shadow-lg flex-shrink-0">
                          {req.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-white font-litera leading-tight group-hover:text-blue-400 transition-colors">{req.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">ID: #{req.employeeId}</p>
                        </div>
                      </div>
                      <div>
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Leave Type</span>
                        <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold inline-flex ${req.type === 'Sick Leave' ? 'text-rose-400 bg-rose-500/5 border border-rose-500/10' : req.type === 'Annual Leave' ? 'text-blue-400 bg-blue-500/5 border border-blue-500/10' : 'text-indigo-400 bg-indigo-500/5 border border-indigo-500/10'}`}>
                          {req.type}
                        </span>
                      </div>
                      <div className="text-slate-400 font-medium text-sm">
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Duration</span>
                        {req.days} {req.days === 1 ? 'Day' : 'Days'}
                      </div>
                      <div className="text-slate-400 font-medium text-sm font-poppins text-right md:text-right">
                        <span className="block md:hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 text-left">Dates</span>
                        {startFormatted} — {endFormatted}
                      </div>
                    </div>
                  );
                })}

                {filteredRequests.length === 0 && (
                  <div className="text-center py-12 text-slate-500 font-medium text-sm font-poppins">
                    No approved leave requests found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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