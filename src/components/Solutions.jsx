import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Calendar, ShieldCheck, Zap } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      title: "Automated Zambian Payroll",
      desc: "Stop calculating PAYE, NAPSA, and NHIMA by hand. Our engine is pre-configured with 2026 Zambian tax brackets, ensuring your team is paid accurately and on time, every single month.",
      icon: <Calculator className="text-blue-600" />,
      features: ["One-click net pay calculation", "Automated ZRA tax logs", "Bank-ready upload files"],
      imageBg: "bg-blue-600"
    },
    {
      title: "Self-Service Leave Management",
      desc: "Empower your team to manage their own time. Employees can request leave (Annual, Sick, or Mother's Day) directly from their phones, while managers approve with a tap.",
      icon: <Calendar className="text-blue-600" />,
      features: ["Real-time leave balances", "Manager approval workflow", "Automated holiday tracking"],
      imageBg: "bg-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
            Our Solutions
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-montserrat tracking-tight">
            Software that understands <br/> 
            <span className="text-gray-400">how you work.</span>
          </h3>
        </div>

        <div className="space-y-32">
          {solutions.map((item, index) => (
            <div 
              key={item.title} 
              className={`flex flex-col lg:items-center gap-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-6 font-montserrat">
                  {item.title}
                </h4>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {item.desc}
                </p>
                <ul className="space-y-4">
                  {item.features.map((feat) => (
                    <li key={feat} className="flex items-center space-x-3 text-gray-700 font-medium">
                      <Zap size={18} className="text-blue-600 fill-blue-600" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 relative"
              >
                <div className={`aspect-square rounded-[40px] ${item.imageBg} relative overflow-hidden shadow-2xl`}>
                  {/* Decorative "Dashboard" Elements */}
                  <div className="absolute inset-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                    <div className="flex justify-between items-center mb-8">
                       <div className="h-4 w-24 bg-white/40 rounded-full" />
                       <ShieldCheck className="text-white opacity-60" size={20} />
                    </div>
                    <div className="space-y-4">
                       <div className="h-12 w-full bg-white/20 rounded-xl" />
                       <div className="h-12 w-full bg-white/20 rounded-xl" />
                       <div className="h-12 w-3/4 bg-white/20 rounded-xl" />
                    </div>
                  </div>
                  {/* Floating Notification */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute bottom-12 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <ShieldCheck size={16} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Verified 2026<br/><span className="text-gray-900 text-[12px]">Compliant</span></p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;