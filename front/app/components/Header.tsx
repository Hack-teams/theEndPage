import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white font-bold text-2xl">TheEnd<span className="text-red-500">.</span>page</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="#showcase" className="text-gray-300 hover:text-white transition-colors">Examples</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          <Button variant="primary">Create Your End</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      } bg-black/95`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a 
            href="#how-it-works" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#showcase" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Examples
          </a>
          <a 
            href="#faq" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </a>
          <Button variant="primary" fullWidth>Create Your End</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;