import { useState, useRef, useEffect, FormEvent } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);
    formPayload.append("access_key", "6f8cc3b4-ebb9-4efc-be8b-543288f86442"); // Replace with your actual access key

    const object = Object.fromEntries(formPayload.entries());
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();

      if (result.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Network error. Please try again.",
      });
    }

    setIsSubmitting(false);
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      });
    }, 5000);
  };

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
    <section id="contact" ref={sectionRef} className="py-24 bg-dark-surface-2 opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Contact Me</h2>

        <div className="mt-12">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
              Get In Touch
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/50 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/50 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/50 transition-all resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              {formStatus.submitted && (
                <div className={`mt-4 p-3 rounded-lg ${formStatus.success ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                  {formStatus.message}
                </div>
              )}
            </form>

            <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-dark-border">
              <a
                href="https://github.com/nallarahul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-purple transition-colors duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Github size={24} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-nalla/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-purple transition-colors duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Linkedin size={24} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:nallarahul515@gmail.com"
                className="text-gray-400 hover:text-accent-purple transition-colors duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <Mail size={24} className="hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;