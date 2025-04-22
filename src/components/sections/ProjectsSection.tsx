import { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "AI Image Generator",
    description: "Web app that uses machine learning to generate unique images from text prompts.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["React", "TensorFlow.js", "Node.js"],
    link: "#",
  },
  {
    id: 2,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["D3.js", "React", "MongoDB"],
    link: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment processing and inventory management.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    link: "#",
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Real-time weather application with 7-day forecasts and location-based services.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["React Native", "OpenWeather API", "Geolocation"],
    link: "#",
  },
  {
    id: 5,
    title: "Machine Learning Model",
    description: "Predictive analytics model for customer behavior analysis and segmentation.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
    link: "#",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Responsive personal portfolio with 3D animations and interactive elements.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["React", "Three.js", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            
            // Animate project cards with delay
            const cards = entry.target.querySelectorAll(".project-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in");
              }, 200 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="projects" ref={sectionRef} className="py-24 opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">My Projects</h2>
        
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {projectsData.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div 
                    className="project-card opacity-0 card group hover:transform hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(139,92,246,0.15)] cursor-pointer mx-2"
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-purple transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs py-1 px-2 bg-dark-surface rounded-full text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={project.link}
                      className="text-accent-purple font-medium text-sm inline-flex items-center group-hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
      
      {/* Project Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="bg-dark-surface-2 w-full max-w-2xl rounded-xl p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{activeProject.title}</h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setActiveProject(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            
            <p className="text-gray-300 mb-4">{activeProject.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {activeProject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm py-1 px-3 bg-dark-surface rounded-full text-accent-purple"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-end">
              <a
                href={activeProject.link}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
