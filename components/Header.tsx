import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X, Palette } from 'lucide-react';

interface HeaderProps {
  activeLink: string;
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeLink, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // FIX: Explicitly type NavLink as a React Function Component to resolve type errors with the 'key' prop.
  interface NavLinkProps {
    href: string;
    name: string;
    isMobile?: boolean;
  }

  const NavLink: React.FC<NavLinkProps> = ({ href, name, isMobile = false }) => {
    const linkId = href.startsWith('#') ? href.substring(1) : href;
    const isActive = activeLink === linkId;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate(href);
      if (isMobile) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMobile) {
      return (
        <a
          href={href}
          onClick={handleClick}
          className={`block w-full text-left py-3 px-4 rounded-md text-lg transition-colors ${
            isActive ? 'bg-brand-green/10 text-brand-green' : 'text-dark-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          {name}
        </a>
      );
    }

    return (
      <a
        href={href}
        onClick={handleClick}
        className="relative group px-3 py-2"
      >
        <span className={`text-sm transition-all duration-300 ${isActive ? 'text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]' : 'text-dark-text-secondary'} group-hover:text-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]`}>
          {name}
        </span>
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-green transform transition-transform duration-300 ease-out origin-center
            ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}
        />
      </a>
    );
  };
  
  return (
    <>
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50"
      >
        <div className="flex items-center justify-between bg-gray-900/50 backdrop-blur-lg rounded-full shadow-2xl shadow-black/20 px-6 py-2 border border-white/10">
          
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('#home'); }} className="flex items-center gap-2 text-xl font-bold font-montserrat text-dark-text">
            <Palette className="w-6 h-6 text-brand-green drop-shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
            <span>NasimGraphix</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-x-2">
            {NAV_LINKS.map(link => (
              <NavLink key={link.name} href={link.href} name={link.name} />
            ))}
          </nav>
          
          <div className="flex items-center">
            <a href="#contact" 
               onClick={(e) => { e.preventDefault(); onNavigate('#contact'); }}
               className="hidden md:inline-flex items-center px-6 py-2 text-sm font-semibold text-dark-bg rounded-full transition-[background-position] duration-500 ease-out
                         bg-gradient-to-r from-brand-green via-emerald-400 to-green-400 bg-[length:200%_auto] bg-left
                         hover:bg-right focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green focus:ring-offset-gray-900">
              Hire Me
            </a>
            
            <div className="md:hidden ml-2">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 rounded-full text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-green"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 bg-dark-bg-secondary/90 backdrop-blur-xl border-l border-white/10
                       transition-transform duration-300 ease-in-out md:hidden ${
                         isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                       }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <span className="font-bold text-lg">Menu</span>
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="p-2 rounded-full text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-green"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {NAV_LINKS.map(link => (
            <NavLink key={link.name} href={link.href} name={link.name} isMobile={true} />
          ))}
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); onNavigate('#contact'); setIsMenuOpen(false); }}
            className="w-full text-center mt-4 inline-flex items-center justify-center py-3 text-lg font-semibold text-dark-bg rounded-lg
                      transition-[background-position] duration-500 ease-out
                      bg-gradient-to-r from-brand-green via-emerald-400 to-green-400 bg-[length:200%_auto] bg-left
                      hover:bg-right"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;