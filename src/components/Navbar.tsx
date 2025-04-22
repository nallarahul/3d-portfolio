import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
        <a
          href="#home"
          className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue"
        >
          Nalla Rahul
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {["home", "skills", "projects", "contact"].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className="nav-link"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <button
  className="md:hidden relative z-50 w-6 h-6"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
  <span
    className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
      mobileMenuOpen ? "rotate-45" : "-translate-y-2"
    }`}
  />
  <span
    className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-all duration-300 ease-in-out ${
      mobileMenuOpen ? "opacity-0" : ""
    }`}
  />
  <span
    className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
      mobileMenuOpen ? "-rotate-45" : "translate-y-2"
    }`}
  />
</button>


      </div>

      {/* Slide-In Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-dark-surface-2 shadow-md transform transition-transform duration-500 ease-in-out z-40 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="pt-20 px-6 space-y-6">
          {["home", "skills", "projects", "contact"].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className="block text-lg font-medium text-white hover:text-accent-purple transition-colors duration-300"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;