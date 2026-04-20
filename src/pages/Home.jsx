import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Onboarding from '../components/Onboarding';
import Pricing from '../components/Pricing';
import Solutions from '../components/Solutions';
import ServicesSection from '../components/ServicesSection';

const Home = () => {
  return (
    <div>   
        <Navbar />
        <section className="relative bg-gray-50 min-h-screen overflow-hidden">
            <Hero />
            <Onboarding />
            <Pricing />
            <Solutions />
            <ServicesSection />
                {/* Additional sections like Features, Testimonials, etc. can be added here */}

                {/* Background Shape for depth */}
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/5 rounded-full -z-10" />

        </section>

        {/* Footer can be added here in the future */}
        
    </div>
  );
};

export default Home;