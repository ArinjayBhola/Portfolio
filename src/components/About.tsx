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
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML", icon: <FaHtml5 size={18} className="text-orange-600" /> },
        { name: "CSS", icon: <FaCss3Alt size={18} className="text-blue-600" /> },
        { name: "JavaScript", icon: <FaJs size={18} className="text-yellow-400" /> },
        { name: "TypeScript", icon: <SiTypescript size={18} className="text-blue-500" /> },
        { name: "React", icon: <FaReact size={18} className="text-cyan-400" /> },
        { name: "Next.js", icon: <SiNextdotjs size={18} className="text-foreground" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={18} className="text-cyan-500" /> },
        { name: "Material UI", icon: <SiMui size={18} className="text-blue-600" /> },
        { name: "Redux", icon: <SiRedux size={18} className="text-purple-600" /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs size={18} className="text-green-500" /> },
        { name: "Express", icon: <SiExpress size={18} className="text-foreground" /> },
        { name: "Hono", icon: <SiHono size={18} className="text-orange-500" /> },
        { name: "FastAPI", icon: <SiFastapi size={18} className="text-teal-500" /> },
        { name: "Java", icon: <FaJava size={18} className="text-red-500" /> },
        { name: "Python", icon: <FaPython size={18} className="text-blue-500" /> },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql size={18} className="text-blue-400" /> },
        { name: "SQL", icon: <FaDatabase size={18} className="text-orange-400" /> },
        { name: "MySQL", icon: <SiMysql size={18} className="text-blue-500" /> },
        { name: "MongoDB", icon: <SiMongodb size={18} className="text-green-500" /> },
        { name: "Pinecone", icon: <PiVectorThree size={18} className="text-pink-500" /> },
      ],
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "AWS", icon: <FaAws size={18} className="text-orange-500" /> },
        { name: "Cloudflare", icon: <SiCloudflare size={18} className="text-orange-500" /> },
        { name: "Docker", icon: <FaDocker size={18} className="text-blue-500" /> },
        { name: "Git", icon: <FaGitAlt size={18} className="text-orange-600" /> },
        { name: "GitHub Actions", icon: <SiGithubactions size={18} className="text-blue-500" /> },
        { name: "CI/CD", icon: <FaGithub size={18} className="text-foreground" /> },
      ],
    },
    {
      title: "AI & Tools",
      skills: [
        { name: "Machine Learning", icon: <TbBrain size={18} className="text-purple-500" /> },
        { name: "LangChain", icon: <SiLangchain size={18} className="text-green-600" /> },
        { name: "Hugging Face", icon: <SiHuggingface size={18} className="text-yellow-400" /> },
        { name: "ESLint", icon: <SiEslint size={18} className="text-purple-500" /> },
        { name: "Postman", icon: <SiPostman size={18} className="text-orange-500" /> },
        { name: "Prettier", icon: <SiPrettier size={18} className="text-pink-400" /> },
      ],
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: catIndex * 0.1 }}
                className="glass-card p-6 rounded-2xl h-full hover:bg-white/5 transition-colors"
              >
                <h4 className="text-xl font-bold mb-4 text-primary border-b border-white/10 pb-2">{category.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/40 border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group cursor-default"
                    >
                      <span className="text-lg">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;



