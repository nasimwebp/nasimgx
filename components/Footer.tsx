
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-bg-secondary dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-light-text-secondary dark:text-dark-text-secondary">
        <p>&copy; {currentYear} Nasim Graphix. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
