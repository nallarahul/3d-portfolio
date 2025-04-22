
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-surface py-8 border-t border-dark-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          © {currentYear} | Nalla Rahul. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
