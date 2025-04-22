
import { useEffect, useRef } from "react";
import Typed from "react-typed";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll(".animate-on-scroll");
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen">
      <div 
        ref={containerRef}
        className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between"
      >
        {/* Text Content */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-on-scroll opacity-0">
            Hello, I'm
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">
              Nalla Rahul
            </span>
          </h1>
          
          <div className="mb-8 text-xl md:text-2xl text-gray-300 animate-on-scroll opacity-0" style={{animationDelay: "0.2s"}}>
            I'm a{" "}
            <Typed
              strings={["Web Developer", "Data Scientist"]}
              typeSpeed={80}
              backSpeed={50}
              loop
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue"
            />
          </div>
          
          <p className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 animate-on-scroll opacity-0" style={{animationDelay: "0.4s"}}>
            Passionate about creating exceptional digital experiences with clean code
            and innovative solutions. Let's build something amazing together.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-on-scroll opacity-0" style={{animationDelay: "0.6s"}}>
            <a 
              href="#contact" 
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </a>
            <a 
              href="https://drive.google.com/file/d/1ljPGIAONkSu5aVJ1BLhK4Lmbll9nQBBH/view?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-lg border border-accent-purple text-white font-medium transition-all duration-300 hover:bg-accent-purple"
            >
              View Resume
            </a>

          </div>
        </div>
        
        {/* Image */}
        <div className="lg:w-1/2 flex justify-center animate-on-scroll opacity-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4">
            <div className="absolute inset-0"></div>
            {/* Replace with your profile image */}
            <img
              src="/my-img.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-accent-purple" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div> */}
    </section>
  );
};

export default HeroSection;
