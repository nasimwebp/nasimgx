import React from 'react';
import { Download, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <main id="about" className="pt-36 pb-20 lg:py-28 fade-in-section is-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onNavigate('#home')}
              className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-dark mb-8 group font-semibold"
              aria-label="Go back to the homepage"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-2">
                <img 
                  src="https://i.postimg.cc/v8zbCxmm/Adobe-Express-file-3.png"
                  alt="Nasim working"
                  className="rounded-lg shadow-2xl object-cover w-full h-full aspect-[4/5] transform hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
              <div className="lg:col-span-3">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat mb-4">About Me</h2>
                <p className="text-lg text-dark-text-secondary mb-6">
                  Passionate about storytelling through design, I transform ideas into compelling visual experiences. With a strong foundation in both creative arts and technical skills, I deliver impactful designs that resonate and inspire. My education includes a Higher Secondary Certificate (HSC).
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="relative pl-8 border-l-2 border-brand-green/30">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-brand-green rounded-full border-4 border-light-bg dark:border-dark-bg"></div>
                    <h3 className="text-xl font-semibold">Freelance Designer</h3>
                    <p className="text-brand-green font-medium text-sm">2020 – Present</p>
                    <p className="text-dark-text-secondary mt-1">Delivered over 100+ T-shirt and 50+ logo designs to clients worldwide.</p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-brand-green/30">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-brand-green rounded-full border-4 border-light-bg dark:border-dark-bg"></div>
                    <h3 className="text-xl font-semibold">Graphic IT BD</h3>
                    <p className="text-brand-green font-medium text-sm">2023 – 2024</p>
                    <p className="text-dark-text-secondary mt-1">Designed marketing assets, apparel graphics, and branding materials.</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a href="https://i.postimg.cc/hvDvzhjg/Screenshot-99.png" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-dark-bg bg-brand-green rounded-full hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green dark:focus:ring-offset-dark-bg transition-transform hover:scale-105">
                      <Download size={20} />
                      Download Resume
                  </a>
                </div>
              </div>
            </div>
        </div>
    </main>
  );
};

export default AboutPage;