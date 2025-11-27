import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  github: string;
  url: string;
  title: string;
  description: string;
  image: string;
  stack: React.ReactNode[];
}

const ProjectCard = ({ github, url, title, description, image, stack }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors"
            aria-label="View source on GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors"
            aria-label="Visit live project"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
            {title}
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary" size={20} />
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-wrap gap-2">
            {stack.map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;

