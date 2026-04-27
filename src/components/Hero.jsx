import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Users } from 'lucide-react';

const Hero = () => {
  // Animation variants for the high-energy blobs
  const blobVariants = {
    animate: {
      scale: [1, 1.1, 1],
      x: [0, 40, 0],
      y: [0, 60, 0],
      rotate: [0, 20, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    animateReverse: {
      scale: [2.1, 1, 1.1],
      x: [0, -50, 0],
      y: [0, -30, 0],
      rotate: [0, -20, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      {/* --- BRANDED MOTION GRADIENT BACKGROUND --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
        {/* Animated Mesh Base */}
        <motion.div 
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 10% 20%, #fd8f1d 0%, transparent 40%), radial-gradient(circle at 90% 80%, #533afd 0%, transparent 40%)',
            backgroundSize: '200% 200%'
          }}
        />

        {/* Floating Blob: #fd8f1d (Orange) */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-[#fd8f1d]/15 rounded-full blur-[120px]"
        />

        {/* Floating Blob: #f894f4 (Pink) */}
        <motion.div
          variants={blobVariants}
          animate="animateReverse"
          className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-[#f894f4]/20 rounded-full blur-[100px]"
        />

        {/* Floating Blob: #533afd (Purple/Blue) */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute bottom-[-15%] left-[10%] w-[700px] h-[700px] bg-[#533afd]/15 rounded-full blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-left lg:text-left"
          >
            <h1 className="text-4xl font-agenda md:text-6xl lg:text-7xl font-black text-slate-600 leading-[1.05] tracking-tight mb-8">
              Run your team  
              on Autopilot.
              
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              Nisi HR is a hybrid HR & Payroll system built for modern companies in Zambia. Automate tax, manage leave, and pay your team.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="w-full sm:w-auto bg-[#533afd] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(83,58,253,0.3)] transition-all active:scale-95 flex items-center justify-center group">
                Get Started Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                <Play className="mr-2 fill-slate-900" size={18} /> Watch Demo
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6">
              {['Zero Setup Fee', 'No Credit Card'].map((text) => (
                <div key={text} className="flex items-center space-x-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <CheckCircle2 className="text-[#f894f4]" size={18} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual (Mockup) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(83,58,253,0.15)] border border-slate-100 p-5 relative z-10">
              <div className="bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#fd8f1d]/40" />
                    <div className="w-3 h-3 rounded-full bg-[#f894f4]/40" />
                    <div className="w-3 h-3 rounded-full bg-[#533afd]/40" />
                  </div>
                  <div className="h-2 w-24 bg-slate-200 rounded-full" />
                </div>
                
                <div className="space-y-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-between group cursor-pointer hover:border-[#f894f4]/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          i === 1 ? 'bg-[#533afd] text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          <Users size={24} />
                        </div>
                        <div>
                          <div className="h-3 w-20 bg-slate-100 rounded mb-2" />
                          <div className="h-2 w-12 bg-slate-50 rounded" />
                        </div>
                      </div>
                      <div className={`h-6 w-14 rounded-full ${i === 1 ? 'bg-green-100' : 'bg-slate-50'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating Accents with Brand Colors */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#fd8f1d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#533afd] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;