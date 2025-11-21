import React from 'react';
import { Book, Users, GraduationCap, ShieldCheck, ArrowLeft, User } from 'lucide-react';

interface StaffPortalsProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaffPortals: React.FC<StaffPortalsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const portals = [
    {
      id: 'admissions',
      role: 'Admissions Portal',
      icon: <Users size={48} />,
      description: 'Manage student applications, enrollments, and parent communications.'
    },
    {
      id: 'librarian',
      role: 'Librarian Portal',
      icon: <Book size={48} />,
      description: 'Access book catalog, track lending history, and manage library resources.'
    },
    {
      id: 'teacher',
      role: 'Teacher Portal',
      icon: <GraduationCap size={48} />,
      description: 'Update grade books, lesson plans, attendance, and student reports.'
    },
    {
      id: 'discipline',
      role: 'Discipline & Admin',
      icon: <ShieldCheck size={48} />,
      description: 'Monitor student conduct, staff schedules, and general administration.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-[#e0e5ec] flex flex-col overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
      {/* Header with Return Button */}
      <div className="sticky top-0 z-10 bg-[#e0e5ec]/90 backdrop-blur-sm px-6 py-6 flex items-center justify-between shadow-sm">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#e0e5ec] text-dgs-primary font-bold shadow-neumorphism hover:shadow-neumorphism-inset transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Return to Website
        </button>
        
        <div className="flex items-center gap-3">
           <img src="https://i.imgur.com/JzYtEwz.png" alt="Logo" className="h-10 w-auto" />
           <span className="text-dgs-primary font-bold hidden md:block">Internal Systems</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
           {portals.map((portal) => (
             <div 
               key={portal.id}
               className="group relative bg-[#e0e5ec] rounded-[40px] shadow-neumorphism p-10 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
               onClick={() => alert(`Accessing ${portal.role} (Secured Area)`)}
             >
                {/* Large User/Role Icon in Neumorphic Circle */}
                <div className="w-32 h-32 rounded-full bg-[#e0e5ec] shadow-neumorphism flex items-center justify-center text-dgs-primary mb-8 group-hover:text-dgs-accent transition-colors duration-300">
                   {portal.icon}
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">{portal.role}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-sm">
                  {portal.description}
                </p>

                {/* Enter Button */}
                <div className="w-full max-w-xs py-4 rounded-xl bg-[#e0e5ec] shadow-neumorphism text-dgs-primary font-bold uppercase tracking-wider text-sm group-hover:shadow-neumorphism-inset transition-all duration-300">
                  Login
                </div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="text-center pb-8 text-gray-500 text-sm">
        &copy; 2024 Daniel Generation School. Authorized Personnel Only.
      </div>
    </div>
  );
};

export default StaffPortals;