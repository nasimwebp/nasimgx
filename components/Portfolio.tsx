import React, { useState, useMemo } from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';
import { PortfolioCategory, PortfolioProject } from '../types';

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
          {filteredProjects.map(project => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
