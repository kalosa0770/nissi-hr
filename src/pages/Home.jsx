import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Onboarding from '../components/Onboarding';
import Pricing from '../components/Pricing';
import Solutions from '../components/Solutions';
import ServicesSection from '../components/ServicesSection';
import LandingPage from '../components/LandingPage';
import BusinessData from '../components/BusinessData';
import Features from '../components/Features';
import SignUpCta from '../components/SignupCta';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>   
        {/* <Navbar /> */}
        <LandingPage />
        <section className="relative min-h-screen overflow-hidden">
          <BusinessData />
          <Features />
          <Pricing />
          <SignUpCta />
         
          
                {/* Background Shape for depth */}
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/5 rounded-full -z-10" />

        </section>

        {/* Footer can be added here in the future */}
        <Footer />
        
    </div>
  );
};

export default Home;