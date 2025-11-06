import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "./ui/button";
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
  SiPrettier,
  SiPostman,
} from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import { PiVectorThree } from "react-icons/pi";
import { FiDownload } from "react-icons/fi";

const About = () => {
  const skills = [
    // Languages
    { name: "HTML", icon: <FaHtml5 size={18} /> },
    { name: "CSS", icon: <FaCss3Alt size={18} /> },
    { name: "JavaScript", icon: <FaJs size={18} /> },
    { name: "TypeScript", icon: <SiTypescript size={18} /> },
    { name: "Java", icon: <FaJava size={18} /> },
    { name: "Python", icon: <FaPython size={18} /> },

    // Frameworks & Libraries
    { name: "React", icon: <FaReact size={18} /> },
    { name: "Node.js", icon: <FaNodeJs size={18} /> },
    { name: "Express", icon: <SiExpress size={18} /> },
    { name: "Hono", icon: <SiHono size={18} /> },
    { name: "Next.js", icon: <SiNextdotjs size={18} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={18} /> },
    { name: "Material UI", icon: <SiMui size={18} /> },
    { name: "Redux", icon: <SiRedux size={18} /> },
    { name: "FastAPI", icon: <SiFastapi size={18} /> },
    { name: "LangChain", icon: <SiLangchain size={18} /> },

    // Databases
    { name: "PostgreSQL", icon: <SiPostgresql size={18} /> },
    { name: "SQL", icon: <FaDatabase size={18} /> },
    { name: "MySQL", icon: <SiMysql size={18} /> },
    { name: "MongoDB", icon: <SiMongodb size={18} /> },

    // Cloud & DevOps
    { name: "AWS", icon: <FaAws size={18} /> },
    { name: "Cloudflare", icon: <SiCloudflare size={18} /> },
    { name: "Docker", icon: <FaDocker size={18} /> },
    { name: "Git", icon: <FaGitAlt size={18} /> },
    { name: "GitHub Actions", icon: <SiGithubactions size={18} /> },
    { name: "CI/CD", icon: <FaGithub size={18} /> },

    // Machine Learning & AI
    { name: "Machine Learning", icon: <TbBrain size={18} /> },
    { name: "Hugging Face", icon: <SiHuggingface size={18} /> },
    { name: "Pinecone", icon: <PiVectorThree size={18} /> },

    // Tolls
    { name: "ESLint", icon: <SiEslint size={18} /> },
    { name: "Postman", icon: <SiPostman size={18} /> },
    { name: "Prettier", icon: <SiPrettier size={18} /> },
  ];

  const pdfUrl = "./ArinjayBhola-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "arinjayresume.pdf";
    link.click();
  };

  return (
    <section
      id="about"
      className="w-full px-4 py-14 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-screen-md flex flex-col items-center text-center rounded-3xl shadow-xl bg-white/60 dark:bg-black/60 border border-white/70 dark:border-black/50 backdrop-blur-xl p-8 md:p-12"
        style={{ WebkitBackdropFilter: "blur(18px)", backdropFilter: "blur(18px)" }}
        aria-label="About Section">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-7 bg-gradient-to-tr from-blue-800 via-blue-400 to-teal-300 dark:from-blue-200 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow">
          About Me
        </h2>

        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.07 }}>
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 26 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: idx * 0.025 },
                },
              }}
              className="flex items-center gap-2 font-medium py-2 px-4 rounded-2xl shadow-sm backdrop-blur bg-sky-100/80 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 hover:scale-105 transition-transform duration-200 select-none">
              <span className="flex items-center justify-center translate-y-[0.5px]">{skill.icon}</span>
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <Button
            onClick={handleDownload}
            className="mt-2 px-6 py-3 text-base sm:text-lg glassy rounded-xl flex items-center gap-2"
            aria-label="Download resume as PDF">
            <FiDownload
              className="shrink-0"
              size={20}
            />{" "}
            Download Resume
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
