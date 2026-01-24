"use client";

import { motion } from "framer-motion";
import { techIcons } from "../lib/data";

interface ExperienceItemProps {
  exp: {
    role: string;
    company: string;
    duration: string;
    description: string[];
    technologies: string[];
  };
  index: number;
}

const ExperienceItem = ({ exp, index }: ExperienceItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative border-l border-border pl-8 pb-12 last:pb-0">
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
        <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mt-1 sm:mt-0">{exp.duration}</span>
      </div>

      <div className="text-lg font-medium text-primary mb-4">{exp.company}</div>

      <ul className="space-y-3 mb-6">
        {exp.description.map((line, i) => (
          <li
            key={i}
            className="text-muted-foreground leading-relaxed flex items-start gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
            {line}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {exp.technologies.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary rounded text-xs font-medium text-secondary-foreground">
            {techIcons[tech]}
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
