import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Globe, Shield } from 'lucide-react';
import nissiLogo from '../assets/nissi-logo.svg'; // Ensure your logo is in src/assets/

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Payroll', href: '#payroll' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
        ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-gray-100' 
        : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* BRAND SECTION */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <img 
            src={nissiLogo} 
            alt="Nissi HR Logo" 
            className="h-15 w-auto object-contain transition-transform group-hover:rotate-3" 
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-10">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[13px] uppercase tracking-widest font-bold text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-gray-200" /> {/* Divider */}

          <div className="flex items-center space-x-6">
            <button className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors">
              Log In
            </button>
            <button className="bg-[#036fb3] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200 flex items-center group">
              Get Started <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-900 bg-gray-50 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
              style={{ height: '100vh', top: '0', zIndex: -1 }}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-[80%] bg-white shadow-2xl p-8 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-bold text-blue-600">MENU</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={20}/></button>
              </div>

              <div className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-gray-900 flex justify-between items-center"
                  >
                    {link.name} <ChevronRight className="text-gray-300" />
                  </a>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <button className="w-full py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-900">
                  Log In
                </button>
                <button className="w-full py-4 bg-blue-600 rounded-2xl font-bold text-white shadow-lg shadow-blue-100">
                  Join Nissi HR
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;