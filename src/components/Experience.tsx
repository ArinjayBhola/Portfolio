import { motion } from "framer-motion";
import { Briefcase, Globe, Server, Container, Code2, Cloud, Layers } from "lucide-react";

const techIcons: Record<string, JSX.Element> = {
  Docker: (
    <Container
      className="inline mr-1"
      size={16}
    />
  ), // Lucide Container
  "React.js": (
    <Code2
      className="inline mr-1 text-cyan-400"
      size={16}
    />
  ), // code icon
  React: (
    <Code2
      className="inline mr-1 text-cyan-400"
      size={16}
    />
  ), // code icon
  "Node.js": (
    <Server
      className="inline mr-1 text-green-600"
      size={16}
    />
  ), // server icon
  "Next.js": (
    <Layers
      className="inline mr-1 text-black dark:text-white"
      size={16}
    />
  ), // layers for Next.js
  "Spring Boot": (
    <Cloud
      className="inline mr-1 text-green-700"
      size={16}
    />
  ),
  Vercel: (
    <Globe
      className="inline mr-1"
      size={16}
    />
  ),
  "Cloudflare Workers": (
    <Globe
      className="inline mr-1 text-orange-400"
      size={16}
    />
  ),
  "Tailwind CSS": (
    <Code2
      className="inline mr-1 text-sky-400"
      size={16}
    />
  ),
};

const Experience = () => {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Codehop Interfusion Pvt. Ltd",
      duration: "June 2024 – September 2024",
      description: [
        "Led debugging efforts and optimized page functionality to enhance overall user experience, resulting in improved performance and faster load times.",
        "Developed and implemented responsive web pages, driving a smoother and more efficient interaction for end-users.",
        "Collaborated cross-functionally with team members to identify performance bottlenecks, resolve technical issues, and deliver a seamless application experience.",
        "Utilized Container to containerize and run the API, ensuring a consistent and isolated environment for development, testing, and deployment.",
      ],
      technologies: ["React.js", "Node.js", "Container", "Tailwind CSS", "Container", "Spring Boot"],
    },
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
  ];

  return (
    <section
      className="w-full px-4 py-16 flex justify-center bg-gradient-to-b from-white/80 via-blue-50/60 dark:from-gray-900/80 dark:via-slate-900/50 to-transparent"
      id="experience">
      <div className="w-full max-w-screen-md flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-tr from-blue-900 via-teal-500 to-cyan-400 dark:from-blue-200 dark:via-cyan-300 dark:to-teal-200 bg-clip-text text-transparent drop-shadow">
          Experience
        </motion.h2>
        <div className="border-b border-blue-500 dark:border-cyan-700 w-16 my-4 opacity-80"></div>

        <ol className="w-full flex flex-col mt-8 gap-8 relative">
          {experiences.map((exp, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.09 * index, duration: 0.62 }}
              className="relative text-left rounded-2xl shadow-lg hover:shadow-xl backdrop-blur bg-white/70 dark:bg-black/60 border border-slate-200 dark:border-slate-900 px-7 py-7 transition-all group overflow-hidden before:absolute before:left-[-8px] before:top-9 before:w-0.5 before:h-[calc(100%-2rem)] before:bg-gradient-to-b before:from-blue-400/30 before:to-teal-500/20 before:-z-0"
              tabIndex={0}
              aria-label={`Job at ${exp.company}`}>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                {index === 0 ? (
                  <Briefcase
                    className="text-blue-600 dark:text-teal-300"
                    size={22}
                  />
                ) : (
                  <Globe
                    className="text-cyan-500"
                    size={22}
                  />
                )}
                <h3 className="text-xl font-semibold inline-block">{exp.role}</h3>
                <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100/60 dark:bg-slate-800/40 text-blue-900 dark:text-blue-200">
                  {exp.company}
                </span>
                <span className="text-xs text-gray-500 ml-1">{exp.duration}</span>
              </div>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-200/90 mb-1 space-y-1 font-medium">
                {exp.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-sm mt-3">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="glass-card px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200 dark:border-teal-700 bg-blue-100/50 dark:bg-slate-800/70 text-blue-900 dark:text-blue-200 font-semibold shadow-sm">
                    {techIcons[tech] || null}
                    {tech}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
