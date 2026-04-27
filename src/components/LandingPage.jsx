import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Users, Laptop, Briefcase, ArrowRight, Play } from 'lucide-react';
import nissiLogo from '../assets/nisi-logo.svg';
import heroImage from '../assets/notifications.jpg';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const solutionsDropdownRef = useRef(null);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close drawer when clicking outside (but not inside drawer)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideNav = menuRef.current && !menuRef.current.contains(event.target);
      const clickedOutsideDrawer = drawerRef.current && !drawerRef.current.contains(event.target);
      const clickedOutsideDropdown = solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target);
      
      if (clickedOutsideNav && clickedOutsideDrawer && clickedOutsideDropdown) {
        setIsOpen(false);
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const toggleMenu = (name) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* --- WIND/FLAG BACKGROUND --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" />
        <motion.div 
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            skewY: [1, -1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-10%] opacity-70"
          style={{
            background: `${ isOpen ? 'radial-gradient(circle at 10% 20%, #f1f1f1 0%, transparent 40%), radial-gradient(circle at 90% 80%, #ccc 0%, transparent 40%)' : 'radial-gradient(circle at 10% 20%, #fd8f1d 0%, transparent 40%), radial-gradient(circle at 90% 80%, #533afd 0%, transparent 40%)' }`,
            backgroundSize: '200% 200%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative w-full font-litera pt-4 md:pt-6 z-[100]">
        <div ref={menuRef} className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-20 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-sm px-2 md:px-4">
            <div className="flex items-center space-x-10">
              <div className="flex-shrink-0 cursor-pointer">
                <img src={nissiLogo} alt="Nissi" className="h-5 md:h-6 w-auto" />
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-1 font-litera">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative" ref={link.name === 'Solutions' ? solutionsDropdownRef : null}>
                    <button 
                      onClick={() => link.hasDropdown && toggleMenu(link.name)}
                      className="px-4 py-2 text-[14px] font-bold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1"
                    >
                      {link.name}
                      {link.hasDropdown && (
                        <motion.div
                          animate={{ rotate: activeMenu === link.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      )}
                    </button>
                    
                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {link.hasDropdown && activeMenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4"
                        >
                          <div className="space-y-2">
                            {link.content.map((item) => (
                              <div key={item.title} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="p-2 bg-[#533afd]/10 rounded-lg text-[#533afd]">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                  <div className="text-xs text-slate-500">{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-5 font-litera">
              <button className="hidden md:block text-sm font-bold text-slate-500">Log in</button>
              <button className="hidden md:block bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95">
                Get Started
              </button>
              
              {/* Mobile Toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-3 text-[#533afd] bg-white/80 border border-slate-200 rounded-xl relative z-[90] active:scale-90 transition-transform"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- FULL SCREEN MOBILE DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300, ease: "easeInOut" }}
            className="fixed left-0 right-0 top-20 md:top-24 bottom-0 w-full bg-white md:hidden z-[90] overflow-y-auto"
          >
            <div className="p-6 pt-8 space-y-4 font-litera">
              {/* Nav Links as Dropdowns */}
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-slate-100">
                  <button 
                    onClick={() => link.hasDropdown && toggleMenu(link.name)}
                    className="w-full py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-xl font-bold text-slate-900">{link.name}</span>
                    {link.hasDropdown && (
                      <motion.div
                        animate={{ rotate: activeMenu === link.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={24} className="text-slate-400" />
                      </motion.div>
                    )}
                  </button>
                  
                  {/* Dropdown Content */}
                  <AnimatePresence>
                    {link.hasDropdown && activeMenu === link.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 space-y-3">
                          {link.content.map((item) => (
                            <div key={item.title} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                              <div className="p-2.5 bg-[#533afd]/10 rounded-xl text-[#533afd]">
                                {item.icon}
                              </div>
                              <div>
                                <div className="text-base font-bold text-slate-900">{item.title}</div>
                                <div className="text-sm text-slate-500">{item.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Action Buttons */}
              <div className="fixed bottom-1 left-0 right-0 flex justify-center border-t border-slate-100 space-x-3">
                <button className="w-full py-2 text-center font-bold text-slate-900 bg-slate-100 rounded-xl text-lg">
                  Log In
                </button>
                <button className="w-full py-2 text-center font-bold text-white bg-slate-600 rounded-xl shadow-lg shadow-blue-200 text-lg">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- HERO --- */}
      <section className="relative pt-18 pb-18 md:pt-22 lg:pt-22">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-agenda font-medium text-slate-800 leading-[1.05] tracking-tight mb-8">
                Run your team 
                on Autopilot.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg font-litera leading-relaxed">
                Nissi HR is a hybrid HR & Payroll system built for modern companies in Zambia. Automate your tax, manage leave, and pay your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#533afd] text-white  p-2 md:p-3 rounded-sm font-bold text-lg flex items-center justify-center group">
                  Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="bg-white/60 backdrop-blur-md text-slate-900 border border-slate-200 p-2 md:p-3 rounded-sm font-bold text-lg flex items-center justify-center">
                  <Play className="mr-2 fill-slate-900" size={18} /> Watch Demo
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <div className="shadow-[0_40px_80px_-15px_rgba(83,58,253,0.15)] z-10"> 
                <img src={heroImage} alt="Hero Mockup" className="w-full rounded-lg" />
               
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;