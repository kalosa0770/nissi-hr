import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Building, Users, MapPin, Briefcase, Lock, UserCircle, Mail, ArrowLeft, Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyEmail: '',
    employees: '',
    town: '',
    country: '', 
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await api.post('/api/auth/signup', formData);
      
      // Show the success toast
      toast.success(response.data.message);
  
      // Redirect to login after a short delay so they can read the toast
      setTimeout(() => {
        navigate('/login');
      }, 2000);
  
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, placeholder, Icon, type = 'text', toggleFunction = null) => (
    <div className="relative">
      <input
        required
        type={toggleFunction && showPassword ? 'text' : toggleFunction && showConfirmPassword ? 'text' : type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full bg-slate-100 text-slate-900 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-slate-500 font-medium font-litera pl-14 transition-all pr-14"
      />
      <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      {toggleFunction && (
        <button
          type="button"
          onClick={toggleFunction}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {name === 'password' ? (showPassword ? <EyeClosed size={20} /> : <Eye size={20} />) : (showConfirmPassword ? <EyeClosed size={20} /> : <Eye size={20} />)}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 md:p-8">
      
      {/* --- BACK BUTTON (OUTSIDE) --- */}
      <motion.button 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate('/')} 
        className="relative top-0 left-0 flex items-start justify-start gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all z-50 group font-bold font-litera text-sm border border-slate-200 shadow-sm w-max"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </motion.button>

      {/* Main Signup Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden mx-auto mt-10"
      >
        {/* Glow Effect */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-700/10 rounded-full blur-[80px]" />

        <div className="relative z-10 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mx-auto">
              <UserCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest font-litera">Founder Access</span>
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg font-black text-3xl mx-auto font-agenda">
              V
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight font-agenda leading-none">
              Create Your <span className="text-blue-500">Account.</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              {renderInput("firstName", "First Name", UserPlus)}
              {renderInput("lastName", "Last Name", UserPlus)}
            </div>

            {renderInput("companyName", "Company Name", Building)}
            {renderInput("companyEmail", "Company Email", Mail, "email")}
            {renderInput("employees", "Number of Employees", Users)}

            <div className="grid grid-cols-2 gap-5">
              {renderInput("town", "Town", MapPin)}
              {renderInput("country", "Country", Briefcase)}
            </div>

            {renderInput("password", "Password", Lock, "password", togglePasswordVisibility)}
            {renderInput("confirmPassword", "Confirm Password", Lock, "password", toggleConfirmPasswordVisibility)}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold font-agenda text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Submit"}
            </button>
          </form>

          <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest font-litera leading-loose">
            By signing up, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;