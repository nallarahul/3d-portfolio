import Background3D from "@/components/Background3D";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  
  return (
    <main className="bg-dark-surface text-white">
      <Background3D />
      <Navbar />
      
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      <Footer />
    </main>
  );
};

export default Index;
