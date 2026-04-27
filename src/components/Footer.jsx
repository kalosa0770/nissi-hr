import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import nissiLogo from '../assets/nisi-logo.svg';
import facebook from '../assets/facebook.png';
import linkedin from '../assets/linkedin.png';
import instagram from '../assets/instagram.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Solutions: [
      { name: 'Payroll & Tax', href: '#' },
      { name: 'HR Management', href: '#' },
      { name: 'Attendance Tracking', href: '#' },
      { name: 'Employee Self-Service', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Mission', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    Resources: [
      { name: 'Zambian Labor Laws', href: '#' },
      { name: 'ZRA Tax Tables', href: '#' },
      { name: 'NAPSA Compliance', href: '#' },
      { name: 'Help Center', href: '#' },
    ]
  };

  // Grouping as image sources (src) instead of Components
  const socialIcons = [
    { src: facebook, alt: 'Facebook', href: '#' },
    { src: linkedin, alt: 'LinkedIn', href: '#' },
    { src: instagram, alt: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-slate-50 pt-24 pb-12 px-6 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-2 space-y-6">
            <img src={nissiLogo} alt="Nissi HR" className="h-6 w-auto" />
            <p className="text-slate-500 font-medium font-litera leading-relaxed max-w-sm">
              The modern HR & Payroll operating system built for Zambian businesses. 
              We automate compliance so you can focus on building your legacy.
            </p>
            <div className="flex items-center space-x-4">
              {socialIcons.map(({ src, alt, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#533afd] transition-colors shadow-sm overflow-hidden"
                >
                  {/* FIX: Use an img tag for file imports, not a component tag */}
                  <img src={src} alt={alt} className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-slate-900 font-bold font-agenda uppercase tracking-widest text-xs">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-500 hover:text-[#533afd] font-medium font-litera transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-slate-200 mb-12">
          <div className="flex items-center space-x-3 text-slate-600">
            <div className="p-2 bg-blue-50 rounded-lg text-[#533afd]"><MapPin size={18}/></div>
            <span className="text-sm font-medium font-litera">Lusaka, Zambia</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-600">
            <div className="p-2 bg-blue-50 rounded-lg text-[#533afd]"><Phone size={18}/></div>
            <span className="text-sm font-medium font-litera">+260 770940809</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-600">
            <div className="p-2 bg-blue-50 rounded-lg text-[#533afd]"><Mail size={18}/></div>
            <span className="text-sm font-medium font-litera">hello@nisihr.com</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-slate-400 text-sm font-medium font-litera">
            © {currentYear} Nisi HR. All rights reserved.
          </div>
          <div className="flex items-center space-x-8 text-xs font-bold text-slate-400 uppercase tracking-widest font-agenda">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#fd8f1d] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-64 h-64 bg-[#533afd] rounded-full blur-[100px] opacity-5 pointer-events-none" />
    </footer>
  );
};

export default Footer;