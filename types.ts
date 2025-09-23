
import React from 'react';

export interface Skill {
  name: string;
  description: string;
  Icon: React.ElementType;
}

export interface Service {
  title: string;
  description: string;
  Icon: React.ElementType;
}

export enum PortfolioCategory {
  ALL = 'All',
  LOGOS = 'Logos',
  APPAREL = 'Apparel',
  BRANDING = 'Branding',
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  category: PortfolioCategory;
  imageUrls: string[];
  tools?: string[];
  client?: string;
  date?: string;
  projectType?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    Icon: React.ElementType;
}