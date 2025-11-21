import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from 'lucide-react';
import { generateSchoolImages } from '../services/geminiService';

const LifeAtSchool: React.FC = () => {
  // High quality placeholders relevant to the context if generation is pending or fails
  const placeholders = [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000', 
    'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&q=80&w=1000', 
    'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000', 
    'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1577896333993-809d79d71e0a?auto=format&fit=crop&q=80&w=1000'
  ];

  const [images, setImages] = useState<string[]>(placeholders);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  // Auto-generate images on mount
  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      try {
        const generated = await generateSchoolImages();
        if (mounted && generated.length > 0) {
          setImages(generated);
        }
      } catch (error) {
        console.error("Auto-generation failed, using placeholders");
      } finally {
        if (mounted) setIsGenerating(false);
      }
    };

    fetchImages();
    return () => { mounted = false; };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section id="life-at-school" className="py-24 bg-[#faf7f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
             <span className="text-dgs-accent font-bold tracking-widest uppercase text-sm">Gallery</span>
             <h2 className="text-4xl font-bold text-dgs-primary mt-2">Life at Daniel Generation</h2>
             <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
               Our students, from Nursery to Grade 3, thrive in an environment designed for curiosity, play, and holistic growth. 
               See them learning, building, and playing together.
             </p>
        </div>

        {/* Custom Slider */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 group border-4 border-white">
          
          {/* Subtle Loader Indicator (Icon Only) */}
          {isGenerating && (
            <div className="absolute top-4 right-4 z-20 bg-white/50 backdrop-blur-sm p-2 rounded-full text-dgs-primary">
              <Loader2 size={16} className="animate-spin" />
            </div>
          )}

          {/* Images Container */}
          <div 
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="min-w-full h-full relative">
                 <img 
                   src={img} 
                   alt={`School Life ${idx + 1}`} 
                   className="w-full h-full object-cover"
                 />
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                   <div className="text-white transform transition-all duration-500 translate-y-0">
                      <h4 className="text-2xl font-bold mb-1 shadow-black drop-shadow-md">
                        {idx === 0 && "Creative Play"}
                        {idx === 1 && "Collaborative Learning"}
                        {idx === 2 && "Library Time"}
                        {idx === 3 && "Safe Playground"}
                        {idx === 4 && "Classroom Activities"}
                      </h4>
                   </div>
                 </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-dgs-primary transition-all opacity-0 group-hover:opacity-100 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-dgs-primary transition-all opacity-0 group-hover:opacity-100 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? 'w-8 bg-dgs-accent' : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grade Level Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
           {['Nursery', 'Grade 1', 'Grade 2', 'Grade 3'].map((grade) => (
             <div key={grade} className="bg-white p-6 rounded-2xl shadow-neumorphism text-center group hover:-translate-y-1 transition-transform duration-300">
               <div className="w-12 h-12 bg-dgs-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 text-dgs-primary font-bold text-lg group-hover:bg-dgs-primary group-hover:text-white transition-colors">
                 {grade.charAt(0)}
               </div>
               <span className="block text-xl font-bold text-gray-800 mb-1">{grade}</span>
               <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Class</span>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default LifeAtSchool;