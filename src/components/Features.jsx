import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Mail, 
  Globe, 
  CreditCard, 
  Calculator,
  LayoutDashboard
} from 'lucide-react';

const featureList = [
  {
    title: "Employee Hub",
    desc: "Comprehensive management of information, self-service accounts, and streamlined leave/loan workflows.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Payroll on Autopilot",
    desc: "Automated calculations for deductions, bonuses, and PIT/PAYE compliance across multiple tax laws.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Smart Benefits",
    desc: "Native support for contributory pensions and health insurance integrations with zero manual entry.",
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    title: "Interactive Insights",
    desc: "Beautifully designed dashboards and real-time charts providing detailed reports at your fingertips.",
    icon: <LayoutDashboard className="w-6 h-6" />,
  },
  {
    title: "Financial Readiness",
    desc: "Electronic payment ready with flexible salary structures that adapt to your business needs.",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    title: "Secure & Global",
    desc: "24/7 mobile access via a highly secure system, backed by efficient, expert customer support.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

const Features = () => {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl w-full relative z-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block bg-blue-50 px-8 py-4 rounded-3xl mb-8"
          >
            <span className="text-4xl md:text-5xl lg:text-6xl text-slate-800 font-medium tracking-tight font-agenda">
              Features
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-xl md:text-2xl font-medium text-slate-500 tracking-tight leading-relaxed font-litera"
          >
            An all-in-one HR powerhouse designed to automate your operations and focus on what matters most—your people.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className="group p-10 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_32px_64px_-12px_rgba(83,58,253,0.12)] transition-all duration-500"
            >
              <div className="w-14 h-14 mb-8 rounded-2xl bg-white flex items-center justify-center text-[#533afd] shadow-sm group-hover:bg-[#533afd] group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight font-agenda">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-[15px] leading-relaxed font-medium font-litera">
                {feature.desc}
              </p>

              <div className="mt-8 h-1.5 w-10 bg-slate-200 rounded-full group-hover:w-20 group-hover:bg-[#533afd] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;