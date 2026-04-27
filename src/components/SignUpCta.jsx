import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import signUpImg from '../assets/signup-page.jpg'

const SignUpCta = () => {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      
      {/* Background decoration matching your waving flag motion */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
         <motion.div 
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-10%]"
          style={{
            background: `linear-gradient(110deg, #fd8f1d, #f894f4, #533afd)`,
            backgroundSize: '200% 200%',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* --- LEFT SIDE: IMAGE PLACEHOLDER --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-video md:aspect-square w-full bg-slate-100 rounded-[2rem] overflow-hidden flex items-center justify-center border border-slate-200">
               {/* REPLACE THE DIV BELOW WITH YOUR <img /> TAG */}
               <img src={signUpImg} alt='signup image' />
               
               {/* Subtle background glow to make the future image pop */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#533afd]/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: WORDS/CONTENT --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[#533afd] font-bold tracking-widest text-xs uppercase bg-blue-50 px-4 py-2 rounded-full font-litera inline-block">
                Get Started Free
              </span>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-agenda font-medium text-slate-800 leading-[1.05] tracking-tight mb-8">
                Sign up in minutes. <br />
                No credit card.
              </h2>
            </div>
            
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium font-litera max-w-xl">
              Stop fighting spreadsheets and manual PAYE math. Join the modern Zambian companies running their HR on autopilot. Activation is fast, intuitive, and completely free to start.
            </p>

            <div className="pt-4">
              <button className="w-full sm:w-auto bg-[#533afd] text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center group font-agenda active:scale-95 transition-all duration-150 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300">
                Create Your Account 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SignUpCta;