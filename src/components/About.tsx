import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const About = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "Hono",
    "Next.js",
    "Tailwind CSS",
    "Material UI",
    "Cloudflare",
    "Redux",
    "PostgreSQL",
    "SQL",
    "MySQL",
    "MongoDB",
  ];

  const pdfUrl = "./ArinjayBhola-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "arinjayresume.pdf";
    link.click();
  };

  return (
    <section id="about" className="w-full px-4 py-14 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-screen-md flex flex-col items-center text-center rounded-3xl shadow-xl bg-white/60 dark:bg-black/60 border border-white/70 dark:border-black/50 backdrop-blur-xl p-8 md:p-12"
        style={{ WebkitBackdropFilter: 'blur(18px)', backdropFilter: 'blur(18px)' }}
        aria-label="About Section"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-7 bg-gradient-to-tr from-blue-800 via-blue-400 to-teal-300 dark:from-blue-200 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow">About Me</h2>
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.07 }}
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={skill}
              variants={{
                hidden: { opacity: 0, y: 26 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: idx * 0.025 } }
              }}
              className="glass-card font-medium py-2 px-4 rounded-2xl shadow-sm backdrop-blur bg-sky-100/80 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 hover:scale-105 transition-transform duration-200 select-none"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            onClick={handleDownload}
            className="mt-2 px-6 py-3 text-base sm:text-lg glassy rounded-xl flex items-center gap-2"
            aria-label="Download resume as PDF"
          >
            <Download className="shrink-0" size={20} /> Download Resume
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
