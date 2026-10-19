import React, { useState, useMemo } from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';
import { PortfolioCategory, PortfolioProject } from '../types';
import { FrontCover, PALETTES } from './BookCover';

const SectionTitle: React.FC<{children: React.ReactNode; subtitle: string}> = ({ children, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">{children}</h2>
        <p className="mt-4 text-lg text-dark-text-secondary">{subtitle}</p>
    </div>
);

interface PortfolioProps {
  onSelectProject: (projectId: number) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>(PortfolioCategory.ALL);

  const filteredProjects = useMemo(() => {
    if (activeFilter === PortfolioCategory.ALL) {
      return PORTFOLIO_PROJECTS;
    }
    return PORTFOLIO_PROJECTS.filter(project => project.category === activeFilter);
  }, [activeFilter]);
  
  const handleProjectClick = (project: PortfolioProject) => {
    onSelectProject(project.id);
  };

  const filters = Object.values(PortfolioCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-dark-bg fade-in-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="A selection of my recent work.">
          My Creative <span className="text-brand-green">Portfolio</span>
        </SectionTitle>

        <div
          className="flex justify-center flex-wrap gap-2 mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green dark:focus:ring-offset-dark-bg ${
                activeFilter === filter
                  ? 'bg-brand-green text-dark-bg'
                  : 'bg-dark-bg-secondary text-dark-text-secondary hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => {
            const isBook = project.id === 0;
            if (isBook) {
              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green dark:focus:ring-offset-dark-bg lg:col-span-2 border-2 border-[#B9975B]/30"
                  onClick={() => handleProjectClick(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleProjectClick(project);
                    }
                  }}
                >
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <span className="bg-[#B9975B] text-white px-3 py-1 text-xs font-bold rounded-full">FEATURED • NEW</span>
                    <span className="bg-white/95 text-[#0F2342] px-2.5 py-1 text-xs font-semibold rounded-full">Book Cover System</span>
                  </div>
                  <div className="flex flex-col sm:flex-row h-full min-h-[380px] bg-[#0F2342]">
                    <div className="flex-1 p-6 flex flex-col justify-center bg-[#0F2342]">
                      <div className="inline-flex items-center gap-1.5 text-[#B9975B] text-xs font-bold tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B9975B]" /> Royal 156×234 • French Flaps • KDP + Print
                      </div>
                      <h3 className="text-2xl font-bold font-montserrat text-white mt-2 leading-tight">The War-Stopper's Handbook</h3>
                      <p className="text-sm text-[#E9DDC4] mt-1.5">A Practical Guide for Individuals and Teams Tackling Armed Conflict</p>
                      <p className="text-sm text-white/60 mt-3 leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {['Authority', 'Hope', 'Banded system', 'Thumbnail-clear'].map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80">{t}</span>
                        ))}
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B9975B] group-hover:gap-3 transition-all">
                        View full cover system
                        <span className="w-6 h-6 rounded-full bg-[#B9975B] text-white flex items-center justify-center text-xs">→</span>
                      </div>
                    </div>
                    <div className="sm:w-[220px] shrink-0 p-4 flex items-center justify-center bg-[#E9DDC4]">
                      <div className="w-[170px] h-[252px] rounded-sm overflow-hidden shadow-2xl rotate-[1deg] group-hover:rotate-0 transition-transform duration-500">
                        <FrontCover palette={PALETTES.primary} className="w-full h-full" small />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green dark:focus:ring-offset-dark-bg"
                onClick={() => handleProjectClick(project)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
              >
                <img src={project.imageUrls[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute top-4 right-4 bg-brand-green text-dark-bg px-3 py-1 text-xs font-bold rounded-full z-10">
                  {project.category}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-1/3 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold font-display">{project.title}</h3>
                  <p className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
