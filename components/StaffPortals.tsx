import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowLeft, Lock, User, Key } from 'lucide-react';

interface StaffPortalsProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaffPortals: React.FC<StaffPortalsProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const slides = [
    {
      url: '/staff_login_1.png',
      title: 'Academic Excellence',
      description: 'Unified gateway for Daniel Generation School educators and administration.'
    },
    {
      url: '/staff_login_2.png',
      title: 'Secure Access',
      description: 'Protecting our educational resources with state-of-the-art security.'
    },
    {
      url: '/staff_login_3.png',
      title: 'Digital Library',
      description: 'Streamlined resource management for our growing knowledge base.'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => {
        document.body.style.overflow = 'unset';
        clearInterval(timer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Logic points to the existing backend (basePath: /library)
      const response = await fetch('https://drrleul3osn4a.cloudfront.net/library/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.success) {
        // Redirect logic based on role from backend
        const role = result.data.user.role;
        // The backend uses 'admin' and 'librarian' currently
        // Role-based redirection logic
        if (role === 'librarian' || role === 'admin') {
          window.location.href = 'https://drrleul3osn4a.cloudfront.net/library/dashboard';
        } else {
          // Future roles: teacher, admissions, etc.
          alert(`Welcome back, ${result.data.user.full_name}. Redirecting to your assigned portal...`);
        }
      } else {
        setError(result.error || 'Invalid credentials. Access denied.');
      }
    } catch (err) {
      setError('Connection to security server failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#e0e5ec] flex flex-col md:flex-row overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* Left Side: Professional Carousel (Visible on MD+) */}
      <div className="hidden md:flex md:w-3/5 lg:w-2/3 relative overflow-hidden group">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear transform scale-100 group-hover:scale-110"
              style={{ backgroundImage: `url(${slide.url})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Slide Content */}
            <div className="absolute bottom-20 left-20 right-20 text-white animate-[slideUp_0.8s_ease-out]">
              <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side: Premium Login Area */}
      <div className="flex-1 bg-[#e0e5ec] flex flex-col p-8 md:p-12 lg:p-16 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="self-start flex items-center gap-2 px-6 py-3 rounded-full bg-[#e0e5ec] text-dgs-primary font-bold shadow-neumorphism hover:shadow-neumorphism-inset transition-all duration-300 mb-12"
        >
          <ArrowLeft size={20} />
          Return to Site
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#e0e5ec] shadow-neumorphism flex items-center justify-center text-dgs-primary">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Staff Access</h1>
              <p className="text-gray-500 font-medium">Internal Systems Verification</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-500 text-sm font-medium border border-red-100 italic">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Official Username</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-dgs-primary transition-colors">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. j.doe"
                    className="w-full pl-14 pr-6 py-5 bg-[#e0e5ec] rounded-2xl shadow-neumorphism-inset outline-none text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-dgs-primary/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-dgs-primary transition-colors">
                    <Key size={20} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-5 bg-[#e0e5ec] rounded-2xl shadow-neumorphism-inset outline-none text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-dgs-primary/20 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-2xl bg-[#e0e5ec] shadow-neumorphism flex items-center justify-center gap-3 text-dgs-primary font-extrabold uppercase tracking-widest hover:text-dgs-accent hover:shadow-neumorphism-inset transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-dgs-primary/30 border-t-dgs-primary rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={20} />
                  Verify & Enter
                </>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-sm text-gray-500 font-medium">
            Authorized access only. All interactions are monitored.<br />
            Need help? Contact the IT helpdesk.
          </p>
        </div>

        <div className="text-center pt-8 text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Daniel Generation School. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default StaffPortals;