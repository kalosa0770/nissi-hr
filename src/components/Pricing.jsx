import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, TrendingUp, Calendar } from 'lucide-react';

const Pricing = () => {
  return (
    <section className="py-24 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-montserrat tracking-tight mb-4">
            Tailored for <span className="text-blue-600">Growth.</span>
          </h2>
          <p className="text-gray-500 font-medium">Choose the plan that fits your workforce size.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Tier 1: Small Business */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-gray-50 rounded-[40px] p-8 md:p-12 flex flex-col justify-between border border-gray-100 shadow-sm"
          >
            <div>
              <p className="text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest">
                Recommended for businesses with 1-50 employees
              </p>
              <h3 className="text-4xl font-black text-gray-900 font-montserrat mb-4">Nissi Payroll</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Pay your people securely, accurately and compliantly every time with our automated ZRA engine.
              </p>
              <p className="text-2xl font-black text-gray-900 mb-10">
                From K150<span className="text-sm font-bold text-gray-400">/month</span>
              </p>
              
              <button className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-all mb-12">
                Discover Nissi Payroll
              </button>
            </div>

            {/* UI Mockup Placeholder (Small) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-gray-800">You are paying <span className="text-blue-600">12 employees</span></p>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <div className="h-24 bg-blue-50/50 rounded-xl relative overflow-hidden flex items-end">
                 {/* Simple Chart Representation */}
                 <div className="w-full h-1/2 bg-blue-600/10 border-t-2 border-blue-600"></div>
              </div>
            </div>
          </motion.div>

          {/* Tier 2: Enterprise/Large Business */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-gray-50 rounded-[40px] p-8 md:p-12 flex flex-col justify-between border border-gray-100 shadow-sm"
          >
            <div>
              <p className="text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest">
                Recommended for businesses with 50+ employees
              </p>
              <h3 className="text-4xl font-black text-gray-900 font-montserrat mb-4">Nissi Enterprise</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Next generation payroll and HR in one powerful yet simple integrated solution for scale.
              </p>
              <p className="text-2xl font-black text-gray-900 mb-10">
                Contact us for custom pricing.
              </p>
              
              <button className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-all mb-12">
                Discover Nissi Enterprise
              </button>
            </div>

            {/* UI Mockup Placeholder (Large) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-auto">
              <div className="grid grid-cols-2 gap-2 mb-4">
                 <div className="h-3 w-full bg-gray-100 rounded"></div>
                 <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[...Array(28)].map((_, i) => (
                  <div key={i} className={`h-4 rounded-sm ${i % 7 === 0 ? 'bg-blue-100' : 'bg-gray-50'}`}></div>
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Calendar size={12} className="text-gray-400" />
                <p className="text-[10px] font-bold text-gray-400 uppercase">Leave Management View</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;