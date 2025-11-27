import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          © {new Date().getFullYear()} Arinjay Bhola. Made with <Heart size={14} className="text-red-500 fill-red-500" />
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/arinjayBhola/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/arinjay-bhola-755377246/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="mailto:arinjay26bhola@gmail.com" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
