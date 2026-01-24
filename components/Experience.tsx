"use client";

import { motion } from "framer-motion";
import ExperienceItem from "./ExperienceItem";
import { experiences } from "../lib/data";

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Careers</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">My Professional Journey.</h2>
        </motion.div>

        <div className="max-w-4xl">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              exp={exp}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
