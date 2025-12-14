import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiSpringboot, SiVercel, SiCloudflare, SiTailwindcss } from "react-icons/si";

const techIcons: Record<string, JSX.Element> = {
  Docker: <FaDocker size={14} />,
  "React.js": <FaReact size={14} />,
  React: <FaReact size={14} />,
  "Node.js": <FaNodeJs size={14} />,
  "Next.js": <SiNextdotjs size={14} />,
  "Spring Boot": <SiSpringboot size={14} />,
  Vercel: <SiVercel size={14} />,
  "Cloudflare Workers": <SiCloudflare size={14} />,
  "Tailwind CSS": <SiTailwindcss size={14} />,
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
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Careers</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
             My Professional Journey.
          </h2>
        </motion.div>

        <div className="max-w-4xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative border-l border-border pl-8 pb-12 last:pb-0"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mt-1 sm:mt-0">
                  {exp.duration}
                </span>
              </div>
              
              <div className="text-lg font-medium text-primary mb-4">{exp.company}</div>

              <ul className="space-y-3 mb-6">
                {exp.description.map((line, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary rounded text-xs font-medium text-secondary-foreground"
                  >
                    {techIcons[tech]}
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

