"use client";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projects, techIcons } from "../lib/data";

const Project = () => {
  return (
    <section
      id="projects"
      className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Selected Projects</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Featured Work.</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}>
              <ProjectCard
                id={p.id}
                github={p.githubLink}
                url={p.liveUrl}
                title={p.title}
                description={p.description}
                image={p.image}
                stack={p.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5">
                    {techIcons[tech]} {tech}
                  </span>
                ))}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
