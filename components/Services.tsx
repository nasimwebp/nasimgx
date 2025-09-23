import React from 'react';
import { SERVICES } from '../constants';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { Icon, title, description } = service;
  return (
    <div className="p-8 bg-dark-bg rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-brand-green/50">
      <div className="flex items-center justify-center w-16 h-16 mb-6 bg-brand-green/10 rounded-full">
        <Icon className="w-8 h-8 text-brand-green" />
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-dark-text-secondary">{description}</p>
    </div>
  );
};

const SectionTitle: React.FC<{children: React.ReactNode; subtitle: string}> = ({ children, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">{children}</h2>
        <p className="mt-4 text-lg text-dark-text-secondary">{subtitle}</p>
    </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-dark-bg-secondary fade-in-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="How I can help you build an amazing brand.">
          Creative <span className="text-brand-green">Services</span>
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="#contact" className="inline-block px-10 py-4 text-lg font-semibold text-dark-bg bg-brand-green rounded-full hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green dark:focus:ring-offset-dark-bg transition-transform hover:scale-105 shadow-lg">
            Let's Build Something Creative Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
