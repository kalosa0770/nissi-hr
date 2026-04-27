import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, UserPlus, ShieldCheck, ArrowRight, User, FileText, PenTool } from 'lucide-react';

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
    <section className="py-24 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#533afd]/10 text-[#533afd] rounded-full text-sm font-bold mb-6">
              <PenTool size={16} className="mr-2" />
              Digital Onboarding
            </div>

            <h2 className="text-4xl md:text-5xl font-agenda font-semibold text-slate-900 tracking-tight mb-6 leading-tight">
              Engage new hires from the <span className="text-[#533afd]">offer letter</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-litera">
              Don't wait for the first day to start the relationship. Send a digital offer, collect details, and auto-sync to payroll in one seamless flow.
            </p>

            {/* Step Indicators */}
            <div className="space-y-4">
              {[
                { id: 1, label: "Draft Digital Offer", icon: <Mail size={20}/>, desc: "Create personalized offer letters" },
                { id: 2, label: "Candidate Acceptance", icon: <CheckCircle2 size={20}/>, desc: "Secure digital signatures" },
                { id: 3, label: "Auto-Onboard to Payroll", icon: <UserPlus size={20}/>, desc: "Instant payroll integration" },
              ].map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: s.id * 0.1 }}
                  className={`flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                    step === s.id
                      ? 'bg-[#533afd]/5 border border-[#533afd]/20 shadow-sm'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-3 rounded-xl flex-shrink-0 ${
                    step === s.id
                      ? 'bg-[#533afd] text-white shadow-lg'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className={`font-bold text-lg mb-1 ${
                      step === s.id ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                      {s.label}
                    </div>
                    <div className="text-sm text-slate-500">{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: The Interactive Component */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(83,58,253,0.15)] border border-slate-100 p-8 min-h-[480px] flex flex-col justify-between relative overflow-hidden"
            >
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-[#533afd] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm text-slate-600 font-medium">Processing...</p>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-[#533afd] rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <p className="text-sm font-bold text-[#533afd] uppercase tracking-wider">Create Offer</p>
                    </div>

                    <h3 className="text-2xl font-agenda font-semibold text-slate-900 mb-6">New Candidate Details</h3>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Name</label>
                        <div className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium hover:border-[#533afd]/30 transition-colors">
                          Bwalya Mwansa
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium hover:border-[#533afd]/30 transition-colors">
                            Accountant
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Basic</label>
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-mono font-medium hover:border-[#533afd]/30 transition-colors">
                            K12,500
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <p className="text-sm font-bold text-amber-600 uppercase tracking-wider">Candidate Review</p>
                    </div>

                    <h3 className="text-2xl font-agenda font-semibold text-slate-900 mb-6">Review & Sign Offer</h3>

                    <div className="p-6 bg-gradient-to-r from-[#533afd]/5 to-amber-50 rounded-2xl border border-[#533afd]/10 mb-6">
                      <div className="flex items-start space-x-3">
                        <FileText size={20} className="text-[#533afd] mt-1 flex-shrink-0" />
                        <p className="text-sm text-slate-700 leading-relaxed">
                          "I, Bwalya Mwansa, hereby accept the position of Accountant at Nissi HR under the agreed terms of K12,500 monthly basic salary..."
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-green-600">
                      <ShieldCheck size={20} />
                      <span className="font-bold text-sm">Legally Binding Digital Signature</span>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User size={32} className="text-green-600" />
                    </div>

                    <h3 className="text-2xl font-agenda font-semibold text-slate-900 mb-3">Onboarding Complete!</h3>

                    <p className="text-slate-600 text-base mb-6 leading-relaxed">
                      Bwalya has been successfully added to <strong className="text-[#533afd]">Payroll April 2026</strong>.
                      <br />ZRA & NAPSA deductions automatically calculated.
                    </p>

                    <div className="flex justify-center">
                      <span className="px-4 py-2 bg-[#533afd]/10 text-[#533afd] rounded-full text-sm font-bold tracking-wider">
                        Employee ID: NIS-042
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStep}
                className="w-full bg-[#533afd] hover:bg-[#4330e8] text-white py-4 rounded-2xl font-bold flex items-center justify-center group transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {step === 3 ? "Reset Demo" : "Continue Process"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </motion.button>
            </motion.div>

            {/* Background Elements */}
            <div className="absolute -z-10 -bottom-16 -right-16 w-64 h-64 bg-[#533afd]/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-16 -left-16 w-48 h-48 bg-amber-200/30 rounded-full blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Onboarding;