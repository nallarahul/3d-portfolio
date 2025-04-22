
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-dark-surface/80 backdrop-blur-lg shadow-lg" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">
          Nalla Rahul
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="#home" onClick={(e) => handleNavClick(e, "home")} className="nav-link">Home</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className="nav-link">Skills</a></li>
          <li><a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="nav-link">Projects</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="nav-link">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-surface-2 border-b border-dark-border">
          <ul className="pt-2 pb-4 px-4 space-y-2">
            <li><a href="#home" onClick={(e) => handleNavClick(e, "home")} className="block py-2 hover:text-accent-purple transition-colors duration-300">Home</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className="block py-2 hover:text-accent-purple transition-colors duration-300">Skills</a></li>
            <li><a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="block py-2 hover:text-accent-purple transition-colors duration-300">Projects</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="block py-2 hover:text-accent-purple transition-colors duration-300">Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
