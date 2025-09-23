import React from 'react';
import { SKILLS } from '../constants';
import type { Skill } from '../types';

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { Icon, name, description } = skill;
  return (
    <div className="group relative p-6 bg-dark-bg-secondary rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      <div className="relative z-10">
        <Icon className="w-10 h-10 text-brand-green mb-4" />
        <h3 className="text-xl font-bold font-display mb-2">{name}</h3>
        <p className="text-dark-text-secondary">{description}</p>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{children: React.ReactNode; subtitle: string}> = ({ children, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">{children}</h2>
        <p className="mt-4 text-lg text-dark-text-secondary">{subtitle}</p>
    </div>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-dark-bg fade-in-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="My creative and technical capabilities.">
          Skills & <span className="text-brand-green">Expertise</span>
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
