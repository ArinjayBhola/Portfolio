import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Mail, FolderKanban } from "lucide-react";

const Info = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="w-full min-h-[60vh] px-4 py-16 flex justify-center items-center bg-gradient-to-b from-transparent via-white/40 dark:via-black/40 to-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl w-full flex flex-col items-center text-center rounded-3xl shadow-2xl backdrop-blur-xl bg-white/60 dark:bg-black/60 border border-white/60 dark:border-black/60 p-8 md:p-12" style={{ WebkitBackdropFilter: 'blur(18px)', backdropFilter: 'blur(18px)' }}
        aria-label="Intro Section"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg bg-gradient-to-r from-gray-900/90 via-teal-500/70 to-blue-500/70 dark:from-gray-200/90 dark:via-blue-300/80 dark:to-teal-300/80 text-transparent bg-clip-text mb-2">
          Arinjay Bhola
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-3 tracking-tight flex items-center gap-2 justify-center">
          <span>Full Stack Developer</span>
        </h2>

        <div className="border-b border-gray-300 dark:border-gray-800 w-14 my-5 opacity-60"></div>

        <div className="flex flex-col sm:flex-row gap-5 my-8 justify-center">
          <Button
            variant="outline"
            className="px-10 py-2 w-full sm:w-auto flex items-center gap-2 glassy focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => scrollToSection("projects")}
            aria-label="View projects"
          >
            <FolderKanban className="shrink-0" size={20} /> Projects
          </Button>
          <Button
            variant="default"
            className="px-10 py-2 w-full sm:w-auto flex items-center gap-2 glassy focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => scrollToSection("contact")}
            aria-label="Contact"
          >
            <Mail className="shrink-0" size={20} /> Contact
          </Button>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base md:text-lg text-gray-700 dark:text-gray-200/90 leading-relaxed px-2 sm:px-6 font-medium"
        >
          Resourceful and driven college student with experience in Full Stack through projects and a previous internship, seeking to apply skills in a Full Stack development role. Proficient in <b className="text-blue-600 dark:text-blue-400 font-semibold">Next.js</b>, <b className="text-blue-600 dark:text-blue-400 font-semibold">React.js</b>, and <b className="text-blue-600 dark:text-blue-400 font-semibold">Node.js</b>, with a solid foundation in <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>. Demonstrated success in identifying and resolving complex coding challenges, developing innovative web designs, and contributing positively to team efforts.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Info;
