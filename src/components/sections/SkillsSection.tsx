
import { useEffect, useRef } from "react";

interface Skill {
  name: string;
  level: number;
  category: "technical";
}

const skills: Skill[] = [
  // Technical skills
  { name: "React", level: 90, category: "technical" },
  { name: "JavaScript", level: 85, category: "technical" },
  { name: "TypeScript", level: 80, category: "technical" },
  { name: "Node.js", level: 75, category: "technical" },
  { name: "Python", level: 85, category: "technical" },
  { name: "Data Analysis", level: 80, category: "technical" },
  { name: "Machine Learning", level: 75, category: "technical" },
  { name: "SQL", level: 70, category: "technical" },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            
            // Animate skill bars with delay
            const skillBars = entry.target.querySelectorAll(".skill-bar");
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.classList.add("skill-bar-fill");
              }, 300 + index * 100);
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
    <section id="skills" ref={sectionRef} className="py-24 bg-dark-surface-2 opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">My Skills</h2>
        <div className="mt-12">
          <div className="card bg-gradient-to-br from-dark-surface to-dark-surface-2 max-w-2xl mx-auto">
            {/* <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">
              Technical Skills
            </h3> */}
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-dark-border rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-1000 ease-out"
                      style={{ width: '0%', '--target-width': `${skill.level}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
