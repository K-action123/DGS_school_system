import React from 'react';
import { CircleCheck } from 'lucide-react';

interface AdmissionProps {
  onOpenRegistration: () => void;
}

const Admission: React.FC<AdmissionProps> = ({ onOpenRegistration }) => {
  return (
    <section id="admissions" className="py-20 bg-dgs-primary text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white text-gray-800 rounded-3xl p-8 md:p-16 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">

          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-dgs-primary">Join Our Family</h2>
            <p className="text-gray-600 text-lg">
              We are currently accepting applications for the upcoming academic year for Nursery through Grade 3. Secure a spot for your child in an environment that prioritizes their growth and happiness.
            </p>

            <ul className="space-y-3 mt-4">
              {[
                'Cambridge Curriculum (KG1 - G3)',
                'Christian-based Values',
                'Safe & Secure Playground',
                'Small Class Sizes'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CircleCheck className="text-dgs-accent flex-shrink-0" size={20} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <button
                onClick={onOpenRegistration}
                className="w-full sm:w-auto px-8 py-4 bg-dgs-primary text-white font-bold rounded-xl hover:bg-[#4d0026] transition-colors shadow-lg"
              >
                Register Now
              </button>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-[#f8f5f2] p-8 rounded-2xl border border-[#ede5dd]">
              <h3 className="text-xl font-bold text-dgs-primary mb-6 border-b border-gray-200 pb-4">Admission Process</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">Registration</h4>
                    <p className="text-sm text-gray-600">Complete the online registration form.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">Confirmation</h4>
                    <p className="text-sm text-gray-600">Receive confirmation email.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">Interview & Welcome</h4>
                    <p className="text-sm text-gray-600">Meet the team and start the journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Admission;