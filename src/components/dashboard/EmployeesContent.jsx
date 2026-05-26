import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { Search, Bell, Filter, Plus, Loader2, X, ShieldAlert } from 'lucide-react';

const StatCard = ({ title, value, color, textDark = false }) => (
  <div className={`${color} p-8 rounded-[2rem] flex items-center justify-between shadow-xl transition-all duration-300`}>
    <div className="space-y-1">
      <p className={`text-xs font-bold uppercase tracking-wider ${textDark ? 'text-slate-900/60' : 'text-white/60'}`}>
        {title}
      </p>
      <p className={`text-5xl font-black ${textDark ? 'text-slate-900' : 'text-white'}`}>
        {value}
      </p>
    </div>
    <div className={`w-12 h-12 rounded-full border-4 ${textDark ? 'border-slate-900/10' : 'border-white/20'} flex items-center justify-center`}>
       <div className={`w-2 h-2 rounded-full ${textDark ? 'bg-slate-900' : 'bg-white'}`} />
    </div>
  </div>
);

const EmployeesContent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal toggle state and local sub-form submitting controllers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Base structured fields mapping explicitly to your Mongoose schema parameters
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", jobTitle: "",
    department: "Engineering", nrcNumber: "", zraTpin: "", napsaNumber: "", nhimaNumber: "",
    bankName: "FNB", branchName: "", branchCode: "", accountNumber: "",
    basicSalary: "", housing: "0", transport: "0", medical: "0"
  });

  const getAvatarColor = (name) => {
    const colors = ['bg-rose-400', 'bg-orange-400', 'bg-blue-400', 'bg-emerald-400', 'bg-purple-400', 'bg-indigo-400'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash % colors.length)];
  };

  // Shared structural sync utility function
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/employees');
      setEmployees(response.data);
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'An error occurred while fetching employees.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  // Form submission dispatcher handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");

    // Nesting top-level values into the schema objects layout expectations
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      jobTitle: formData.jobTitle,
      department: formData.department,
      nrcNumber: formData.nrcNumber,
      zraTpin: formData.zraTpin,
      napsaNumber: formData.napsaNumber,
      nhimaNumber: formData.nhimaNumber,
      bankDetails: {
        bankName: formData.bankName,
        branchName: formData.branchName,
        branchCode: formData.branchCode,
        accountNumber: formData.accountNumber
      },
      compensation: {
        basicSalary: Number(formData.basicSalary),
        allowances: {
          housing: Number(formData.housing),
          transport: Number(formData.transport),
          medical: Number(formData.medical)
        }
      }
    };

    try {
      const response = await api.post('/api/employees', payload);
      const resData = response.data;
      if (!response.status || response.status >= 400) {
        throw new Error(resData?.message || 'Error processing registration payload.');
      }

      // Refresh data inline, clear states, lock down modal
      await fetchEmployees();
      setIsModalOpen(false);
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", jobTitle: "",
        department: "Engineering", nrcNumber: "", zraTpin: "", napsaNumber: "", nhimaNumber: "",
        bankName: "FNB", branchName: "", branchCode: "", accountNumber: "",
        basicSalary: "", housing: "0", transport: "0", medical: "0"
      });
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to register employee. Please check your input and try again.';
      setFormError(message);
      toast.error(message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const filteredEmployees = employees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           emp.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading && employees.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-orange-500" size={40} />
        <p className="font-bold text-sm uppercase tracking-widest font-poppins">Querying Database Cluster...</p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 relative">
      
      {/* --- TOP HEADER --- */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <p className="text-slate-400 font-medium font-litera text-sm">Welcome Back, Elijah</p>
          <h2 className="text-4xl font-black text-white tracking-tight font-agenda mt-1">Company Employees</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input 
              type="search" 
              placeholder="Search employee..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 text-slate-200 pl-12 pr-6 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 transition-all" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
          </div>
          <button className="relative p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-slate-950" />
          </button>
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-800">
             <img src={`https://ui-avatars.com/api/?name=Elijah+Kalosa&background=2575fc&color=fff`} alt="User" />
          </div>
        </div>
      </header>

      {/* --- AUTOMATED STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Employees" value={totalEmployees} color="bg-orange-500" />
        <StatCard title="Active Employees" value={activeEmployees} color="bg-white" textDark={true} />
        <StatCard title="Inactive Employees" value={inactiveEmployees} color="bg-indigo-600" />
      </div>

      {/* --- EMPLOYEE TABLE CONTAINER --- */}
      <section className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-white font-agenda">Employee List</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-all text-sm font-bold">
              <Filter size={18} /> Filter
            </button>
            {/* Click Handler explicitly mapping out standard open parameters */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
            >
              <Plus size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* --- CUSTOM TABLE --- */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-6 px-6 mb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-litera">
                <div className="col-span-2">Employee Name</div>
                <div>Position</div>
                <div>Department</div>
                <div>Joining Date</div>
                <div className="text-center">Status</div>
            </div>

            <div className="space-y-3">
                {filteredEmployees.map((emp) => {
                    const fullName = `${emp.firstName} ${emp.lastName}`;
                    const initials = `${emp.firstName[0]}${emp.lastName[0]}`.toUpperCase();
                    const joinDateFormatted = new Date(emp.joiningDate).toLocaleDateString('en-GB');
                    const colorStyle = getAvatarColor(fullName);

                    return (
                      <div key={emp._id} className="grid grid-cols-6 items-center bg-slate-800/20 border border-slate-800/30 p-4 rounded-[1.5rem] hover:bg-slate-800/40 transition-all cursor-pointer group">
                          <div className="col-span-2 flex items-center gap-4">
                              <div className={`w-11 h-11 rounded-full ${colorStyle} flex items-center justify-center font-bold text-slate-900 shadow-lg`}>
                                  {initials}
                              </div>
                              <div>
                                <p className="font-bold text-white font-litera leading-tight">{fullName}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">ID: #{emp.employeeId || emp._id.slice(-4)}</p>
                              </div>
                          </div>
                          <div className="text-slate-400 font-medium text-sm">{emp.jobTitle}</div>
                          <div className="text-slate-400 font-medium text-sm">{emp.department}</div>
                          <div className="text-slate-400 font-medium text-sm font-litera">{joinDateFormatted}</div>
                          <div className="flex justify-center">
                              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${emp.status === 'Active' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-slate-700/30 text-slate-400 border border-slate-700'}`}>
                                  {emp.status}
                              </span>
                          </div>
                      </div>
                    );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SLIDE-OVER SIDE MODAL COMPONENT (Misi HR Aesthetic Match)
          ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          {/* Dismissal Overlay trigger */}
          <div className="absolute inset-0" onClick={() => !formSubmitting && setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-slate-950 border-l border-slate-800 h-full shadow-2xl flex flex-col z-10 animate-slide-left overflow-y-auto text-white p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight font-agenda text-orange-500">Register Active Personnel</h3>
                <p className="text-xs text-slate-400 font-medium font-poppins">Inject explicit structural data records into core payroll architecture nodes.</p>
              </div>
              <button 
                disabled={formSubmitting}
                onClick={() => setIsModalOpen(false)} 
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold font-poppins rounded-xl flex items-center gap-2">
                <ShieldAlert size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6 pb-12 text-sm font-poppins">
              
              {/* SECTION: Identity Block */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">1. Core Personal Coordinates</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Corporate Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Phone Link</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Job Title</label>
                    <input required type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Department</label>
                    <select name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500">
                      {["Management", "Engineering", "Creative", "Marketing", "Operations"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: Statutory Checks */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">2. Zambian Statutory Identifiers</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">NRC Number</label>
                    <input required type="text" placeholder="XXXXXX/XX/X" name="nrcNumber" value={formData.nrcNumber} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">ZRA TPIN</label>
                    <input required type="text" name="zraTpin" value={formData.zraTpin} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">NAPSA Number</label>
                    <input required type="text" name="napsaNumber" value={formData.napsaNumber} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">NHIMA Number</label>
                    <input required type="text" name="nhimaNumber" value={formData.nhimaNumber} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>

              {/* SECTION: Bank Details */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">3. Remittance & Banking Vectors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Bank Node</label>
                    <select name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500">
                      {["FNB", "Stanbic", "ABSA", "Standard Chartered", "ZANACO", "Indo Zambia", "Atlas Mara"].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Account Number</label>
                    <input required type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Branch Name</label>
                    <input required type="text" name="branchName" value={formData.branchName} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Branch Code</label>
                    <input required type="text" name="branchCode" value={formData.branchCode} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>

              {/* SECTION: Remuneration Values */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">4. Structural Base Compensation (ZMW)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase text-orange-500">Basic Monthly Contract Salary</label>
                    <input required type="number" name="basicSalary" value={formData.basicSalary} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500 font-bold text-orange-400" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Housing Allowance</label>
                    <input type="number" name="housing" value={formData.housing} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Transport Allowance</label>
                    <input type="number" name="transport" value={formData.transport} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Medical Allowance</label>
                    <input type="number" name="medical" value={formData.medical} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
              </div>

              {/* Submission actions row */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-900">
                <button 
                  disabled={formSubmitting}
                  type="submit" 
                  className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Compile & Commit"}
                </button>
                <button 
                  type="button" 
                  disabled={formSubmitting}
                  onClick={() => setIsModalOpen(false)} 
                  className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesContent;