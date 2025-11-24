import React, { useState, useEffect } from 'react';
import { X, Send, CircleCheck, CircleAlert } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white/95 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide animate-[fadeIn_0.3s_ease-out]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
              <CircleCheck size={40} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Registration Received!</h3>
            <p className="text-gray-600 max-w-md">
              Thank you for registering with Daniel Generation School. We have sent a confirmation email to you. We look forward to welcoming your child!
            </p>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-10 border-b border-gray-200 pb-6">
              <h2 className="text-3xl font-bold text-dgs-primary mb-4">Student Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Omega Church is excited to launch <span className="font-bold text-dgs-primary">Daniel Generation School (DGS)</span> this September.
                We are dedicated to delivering a comprehensive education founded on Christian principles, utilizing the Cambridge Curriculum for Kindergarten 1 through Grade 3.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex gap-3 items-start">
                <CircleAlert className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-blue-800">
                  To secure a place, please complete this form. We will send a confirmation to your email to finalize the process.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Section 1: Student Details */}
              <section className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center text-sm">1</span>
                  Student Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Student's Full Name (First, Middle, Last) *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="e.g. Daniel Praise Mugisha" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth *</label>
                    <input type="date" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Gender *</label>
                    <select required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nationality *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="e.g. Rwandan" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Home Address (District, Sector, Cell, Street) *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="e.g. Gasabo, Kagugu, ..." />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Grade Level Applying For *</label>
                    <select required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all">
                      <option value="">Select Grade</option>
                      <option value="KG1">Kindergarten (KG1)</option>
                      <option value="KG2">Kindergarten (KG2)</option>
                      <option value="KG3">Kindergarten (KG3)</option>
                      <option value="G1">Grade 1</option>
                      <option value="G2">Grade 2</option>
                      <option value="G3">Grade 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Enrollment Type *</label>
                    <select required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all">
                      <option value="">Select Option</option>
                      <option value="Half Day">Half Day</option>
                      <option value="Full Day">Full Day</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Previous School (if any) *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="Enter previous school name or N/A" />
                  </div>
                </div>
              </section>

              {/* Section 2: Health & Medical */}
              <section className="space-y-6 border-t border-gray-100 pt-8">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center text-sm">2</span>
                  Health Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Health Insurance Used *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="e.g. RSSB, MMI, UAP..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Any Special Medical Attention? *</label>
                    <select required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all">
                      <option value="No">No</option>
                      <option value="Yes">Yes (Please specify below)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vaccinations or Medical Issues (Allergies, Asthma, etc.) *</label>
                    <textarea required rows={3} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="List any allergies or conditions..."></textarea>
                  </div>
                </div>
              </section>

              {/* Section 3: Parent/Guardian 1 */}
              <section className="space-y-6 border-t border-gray-100 pt-8">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center text-sm">3</span>
                  Primary Parent/Guardian
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name (First, Middle, Surname) *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Relationship to Student *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="e.g. Mother" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" pattern="[0-9\+\s]+" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="+250..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Occupation *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Residential Address *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                </div>
              </section>

              {/* Section 4: Parent/Guardian 2 */}
              <section className="space-y-6 border-t border-gray-100 pt-8">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-dgs-accent text-white flex items-center justify-center text-sm">4</span>
                  Second Parent/Guardian
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name (First, Middle, Surname) *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Relationship to Student *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="e.g. Father" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" pattern="[0-9\+\s]+" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" placeholder="+250..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Occupation *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Residential Address *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-dgs-primary focus:ring-2 focus:ring-dgs-primary/20 outline-none transition-all" />
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  className="bg-dgs-primary text-white font-bold py-4 px-10 rounded-xl shadow-xl hover:bg-[#4d0026] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg"
                >
                  <Send size={20} />
                  Submit Registration
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;