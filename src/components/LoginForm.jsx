import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowLeft, Eye, EyeClosed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
        const response = await api.post('/api/auth/login', formData);
      
        localStorage.setItem('nisi_token', response.data.token);
        localStorage.setItem('nisi_user', JSON.stringify(response.data.user));;
      
      toast.success("Login Successful!");
      
      // Redirect to the dashboard
      setTimeout(() => navigate('/dashboard'), 1000);
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4">
      
      {/* --- BACK BUTTON (OUTSIDE) --- */}
      <motion.button 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate('/')} 
        className="relative top-0 left-0 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all z-50 group font-bold font-litera text-sm border border-slate-200 shadow-sm w-max"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 md:p-12 relative overflow-hidden mx-auto mt-10"
      >
        {/* Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-[60px]" />

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg font-black text-3xl mx-auto font-agenda">
              V
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight font-agenda">
              Welcome <span className="text-blue-500">Back.</span>
            </h1>
            <p className="text-slate-400 font-medium font-litera text-sm">
              Log in to manage your team and payroll.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Company Email"
                className="w-full bg-slate-800/50 text-white border border-slate-700/50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 font-medium font-litera pl-14 transition-all"
              />
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>

            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full bg-slate-800/50 text-white border border-slate-700/50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 font-medium font-litera pl-14 pr-14 transition-all"
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest font-litera">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold font-agenda text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Verifying..." : (
                <>
                  Login <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-4 border-t border-slate-800">
            <p className="text-slate-500 text-sm font-medium font-litera">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;