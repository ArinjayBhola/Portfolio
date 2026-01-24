"use client";

import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { projects, techIcons } from "../lib/data";

const Project = () => {
  return (
    <section
      id="projects"
      className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Featured Work.</h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}>
                <ProjectCard
                  github={p.githubLink}
                  url={p.liveUrl}
                  title={p.title}
                  description={p.description}
                  image={p.image}
                  stack={p.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="flex items-center">
                      {techIcons[tech]} {tech}
                    </span>
                  ))}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
