import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiSpringboot, SiVercel, SiCloudflare, SiTailwindcss } from "react-icons/si";
import { Briefcase } from "lucide-react";

const techIcons: Record<string, JSX.Element> = {
  Docker: <FaDocker className="text-sky-500" size={16} />,
  "React.js": <FaReact className="text-cyan-400" size={16} />,
  React: <FaReact className="text-cyan-400" size={16} />,
  "Node.js": <FaNodeJs className="text-green-500" size={16} />,
  "Next.js": <SiNextdotjs className="text-foreground" size={16} />,
  "Spring Boot": <SiSpringboot className="text-green-700" size={16} />,
  Vercel: <SiVercel className="text-foreground" size={16} />,
  "Cloudflare Workers": <SiCloudflare className="text-orange-400" size={16} />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400" size={16} />,
};

const Experience = () => {
  const experiences = [
    {
      role: "Freelance Full Stack Developer",
      company: "Remote",
      duration: "May 2025 – Present",
      description: [
        "Collaborated with clients to build custom web applications tailored to business needs using modern full stack technologies.",
        "Designed scalable and responsive UIs using React and Tailwind CSS.",
        "Built backend APIs with Node.js and deployed solutions using platforms like Vercel and Cloudflare Workers.",
        "Maintained communication with clients and delivered high-quality solutions on tight timelines.",
      ],
      technologies: ["Next.js", "React", "Node.js", "Tailwind CSS", "Vercel", "Cloudflare Workers"],
    },
    {
      role: "Software Engineering Intern",
      company: "Codehop Interfusion Pvt. Ltd",
      duration: "June 2024 – September 2024",
      description: [
        "Led debugging efforts and optimized page functionality to enhance overall user experience, resulting in improved performance and faster load times.",
        "Developed and implemented responsive web pages, driving a smoother and more efficient interaction for end-users.",
        "Collaborated cross-functionally with team members to identify performance bottlenecks, resolve technical issues, and deliver a seamless application experience.",
        "Containerized and deployed APIs using Docker, ensuring a consistent and isolated environment for development, testing, and production.",
      ],
      technologies: ["React.js", "Node.js", "Docker", "Tailwind CSS", "Spring Boot"],
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0 border-l-2 border-white/10 last:border-l-0 ml-4 md:ml-0"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
              
              <div className="glass-card p-6 rounded-2xl relative -top-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Briefcase size={16} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {exp.description.map((line, i) => (
                    <li key={i} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                    >
                      {techIcons[tech]}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

