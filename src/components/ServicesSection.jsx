import React from 'react';
import { motion } from 'framer-motion';

const offerings = [
  {
    title: "HR & Payroll",
    description: "Automate your local compliance, ZRA taxes, and NAPSA contributions in one click.",
    icon: "👤", // Replace with a 3D icon image later
    color: "bg-blue-500",
  },
  {
    title: "IT Management",
    description: "Manage devices, software access, and security protocols for your entire tech team.",
    icon: "💻",
    color: "bg-purple-600",
  },
  {
    title: "Finance & Spend",
    description: "Issue corporate cards and track every ngwee spent with real-time analytics.",
    icon: "💳",
    color: "bg-green-500",
  },
];

const OfferingCard = ({ title, description, icon, color }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    {/* Decorative background glow on hover */}
    <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${color} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />
    
    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${color} text-3xl shadow-lg shadow-inner`}>
      {icon}
    </div>
    
    <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
    
    <div className="mt-6 flex items-center text-sm font-semibold text-slate-900">
      Learn more 
      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </motion.div>
);

export default function ServicesSection() {
  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Everything you need to run your business.
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Stop juggling five different systems. We provide a single source of truth for your people, processes, and devices.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {offerings.map((item, idx) => (
            <OfferingCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}