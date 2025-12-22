import React from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";

interface ProjectCardProps {
  github: string;
  url: string;
  title: string;
  description: string;
  image: string;
  stack: React.ReactNode[];
}

const ProjectCard = ({ github, url, title, description, image, stack }: ProjectCardProps) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const isHovered = opacity === 1;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 relative"
    >
      <BorderBeam size={250} duration={12} delay={9} />
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
            aria-label="View source on GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
            aria-label="Visit live project"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowUpRight size={18} />
          </a>
        </div>
        
        <p className={`text-muted-foreground text-sm mb-6 leading-relaxed ${isHovered ? '' : 'line-clamp-3'}`}>
          {description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-wrap gap-2">
            {stack.map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
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
