import React, { useState, useEffect } from 'react';
import type { PortfolioProject } from '../types';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectDetailPageProps {
  project: PortfolioProject;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack, onNext, onPrevious }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onBack();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrevious();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack, onNext, onPrevious]);

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
    <main className="pt-28 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-dark group font-semibold transition-colors"
            aria-label="Go back to portfolio"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onPrevious} aria-label="Previous project" className="p-3 rounded-full hover:bg-white/10 bg-dark-bg-secondary text-dark-text-secondary hover:text-white transition-colors">
                <ArrowLeft size={20} />
            </button>
            <button onClick={onNext} aria-label="Next project" className="p-3 rounded-full hover:bg-white/10 bg-dark-bg-secondary text-dark-text-secondary hover:text-white transition-colors">
                <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="bg-dark-bg-secondary border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-full grid md:grid-cols-5 overflow-hidden">
          <div className="md:col-span-3 h-96 md:h-[75vh] bg-black/20 flex items-center justify-center p-4 relative group">
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
          <div className="md:col-span-2 p-8 flex flex-col relative overflow-y-auto max-h-[75vh]">
            <span className="inline-block self-start px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-br from-brand-green/20 to-transparent border border-brand-green/30 text-brand-green mb-4">
              {project.category}
            </span>
            <h2 id="project-title" className="text-3xl lg:text-4xl font-bold font-montserrat text-dark-text mb-6">
              {project.title}
            </h2>

            <div className="space-y-6 text-dark-text-secondary flex-grow">
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
    </main>
  );
};

export default ProjectDetailPage;
