import React from 'react';
import Navbar from '../components/layout/Navbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section id="home" className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:w-1/2">
              <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-[#ED1C24] font-bold text-xs uppercase tracking-wider mb-4">
                Established 2024
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Precision Cuts for the <span className="text-[#ED1C24]">Modern Gentleman</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Experience the perfect blend of traditional barbering and contemporary style. 
                Our master barbers are dedicated to your craft.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#booking" className="bg-[#ED1C24] text-white px-8 py-4 rounded-md font-bold hover:shadow-lg transition-all">
                  Book Appointment
                </a>
                <a href="#queue" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-md font-bold hover:bg-slate-50 transition-all">
                  Join Walk-in Queue
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Classic Haircut', 'Beard Trim', 'Hot Towel Shave'].map((service) => (
                <div key={service} className="p-8 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="iconify text-[#ED1C24] text-2xl" data-icon="lucide:scissors"></span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service}</h3>
                  <p className="text-slate-500">Professional grooming tailored to your style.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;