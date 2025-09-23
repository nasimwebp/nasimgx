import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

interface HomePageProps {
  mainRef: (node: HTMLElement | null) => void;
  onSelectProject: (projectId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ mainRef, onSelectProject }) => {
  return (
    <main ref={mainRef}>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Portfolio onSelectProject={onSelectProject} />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;
