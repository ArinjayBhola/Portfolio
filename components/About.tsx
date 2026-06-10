"use client";

import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaJava,
  FaPython,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFastapi,
  SiHuggingface,
  SiLangchain,
  SiRedux,
  SiCloudflare,
  SiHono,
  SiTypescript,
  SiGithubactions,
  SiEslint,
  SiPostman,
} from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import { PiVectorThree } from "react-icons/pi";

const About = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: <FaReact size={18} /> },
        { name: "Next.js", icon: <SiNextdotjs size={18} /> },
        { name: "TypeScript", icon: <SiTypescript size={18} /> },
        { name: "Tailwind", icon: <SiTailwindcss size={18} /> },
        { name: "Redux", icon: <SiRedux size={18} /> },
        { name: "MUI", icon: <SiMui size={18} /> },
        { name: "HTML", icon: <FaHtml5 size={18} /> },
        { name: "CSS", icon: <FaCss3Alt size={18} /> },
        { name: "JS", icon: <FaJs size={18} /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs size={18} /> },
        { name: "Express", icon: <SiExpress size={18} /> },
        { name: "Hono", icon: <SiHono size={18} /> },
        { name: "FastAPI", icon: <SiFastapi size={18} /> },
        { name: "Python", icon: <FaPython size={18} /> },
        { name: "Java", icon: <FaJava size={18} /> },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
        { name: "MongoDB", icon: <SiMongodb size={18} /> },
        { name: "MySQL", icon: <SiMysql size={18} /> },
        { name: "Pinecone", icon: <PiVectorThree size={18} /> },
        { name: "SQL", icon: <FaDatabase size={18} /> },
      ],
    },
    {
      title: "DevOps & AI",
      skills: [
        { name: "Docker", icon: <FaDocker size={18} /> },
        { name: "AWS", icon: <FaAws size={18} /> },
        { name: "Cloudflare", icon: <SiCloudflare size={18} /> },
        { name: "Git", icon: <FaGitAlt size={18} /> },
        { name: "GitHub Actions", icon: <SiGithubactions size={18} /> },
        { name: "ML", icon: <TbBrain size={18} /> },
        { name: "LangChain", icon: <SiLangchain size={18} /> },
        { name: "Hugging Face", icon: <SiHuggingface size={18} /> },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Postman", icon: <SiPostman size={18} /> },
        { name: "ESLint", icon: <SiEslint size={18} /> },
        { name: "GitHub", icon: <FaGithub size={18} /> },
      ],
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Engineering robust solutions.</h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            I'm a passionate Full Stack Developer with a strong foundation in building scalable web applications. My
            journey in tech is driven by a curiosity to understand how things work and a desire to create solutions that
            make a difference. I specialize in the MERN stack and have experience with cloud technologies and AI
            integration.
          </p>
        </motion.div>

        {/* Dual Horizontal Marquee Section */}
        <div className="relative mt-12 space-y-6 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden py-10">
          {[0, 1].map((lineIndex) => {
            const allSkills = skillCategories.flatMap(c => c.skills);
            // Distribute even/odd
            const lineSkills = allSkills.filter((_, i) => i % 2 === lineIndex);
            // Duplicate for infinite effect
            const displaySkills = [...lineSkills, ...lineSkills, ...lineSkills, ...lineSkills];
            
            const isReverse = lineIndex === 1;

            return (
              <div key={lineIndex} className="flex overflow-hidden">
                <div className={`flex gap-6 whitespace-nowrap px-4 w-max ${isReverse ? "animate-marquee-horizontal-reverse" : "animate-marquee-horizontal"}`}>
                  {displaySkills.map((skill, i) => (
                      <div
                      key={`${skill.name}-${i}`}
                      className="flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-xl group hover:border-foreground/20 transition-colors">
                      <div className="text-2xl text-foreground/80">
                        {skill.icon}
                      </div>
                      <span className="text-sm font-bold tracking-tight opacity-80 group-hover:opacity-100">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Masking Fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default About;
