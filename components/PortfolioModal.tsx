import React, { useState, useEffect } from 'react';
import type { PortfolioProject } from '../types';
import { X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface PortfolioModalProps {
  project: PortfolioProject;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, onNext, onPrevious }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrevious();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNext, onPrevious]);

  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? project.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === project.imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };


  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div
        className="bg-dark-bg-secondary/90 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-6xl max-h-[90vh] grid md:grid-cols-5 overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:col-span-3 h-80 md:h-auto bg-black/20 flex items-center justify-center p-4 relative group">
            <div className="relative w-full h-full">
                {project.imageUrls.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    alt={`${project.title} - view ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
                ))}
            </div>

            {project.imageUrls.length > 1 && (
                <>
                <button
                    onClick={goToPreviousImage}
                    className="absolute top-1/2 left-2 -translate-y-1/2 z-20 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={goToNextImage}
                    className="absolute top-1/2 right-2 -translate-y-1/2 z-20 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2">
                    {project.imageUrls.map((_, index) => (
                        <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'bg-brand-green scale-125' : 'bg-gray-500/70 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                        aria-current={currentIndex === index}
                        />
                    ))}
                </div>
                </>
            )}
        </div>
        <div className="md:col-span-2 p-8 flex flex-col relative overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <button onClick={onPrevious} aria-label="Previous project" className="p-2 rounded-full hover:bg-white/10 text-dark-text-secondary hover:text-white transition-colors"><ArrowLeft size={20} /></button>
                <button onClick={onNext} aria-label="Next project" className="p-2 rounded-full hover:bg-white/10 text-dark-text-secondary hover:text-white transition-colors"><ArrowRight size={20} /></button>
              </div>
              <button onClick={onClose} aria-label="Close project details" className="p-2 rounded-full hover:bg-white/10 text-dark-text-secondary hover:text-white transition-colors"><X size={24} /></button>
          </div>
          
          <div className="flex-grow">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-br from-brand-green/20 to-transparent border border-brand-green/30 text-brand-green mb-4">
                {project.category}
            </span>
            <h2 id="project-title" className="text-3xl lg:text-4xl font-bold font-montserrat text-dark-text mb-6">
                {project.title}
            </h2>

            <div className="space-y-6 text-dark-text-secondary">
                <div>
                    <h3 className="text-lg font-semibold text-dark-text mb-2">Project Overview</h3>
                    <p>{project.detailedDescription}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    {project.client && <div><h4 className="font-semibold text-dark-text-secondary text-sm mb-1">Client</h4><p className="text-dark-text">{project.client}</p></div>}
                    {project.date && <div><h4 className="font-semibold text-dark-text-secondary text-sm mb-1">Date</h4><p className="text-dark-text">{project.date}</p></div>}
                    {project.projectType && <div className="col-span-full"><h4 className="font-semibold text-dark-text-secondary text-sm mb-1">Project Type</h4><p className="text-dark-text">{project.projectType}</p></div>}
                </div>
            </div>
          </div>
          
          {project.tools && project.tools.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-dark-text mb-3">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, index) => (
                  <span key={index} className="bg-dark-bg text-brand-green px-3 py-1 text-sm font-medium rounded-full border border-brand-green/30">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;