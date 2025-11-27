import { motion } from "framer-motion";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaAws, FaJava, FaPython,
  FaDatabase, FaDocker, FaGitAlt, FaGithub
} from "react-icons/fa";
import {
  SiExpress, SiNextdotjs, SiTailwindcss, SiMui, SiPostgresql, SiMysql,
  SiMongodb, SiFastapi, SiHuggingface, SiLangchain, SiRedux, SiCloudflare,
  SiHono, SiTypescript, SiGithubactions, SiEslint, SiPrettier, SiPostman
} from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import { PiVectorThree } from "react-icons/pi";

const About = () => {
  const skills = [
    { name: "React", icon: <FaReact size={24} />, category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs size={24} />, category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript size={24} />, category: "Languages" },
    { name: "Node.js", icon: <FaNodeJs size={24} />, category: "Backend" },
    { name: "Express", icon: <SiExpress size={24} />, category: "Backend" },
    { name: "Tailwind", icon: <SiTailwindcss size={24} />, category: "Frontend" },
    { name: "PostgreSQL", icon: <SiPostgresql size={24} />, category: "Database" },
    { name: "MongoDB", icon: <SiMongodb size={24} />, category: "Database" },
    { name: "Docker", icon: <FaDocker size={24} />, category: "DevOps" },
    { name: "AWS", icon: <FaAws size={24} />, category: "Cloud" },
    { name: "Python", icon: <FaPython size={24} />, category: "Languages" },
    { name: "Java", icon: <FaJava size={24} />, category: "Languages" },
    { name: "Git", icon: <FaGitAlt size={24} />, category: "Tools" },
    { name: "Redux", icon: <SiRedux size={24} />, category: "Frontend" },
    { name: "FastAPI", icon: <SiFastapi size={24} />, category: "Backend" },
    { name: "LangChain", icon: <SiLangchain size={24} />, category: "AI" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a passionate Full Stack Developer with a strong foundation in building scalable web applications. 
              My journey in tech is driven by a curiosity to understand how things work and a desire to create 
              solutions that make a difference. I specialize in the MERN stack and have experience with cloud technologies 
              and AI integration.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source, 
              or learning about the latest advancements in AI and machine learning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-xl font-bold mb-6">Technical Arsenal</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 rounded-xl bg-background/50 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      {skill.icon}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

