import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenRegistration: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenRegistration }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-white via-[#fff5f5] to-[#f0e6e0]">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-dgs-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-dgs-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-dgs-primary text-sm font-semibold animate-[fadeIn_1s_ease-in]">
            <Sparkles size={16} className="text-dgs-accent" />
            <span>Shaping Godly Character & Futures</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Nurturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-dgs-primary to-[#99004d]">Young Minds</span> for Greatness
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Providing excellence in Nursery through Grade 3 education in Rwanda. A safe, loving environment where your child learns, grows, and thrives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button
              onClick={onOpenRegistration}
              className="px-8 py-4 bg-dgs-primary text-white rounded-xl font-bold shadow-lg shadow-dgs-primary/30 hover:shadow-dgs-primary/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Enroll Now <ArrowRight size={18} />
            </button>
            <a
              href="#life-at-school"
              className="px-8 py-4 bg-white text-dgs-primary border-2 border-dgs-primary/10 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              Explore Life at School
            </a>
          </div>
        </div>

        {/* Hero Image/Visual - Using a clean Neumorphic card holding the Logo */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          {/* Floating Cards Animation */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-[3rem] shadow-neumorphism flex items-center justify-center p-8 z-10 animate-[float_6s_ease-in-out_infinite]">
            <img
              src="/logo.png"
              alt="DGS Shield"
              className="w-full h-full object-contain opacity-90"
            />

            {/* Floating Badge 1 */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-[bounce_3s_infinite]">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg font-bold">A+</div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Education</p>
                <p className="text-sm font-bold text-gray-800">Cambridge</p>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute -bottom-8 -left-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-[bounce_4s_infinite_1s]">
              <div className="w-10 h-10 bg-dgs-accent/20 rounded-full flex items-center justify-center text-dgs-primary text-lg">❤️</div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Care</p>
                <p className="text-sm font-bold text-gray-800">Nurturing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for simple float animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;