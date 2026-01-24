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
          className="mb-16 max-w-2xl">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Engineering robust solutions.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'm a passionate Full Stack Developer with a strong foundation in building scalable web applications. My
            journey in tech is driven by a curiosity to understand how things work and a desire to create solutions that
            make a difference. I specialize in the MERN stack and have experience with cloud technologies and AI
            integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background border border-border p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
