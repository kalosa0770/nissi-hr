import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Adjusted Grid: 1 column on mobile, 2 on Large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            
            {/* Title - Responsive Font Size */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] font-montserrat tracking-tight mb-6">
              Run your team on <span className="text-[#036fb3] relative inline-block">
                Autopilot.
                <svg className="absolute -bottom-1 left-0 w-full h-2 md:h-3" viewBox="0 0 318 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C106 3.5 212 3.5 315 9" stroke="#2563EB" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              The hybrid HR & Payroll system built for modern companies. Automate tax, manage leave, and pay your team in one click.
            </p>

            {/* Actions - Full width on mobile, Auto on desktop */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#036fb3] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center group">
                Get Started Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center group">
                <Play className="mr-2 fill-gray-900" size={18} /> Watch Demo
              </button>
            </div>

            {/* Checkmarks - Centered on mobile */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-4 w-full max-w-sm">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-500 font-medium">
                <CheckCircle2 className="text-green-500" size={18} />
                <span>Zero Setup Fee</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-500 font-medium">
                <CheckCircle2 className="text-green-500" size={18} />
                <span>No Credit Card</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual - Now hidden on very small screens, shown on md+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-12 lg:mt-0 px-4 sm:px-10 lg:px-0 md:block"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 md:p-4 relative z-10 overflow-hidden">
              <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
                {/* Mockup UI items */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="h-5 w-24 bg-gray-200 rounded-full" />
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="h-16 md:h-20 bg-white rounded-xl shadow-sm border border-gray-50 p-3 md:p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full" />
                      <div className="h-3 w-16 md:w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="h-3 w-12 bg-green-100 rounded" />
                  </div>
                  <div className="h-16 md:h-20 bg-white rounded-xl shadow-sm border border-gray-50 p-3 md:p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full" />
                      <div className="h-3 w-16 md:w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="h-3 w-12 bg-amber-100 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full -z-10 blur-xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;