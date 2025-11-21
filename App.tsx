import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LifeAtSchool from './components/LifeAtSchool';
import Admission from './components/Admission';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import StaffPortals from './components/StaffPortals';

const App: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPortalsOpen, setIsPortalsOpen] = useState(false);

  const openRegistration = () => setIsRegistrationOpen(true);
  const closeRegistration = () => setIsRegistrationOpen(false);

  const openPortals = () => setIsPortalsOpen(true);
  const closePortals = () => setIsPortalsOpen(false);

  return (
    <div className="font-sans text-gray-900 selection:bg-dgs-accent selection:text-white">
      {/* If portals are open, we hide the main nav to avoid stacking issues, or the portal overlay covers it. */}
      {!isPortalsOpen && <Navbar onOpenPortals={openPortals} />}
      
      <main>
        <Hero onOpenRegistration={openRegistration} />
        <About />
        <LifeAtSchool />
        <Admission onOpenRegistration={openRegistration} />
      </main>
      <Footer />
      
      {/* Registration Popup */}
      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onClose={closeRegistration} 
      />

      {/* Staff Portals Full Screen View */}
      <StaffPortals 
        isOpen={isPortalsOpen}
        onClose={closePortals}
      />
    </div>
  );
};

export default App;