import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground font-medium">© {new Date().getFullYear()} Arinjay Bhola</div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/arinjayBhola/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/arinjay-bhola-755377246/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:arinjay26bhola@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
