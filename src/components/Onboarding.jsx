import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, UserPlus, ShieldCheck, ArrowRight, User } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prev) => (prev < 3 ? prev + 1 : 1));
    }, 800);
  };

  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-montserrat tracking-tight mb-6">
              Engage new hires, right from the <span className="text-blue-600">offer letter.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Don't wait for the first day to start the relationship. Send a digital offer, collect details, and auto-sync to payroll in one flow.
            </p>
            
            {/* Step Indicators */}
            <div className="space-y-4">
              {[
                { id: 1, label: "Draft Digital Offer", icon: <Mail size={18}/> },
                { id: 2, label: "Candidate Acceptance", icon: <CheckCircle2 size={18}/> },
                { id: 3, label: "Auto-Onboard to Payroll", icon: <UserPlus size={18}/> },
              ].map((s) => (
                <div key={s.id} className={`flex items-center space-x-4 transition-opacity ${step === s.id ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`p-2 rounded-lg ${step === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {s.icon}
                  </div>
                  <span className={`font-bold ${step === s.id ? 'text-gray-900' : 'text-gray-500'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The Interactive Component */}
          <div className="relative">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden"
            >
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" exit={{ opacity: 0 }}>
                    <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Step 01: Create Offer</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">New Candidate Details</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Candidate Name</label>
                        <div className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-800 font-medium">Bwalya Mwansa</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Role</label>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-800 font-medium">Accountant</div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Monthly Basic</label>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-800 font-medium font-mono text-sm">K12,500</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-[10px] font-black text-amber-600 uppercase mb-2 tracking-widest">Step 02: Candidate View</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Review & Sign</h3>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-6">
                      <p className="text-xs text-blue-800 leading-relaxed italic">
                        "I, Bwalya Mwansa, hereby accept the position of Accountant at Nissi HR under the agreed terms of K12,500..."
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600 text-sm font-bold mb-6">
                      <ShieldCheck size={18} />
                      <span>Legally Binding Digital Signature</span>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <User size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                    <p className="text-gray-500 text-sm mb-6">Bwalya has been added to <strong>Payroll April 2026</strong>. <br/>ZRA & NAPSA deductions calculated.</p>
                    <div className="flex justify-center space-x-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase">ID: NIS-042</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleNextStep}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center group hover:bg-blue-600 transition-colors"
              >
                {step === 3 ? "Reset Demo" : "Next Stage"} 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </motion.div>

            {/* Background Blob for depth */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Onboarding;