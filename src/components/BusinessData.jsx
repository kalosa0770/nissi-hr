import React from 'react';
import dashBoardImg from '../assets/dashboard-laptop.png';

const BusinessData = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="text-left lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-agenda font-medium text-slate-800 leading-[1.05] tracking-tight mb-8">
            Your business data with people at the center
            </h2>
            <p className="text-lg md:text-xl text-left text-slate-600 leading-relaxed font-litera max-w-2xl mx-auto lg:mx-0">
            Nisi HR understands your workforce—roles, org charts, and reporting lines—and connects that context across the business so everything attaches to each employee, unlocking smarter automation, cleaner reporting, and real-time decisions.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={dashBoardImg}
              alt="Recruitment and onboarding workflows"
              className="w-full max-w-xl rounded-sm shadow-[0_30px_80px_-30px_rgba(83,58,253,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessData;