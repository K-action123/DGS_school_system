import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenPortals: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenPortals }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Life at School', href: '#life-at-school' },
    { label: 'Admissions', href: '#admissions' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Daniel Generation School Logo"
              className="h-14 w-auto object-contain drop-shadow-sm"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-dgs-primary leading-none">DANIEL GENERATION</h1>
              <span className="text-xs text-dgs-primary/80 font-medium tracking-widest">SCHOOL</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-dgs-primary font-medium transition-colors relative group text-sm uppercase tracking-wide"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-dgs-primary transition-all group-hover:w-full"></span>
              </a>
            ))}

            {/* Staff Portal Button */}
            <button
              onClick={onOpenPortals}
              className="text-gray-500 hover:text-dgs-primary flex items-center gap-1 text-sm font-medium transition-colors"
            >
              <Lock size={14} />
              Staff Portals
            </button>

            <a
              href="#location"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-dgs-accent text-white hover:bg-dgs-primary transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <MapPin size={16} />
              <span className="text-sm font-bold">Find Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dgs-primary focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl absolute top-20 w-full shadow-xl border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-800 hover:text-dgs-primary hover:bg-dgs-accent/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onOpenPortals();
                setIsMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-3 text-base font-medium text-gray-600 hover:text-dgs-primary"
            >
              <Lock size={18} />
              Staff Portals
            </button>
            <a
              href="#location"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-3 text-base font-medium text-dgs-primary"
            >
              <MapPin size={18} />
              Location
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;