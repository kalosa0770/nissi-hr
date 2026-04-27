import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Users, Laptop, Briefcase } from 'lucide-react';
import nissiLogo from '../assets/nisi-logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { 
      name: 'Solutions', 
      hasDropdown: true,
      content: [
        { title: 'Payroll', desc: 'Compliant PAYE & NAPSA.', icon: <Zap size={18}/> },
        { title: 'HR Core', desc: 'Employee records & onboarding.', icon: <Users size={18}/> },
        { title: 'IT Ops', desc: 'Hardware & app management.', icon: <Laptop size={18}/> },
        { title: 'Compliance', desc: 'Zambian labor law automation.', icon: <Briefcase size={18}/> },
      ]
    },
    { name: 'About', hasDropdown: false },
    { name: 'Pricing', hasDropdown: false },
  ];

  return (
    <nav className="relative w-full font-sans pt-4 md:pt-6">
      <div 
        ref={menuRef}
        className="mx-auto max-w-7xl px-2 md:px-6"
      >
        <div className="flex items-center justify-between h-12 md:h-20 bg-white border border-slate-200/60 shadow-sm rounded-2xl px-6 transition-all">
          
          {/* LEFT: LOGO & NAV */}
          <div className="flex items-center space-x-10">
            <div className="flex-shrink-0 cursor-pointer">
              <img src={nissiLogo} alt="Nissi" className="h-5 md:h-6 w-auto" />
            </div>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === link.name ? null : link.name)}
                    className={`flex items-center px-4 py-2 text-[14px] font-bold tracking-tight transition-all rounded-lg ${
                      activeMenu === link.name 
                        ? 'bg-slate-50 text-blue-600' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
                    }`}
                  >
                    {link.name} 
                    {link.hasDropdown && (
                      <ChevronDown size={14} className={`ml-1.5 transition-transform duration-300 ${activeMenu === link.name ? 'rotate-180 text-blue-500' : 'opacity-40'}`} />
                    )}
                  </button>

                  {/* STRIPE-STYLE DROPDOWN */}
                  <AnimatePresence>
                    {activeMenu === link.name && link.hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-0 mt-3 w-[440px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[60]"
                      >
                        <div className="p-7 grid grid-cols-2 gap-x-8 gap-y-7">
                          {link.content.map((item) => (
                            <div key={item.title} className="group cursor-pointer flex flex-col">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  {item.icon}
                                </div>
                                <h4 className="text-[14px] font-bold text-slate-900">{item.title}</h4>
                              </div>
                              <p className="text-[12px] leading-relaxed text-slate-500 font-medium">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="bg-slate-50/80 p-4 px-7 border-t border-slate-100">
                          <button className="text-[12px] font-bold text-blue-600 flex items-center hover:underline">
                            View all solutions <ChevronDown size={12} className="-rotate-90 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center space-x-5">
            <button className="hidden md:block text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Log in
            </button>
            <button className="hidden md:flex bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-sm active:scale-95">
              Get Started
            </button>
            
            {/* MOBILE HAMBURGER */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1d179b] hover:bg-slate-50 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white z-[100] md:hidden shadow-2xl border-t border-slate-100"
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <div className="p-6 space-y-8">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-4">
                  <div className="flex justify-between items-center group">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">{link.name}</span>
                    {link.hasDropdown && <ChevronDown size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />}
                  </div>
                  {link.hasDropdown && (
                    <div className="grid grid-cols-1 gap-5 pl-1">
                      {link.content.map((item) => (
                        <div key={item.title} className="flex items-center space-x-4">
                          <div className="h-10 w-10 flex-shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-slate-900">{item.title}</p>
                            <p className="text-[12px] text-slate-500 font-medium">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <button className="w-full py-4 text-center font-bold text-slate-900 bg-slate-50 rounded-2xl">Log In</button>
                <button className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">Start for Free</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;