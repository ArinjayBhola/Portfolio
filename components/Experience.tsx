"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences, techIcons } from "../lib/data";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="experience"
      className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Careers</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">My Professional Journey.</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 min-h-[450px]">
          {/* Tabs List */}
          <div className="flex overflow-x-auto md:flex-col md:overflow-visible pb-4 md:pb-0 scrollbar-none md:w-64 shrink-0">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 md:flex-none text-left px-6 py-4 border-b-2 md:border-b-0 md:border-l-2 transition-all duration-300 whitespace-nowrap md:whitespace-normal font-medium text-sm group ${
                  activeTab === index
                    ? "border-primary bg-secondary/50 text-primary"
                    : "border-border hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold">{exp.company}</span>
                  <span className="text-xs opacity-70 group-hover:opacity-100">{exp.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-1">{experiences[activeTab].role}</h3>
                  <div className="text-primary font-medium">{experiences[activeTab].company}</div>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 max-h-[350px] scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40">
                  <ul className="space-y-4 mb-8">
                    {experiences[activeTab].description.map((line, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-sm leading-relaxed flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {experiences[activeTab].technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-border/50 rounded-full text-xs font-medium text-foreground/80">
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
