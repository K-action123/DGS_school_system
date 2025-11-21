import React from 'react';
import { User, Quote } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Founder Card - Neumorphism Style */}
          <div className="order-2 lg:order-1 flex justify-center">
             <div className="relative w-80 h-96 bg-[#f0f0f3] rounded-[40px] shadow-neumorphism flex flex-col items-center justify-center p-8 text-center group transition-transform hover:scale-[1.02] duration-500">
                {/* User Icon Placeholder */}
                <div className="w-32 h-32 rounded-full bg-[#f0f0f3] shadow-neumorphism flex items-center justify-center mb-6 border-4 border-white">
                    <User size={64} className="text-dgs-primary opacity-80" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800">Founder Name</h3>
                <p className="text-dgs-accent font-medium tracking-wide uppercase text-sm mb-4">Visionary Leader</p>
                
                <div className="mt-4 flex gap-4 justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#f0f0f3] shadow-neumorphism flex items-center justify-center text-dgs-primary cursor-pointer hover:text-dgs-accent transition-colors">
                    <span className="font-serif italic">f</span>
                  </div>
                   <div className="w-10 h-10 rounded-full bg-[#f0f0f3] shadow-neumorphism flex items-center justify-center text-dgs-primary cursor-pointer hover:text-dgs-accent transition-colors">
                    <span className="font-serif italic">in</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-block">
                <h2 className="text-4xl font-bold text-dgs-primary mb-2">About Our School</h2>
                <div className="h-1.5 w-20 bg-dgs-accent rounded-full"></div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Daniel Generation School is built on the foundation of faith and excellence. We believe that every child is a seed of greatness waiting to flourish. Our curriculum is designed not just to educate, but to inspire character, creativity, and confidence in young learners from Nursery to Grade 3.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-r-2xl border-l-4 border-dgs-accent relative mt-8">
               <Quote className="absolute top-4 left-4 text-dgs-accent/20" size={48} />
               <p className="italic text-gray-700 font-medium relative z-10 pl-6">
                 "We don't just teach children; we shape the future leaders of our generation, grounding them in love and wisdom."
               </p>
               <p className="text-right text-dgs-primary font-bold mt-4">- Founder's Message</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="p-4 rounded-xl bg-white shadow-md border border-gray-100 text-center">
                 <h4 className="text-3xl font-bold text-dgs-primary">N-G3</h4>
                 <p className="text-sm text-gray-500">Grades Offered</p>
               </div>
               <div className="p-4 rounded-xl bg-white shadow-md border border-gray-100 text-center">
                 <h4 className="text-3xl font-bold text-dgs-primary">100%</h4>
                 <p className="text-sm text-gray-500">Care & Safety</p>
               </div>
            </div>
          </div>
        </div>
       </div>
    </section>
  );
};

export default About;