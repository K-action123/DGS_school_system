import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="location" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <img src="https://i.imgur.com/JzYtEwz.png" alt="DGS Logo" className="h-12 w-auto bg-white rounded-full p-1" />
               <span className="font-bold text-xl tracking-wider">DGS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Shaping Godly character and futures. Daniel Generation School is dedicated to providing a nurturing Christian environment for young minds in Kigali.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <Phone size={18} className="text-dgs-accent mt-1" />
                <span>+250 796 707 019</span>
              </div>
              <div className="flex items-start gap-3 text-gray-300">
                <Mail size={18} className="text-dgs-accent mt-1" />
                <span>info@danielgenerationschool.rw</span>
              </div>
               <div className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="text-dgs-accent mt-1" />
                <span>KG 24 Av, No 38<br/>Kagugu, Gasabo District<br/>Kigali City, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-dgs-accent">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#life-at-school" className="hover:text-white transition-colors">Life at School</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Admissions</a></li>
            </ul>
          </div>

          {/* Map - Centered on Kagugu area */}
          <div className="rounded-xl overflow-hidden h-64 bg-gray-800 relative group border border-gray-700">
             {/* Embed Google Map for Kagugu, Kigali */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15950.09369512157!2d30.08522235!3d-1.93060665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6a40303528b%3A0x598a0e2c76363056!2sKagugu%2C%20Kigali!5e0!3m2!1sen!2srw!4v1708616200000!5m2!1sen!2srw" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'grayscale(20%) contrast(1.2) opacity(0.8)' }} 
               allowFullScreen 
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               className="group-hover:filter-none transition-all duration-500"
             ></iframe>
             <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 backdrop-blur-sm text-xs text-center text-gray-300">
               KG 24 Av, Kagugu, Kigali
             </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2024 Daniel Generation School. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-dgs-primary transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-dgs-primary transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;