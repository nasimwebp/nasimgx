import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { PORTFOLIO_PROJECTS } from './constants';

type View = 
  | { type: 'home' }
  | { type: 'project', projectId: number };

const App: React.FC = () => {
  const [view, setView] = useState<View>({ type: 'home' });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);

  const mainRef = useCallback((node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, { threshold: [0.1, 0.5] });

    if (node) {
        const sections = node.querySelectorAll('section[id]');
        sections.forEach(sec => observer.current?.observe(sec));
    }
  }, []);

  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      if (view.type !== 'home') {
        setView({ type: 'home' });
        // Wait for HomePage to render before scrolling
        setTimeout(() => {
            const targetId = path === '#' ? 'home' : path.substring(1);
            const element = document.getElementById(targetId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const targetId = path === '#' ? 'home' : path.substring(1);
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectProject = (projectId: number) => {
    setView({ type: 'project', projectId });
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (view.type === 'project') {
      const project = PORTFOLIO_PROJECTS.find(p => p.id === view.projectId);
      if (!project) {
        setView({ type: 'home' });
        // This will cause a re-render, so the HomePage will be shown on the next cycle.
        return null;
      }
      
      const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === project.id);
      const nextProject = PORTFOLIO_PROJECTS[(currentIndex + 1) % PORTFOLIO_PROJECTS.length];
      const prevProject = PORTFOLIO_PROJECTS[(currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length];
      
      return (
        <ProjectDetailPage 
          project={project}
          onBack={() => handleNavigate('#portfolio')}
          onNext={() => handleSelectProject(nextProject.id)}
          onPrevious={() => handleSelectProject(prevProject.id)}
        />
      );
    }
    
    return <HomePage mainRef={mainRef} onSelectProject={handleSelectProject} />;
  };
  
  return (
    <div className="bg-dark-bg text-dark-text font-sans selection:bg-brand-green selection:text-dark-bg">
      <ScrollProgressBar />
      <Header activeLink={view.type === 'home' ? activeSection : 'portfolio'} onNavigate={handleNavigate} />
      
      {renderContent()}

      <Footer />
      <style>{`
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default App;
