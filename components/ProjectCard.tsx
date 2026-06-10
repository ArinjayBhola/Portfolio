import React from "react";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  github: string;
  url: string;
  title: string;
  description: string;
  image: string;
  stack: React.ReactNode[];
}

const ProjectCard = ({ id, github, url, title, description, image, stack }: ProjectCardProps) => {
  return (
    <article className="group relative flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden transition-colors hover:border-foreground/20">
      {/* Visual Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700"
          priority={parseInt(id) <= 3}
        />
        {/* Subtle Gradient Shadow */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
            0{id}
          </span>
        </div>

        <h3 className="text-lg font-black tracking-tight mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2 mb-4 group-hover:text-foreground/80 transition-colors">
          {description}
        </p>

        {/* Tech Stack - Compact Grid */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {stack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="text-[9px] font-semibold px-2 py-0.5 bg-secondary/50 text-foreground/70 rounded-md border border-border/40">
              {tech}
            </span>
          ))}
          {stack.length > 4 && (
             <span className="text-[9px] font-semibold px-2 py-0.5 bg-secondary/30 text-foreground/50 rounded-md">
               +{stack.length - 4}
             </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
          <div className="flex gap-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub">
              <Github size={16} />
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Live Demo">
              <ExternalLink size={16} />
            </a>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-tighter cursor-pointer">
            View Details <ArrowUpRight size={12} />
          </motion.div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
