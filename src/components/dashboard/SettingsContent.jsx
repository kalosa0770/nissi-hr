import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Shield, 
  Camera, 
  LogOut, 
  Trash2,
  AlertTriangle 
} from 'lucide-react';

const SettingsContent = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('nissi_token');
    localStorage.removeItem('nissi_user');
    
    // Redirect to login
    navigate('/login');
  };

  const InputField = ({ label, value, type = "text" }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
        {label}
      </label>
      <input 
        type={type}
        defaultValue={value}
        className="w-full bg-slate-800/40 border border-slate-800 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition-all font-litera"
      />
    </div>
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 pb-32 md:pb-12">
      <header className="space-y-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-white font-agenda tracking-tight">
          Account <span className="text-blue-500">Settings</span>
        </h2>
        <p className="text-slate-400 font-medium font-litera text-sm">
          Manage your personal details and security preferences.
        </p>
      </header>

      <div className="max-w-4xl space-y-8">
        
        {/* --- PROFILE SECTION --- */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-sm p-6 md:p-10 space-y-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-800 pb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-slate-800 border border-slate-700 rounded-full text-white hover:bg-blue-500 transition-all">
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center md:text-left space-y-1">
              <h4 className="text-xl font-black text-white">{user?.firstName} {user?.lastName}</h4>
              <p className="text-sm text-slate-500 font-medium tracking-wide">Administrator • {user?.companyName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name" value={user?.firstName} />
            <InputField label="Last Name" value={user?.lastName} />
            <InputField label="Email Address" value={user?.email} />
            <InputField label="Role" value="Technical Founder" />
          </div>

          <div className="pt-4 flex justify-end">
            <button className="px-10 py-4 rounded-xl bg-white text-slate-950 text-sm font-black hover:bg-slate-100 transition-all active:scale-95 shadow-xl">
              Update Profile
            </button>
          </div>
        </div>

        {/* --- DANGER ZONE / ACTIONS --- */}
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 text-rose-500">
            <AlertTriangle size={20} />
            <h3 className="font-black font-agenda uppercase tracking-widest text-sm">Danger Zone</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-sm">Session Management</p>
              <p className="text-slate-500 text-xs mt-1">Log out of your current session on this device.</p>
            </div>
            
            {/* THE LOGOUT BUTTON */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-rose-500/30 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all w-full md:w-auto justify-center"
            >
              <LogOut size={16} />
              Log Out of Nisi
            </button>
          </div>

          <div className="h-px bg-rose-500/10 w-full" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-sm">Delete Account</p>
              <p className="text-slate-500 text-xs mt-1">Permanently remove your account and all payroll data.</p>
            </div>
            <button className="flex items-center gap-3 px-6 py-3 rounded-xl text-slate-500 font-black text-xs uppercase tracking-widest hover:text-rose-500 transition-all">
              <Trash2 size={16} />
              Close Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsContent;