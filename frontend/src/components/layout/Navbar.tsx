import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-slate-100 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-[#ED1C24] font-bold text-xl tracking-tight">
            Classic Cuts
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-slate-800 hover:text-[#ED1C24] font-medium transition-colors">Home</a>
          <a href="#services" className="text-slate-800 hover:text-[#ED1C24] font-medium transition-colors">Services</a>
          <a href="#booking" className="text-slate-800 hover:text-[#ED1C24] font-medium transition-colors">Book Now</a>
          <a href="#queue" className="text-slate-800 hover:text-[#ED1C24] font-medium transition-colors">Walk-In Queue</a>
          <Link to="/booking" className="bg-[#ED1C24] text-white px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition-all shadow-sm">
            Appointment
          </Link>
        </div>

        <div className="md:hidden">
          <button className="text-slate-900 p-2">
            <span className="iconify" data-icon="lucide:menu"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;