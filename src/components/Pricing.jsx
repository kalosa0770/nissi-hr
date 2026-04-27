import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Building2, Globe } from 'lucide-react';

const pricingOptions = [
  {
    title: "Small Business",
    subtitle: "For emerging teams",
    impact: "Automate your foundation",
    features: [
      "Automated PAYE & NAPSA",
      "Employee Self-Service",
      "Digital Leave Management",
      "Email Payslip Distribution"
    ],
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Growth & Scale",
    subtitle: "For expanding companies",
    impact: "Optimize your workforce",
    features: [
      "Advanced Loan Tracking",
      "Bonus & Deduction Logic",
      "ZRA Compliance Suite",
      "Performance Analytics",
      "Priority Support Access"
    ],
    icon: <Building2 className="w-6 h-6" />,
    featured: true
  },
  {
    title: "Enterprise",
    subtitle: "For large organizations",
    impact: "Total operational control",
    features: [
      "Unlimited Employee Records",
      "Custom Salary Structures",
      "API & System Integration",
      "Dedicated Success Manager",
      "Multi-entity Support"
    ],
    icon: <Globe className="w-6 h-6" />
  }
];

const Pricing = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl w-full relative z-10">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-agenda font-medium text-slate-800 leading-[1.05] tracking-tight mb-8"
          >
            Flexible plans for every stage.
          </motion.h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl font-litera">
            Scaling your team in Zambia shouldn't be complicated. Our pricing is designed to grow with you, ensuring you only pay for the value you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingOptions.map((option, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-4 rounded-2xl border transition-all duration-500 flex flex-col ${
                option.featured 
                ? 'bg-slate-900 border-slate-800 text-white shadow-2xl scale-105 z-20' 
                : 'bg-white border-slate-100 text-slate-900'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${
                option.featured ? 'bg-[#533afd] text-white' : 'bg-white text-[#533afd] shadow-sm'
              }`}>
                {option.icon}
              </div>

              <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${option.featured ? 'text-blue-400' : 'text-slate-400'}`}>
                {option.subtitle}
              </span>
              <h3 className="text-3xl font-bold mb-4 font-agenda">{option.title}</h3>
              <p className={`text-sm font-bold mb-8 ${option.featured ? 'text-slate-300' : 'text-[#533afd]'}`}>
                {option.impact}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {option.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className={option.featured ? 'text-blue-400' : 'text-[#533afd]'} strokeWidth={3} />
                    <span className={`text-sm font-medium font-litera ${option.featured ? 'text-slate-400' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group ${
                option.featured 
                ? 'bg-[#533afd] text-white hover:bg-[#432fd1]' 
                : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}>
                Get Pricing
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  →
                </motion.span>
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 text-slate-400 text-sm font-medium font-litera"
        >
          Have more than 500 employees? <button className="text-[#533afd] font-bold underline">Talk to our Enterprise team.</button>
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;