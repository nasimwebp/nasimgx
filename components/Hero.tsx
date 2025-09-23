import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Download } from 'lucide-react';

const ROLES = ["Graphic Designer", "T-Shirt Specialist", "Brand Builder"];

const Typewriter: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === ROLES[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % ROLES.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse]);

    return (
        <span className="text-brand-green relative">
            {`${ROLES[index].substring(0, subIndex)}`}
            <span className="absolute right-[-2px] top-0 bottom-0 border-r-2 border-brand-green w-0.5 animate-blink-caret" />
        </span>
    );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-10 overflow-hidden fade-in-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-montserrat text-dark-text tracking-tight">
              Nasim Graphix
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold font-display text-dark-text-secondary h-12">
              I'm a <Typewriter />
            </p>
            <p className="mt-6 text-lg text-dark-text-secondary max-w-xl mx-auto md:mx-0">
              Passionate about storytelling through design. I create impactful T-shirt graphics, logos, and brand identities that stand out and connect with audiences.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <a href="https://i.postimg.cc/hvDvzhjg/Screenshot-99.png" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-dark-bg bg-brand-green rounded-lg hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green focus:ring-offset-dark-bg transition-transform hover:scale-105 shadow-lg shadow-brand-green/20">
                  <Download size={20} />
                  Download CV
              </a>
              <div className="flex items-center space-x-3">
                  {SOCIAL_LINKS.map(({ name, url, Icon }) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="p-2.5 group rounded-full border-2 border-dark-text-secondary/50 text-dark-text-secondary/80 hover:border-brand-green hover:text-brand-green transition-all duration-300">
                          <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-2 relative flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex justify-center items-center">
                <svg width="100%" height="100%" viewBox="0 0 500 500" className="absolute animate-spin" style={{ animationDuration: '20s' }}>
                  <defs>
                    <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <circle 
                    cx="250" 
                    cy="250" 
                    r="230" 
                    fill="none" 
                    stroke="url(#circle-gradient)" 
                    strokeWidth="8" 
                    strokeDasharray="80 30"
                    strokeLinecap="round"
                  />
                </svg>
                <img
                  src="https://i.postimg.cc/v8zbCxmm/Adobe-Express-file-3.png"
                  alt="Nasim Graphix"
                  className="relative w-5/6 h-5/6 object-cover rounded-full shadow-2xl"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;