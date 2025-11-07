import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  github: string;
  url: string;
  title: string;
  description: string;
  image: string;
  stack: React.ReactNode[];
}

const ProjectCard = ({ github, url, title, description, image, stack }: ProjectCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.025, boxShadow: "0px 12px 60px 0px rgba(0,0,0,0.14)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 glass-card shadow-lg overflow-hidden bg-white/70 dark:bg-black/70 backdrop-blur-lg min-h-[340px] w-full max-w-md transition-all group"
      tabIndex={0}
      aria-label={`${title} project`}>
      <div className="w-full aspect-[3/2] overflow-hidden bg-gradient-to-tr from-slate-200/70 via-sky-100/50 to-teal-100/40 dark:from-slate-800/70 dark:via-sky-900/50">
        <img
          src={image}
          alt={`${title} project screenshot`}
          className="object-cover w-full h-full group-hover:scale-[1.045] transition-transform duration-400 ease-in-out"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 px-4 pb-4 pt-2 justify-between">
        <div>
          <h3 className="text-xl font-bold mt-1 tracking-tight mb-1 text-slate-800 dark:text-slate-100">{title}</h3>
          <div className="border-b border-blue-400 dark:border-teal-600 w-1/2 mx-auto opacity-70 mb-2"></div>
          <p className="font-medium text-gray-600 dark:text-gray-200 mb-2 leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          {stack.map((tech, index) => (
            <span
              key={index}
              className="bg-sky-100/60 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-600 text-sky-800 dark:text-sky-200 py-1 px-2 rounded-lg font-medium glassy text-xs tracking-tight shadow backdrop-blur select-none">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-4 mt-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="hover:text-slate-900 dark:hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit live project"
            className="hover:text-blue-500 dark:hover:text-cyan-300 transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
