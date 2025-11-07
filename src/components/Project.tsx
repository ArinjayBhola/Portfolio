import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { FaReact, FaDocker, FaLink } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiRedux,
  SiFirebase,
  SiHono,
  SiClerk,
  SiGooglegemini,
  SiMui,
  SiVercel,
  SiDrizzle,
  SiRazorpay,
} from "react-icons/si";

const techIcons: Record<string, JSX.Element> = {
  "Next.js": (
    <SiNextdotjs
      className="inline mr-1 text-gray-900 dark:text-white"
      size={16}
    />
  ),
  React: (
    <FaReact
      className="inline mr-1 text-cyan-400"
      size={16}
    />
  ),
  "React.js": (
    <FaReact
      className="inline mr-1 text-cyan-400"
      size={16}
    />
  ),
  "Tailwind CSS": (
    <SiTailwindcss
      className="inline mr-1 text-sky-400"
      size={16}
    />
  ),
  PostgreSQL: (
    <SiPostgresql
      className="inline mr-1 text-blue-600"
      size={16}
    />
  ),
  "Prisma ORM": (
    <SiPrisma
      className="inline mr-1 text-slate-700 dark:text-white"
      size={16}
    />
  ),
  Redux: (
    <SiRedux
      className="inline mr-1 text-purple-600"
      size={16}
    />
  ),
  Firebase: (
    <SiFirebase
      className="inline mr-1 text-amber-500"
      size={16}
    />
  ),
  "Gemini API": (
    <SiGooglegemini
      className="inline mr-1 text-cyan-400"
      size={16}
    />
  ),
  "Material UI": (
    <SiMui
      className="inline mr-1 text-blue-500"
      size={16}
    />
  ),
  Hono: (
    <SiHono
      className="inline mr-1 text-orange-500"
      size={16}
    />
  ),
  Inngest: (
    <FaLink
      className="inline mr-1 text-indigo-500"
      size={16}
    />
  ),
  Clerk: (
    <SiClerk
      className="inline mr-1 text-pink-500"
      size={16}
    />
  ),
  "TMDB API": (
    <FaLink
      className="inline mr-1 text-green-600"
      size={16}
    />
  ),
  Vercel: (
    <SiVercel
      className="inline mr-1 text-gray-900 dark:text-white"
      size={16}
    />
  ),
  Docker: (
    <FaDocker
      className="inline mr-1 text-sky-500"
      size={16}
    />
  ),
  "Drizzle ORM": (
    <SiDrizzle
      className="inline mr-1 text-blue-500"
      size={16}
    />
  ),
  Razorpay: (
    <SiRazorpay
      className="inline mr-1 text-blue-500"
      size={16}
    />
  ),
};

const Project = () => {
  const projects = [
    {
      id: "1",
      image: "./lms.png",
      title: "LMS",
      githubLink: "https://github.com/ArinjayBhola/LMS",
      liveUrl: "https://lms-opal-gamma.vercel.app/dashboard",
      description:
        "An AI-powered learning platform that enables users to design and manage courses easily. It auto-generates notes, quizzes, and flashcards via Gemini AI, with progress tracking and a smooth learning experience.",
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "Inngest",
        "PostgreSQL",
        "Drizzle ORM",
        "Redux",
        "Gemini API",
        "Clerk",
        "Razorpay",
      ],
    },
    {
      id: "2",
      image: "./taskmanagment.png",
      title: "Task Management",
      githubLink: "https://github.com/ArinjayBhola/Task-Managment",
      liveUrl: "https://task-managment-8ihr.vercel.app/",
      description:
        "A productivity tool for managing users and tasks efficiently. Admins can create users, assign tasks, and track activity, while users manage their own workflows with full CRUD capabilities.",
      techStack: ["React.js", "Tailwind CSS", "Material UI", "PostgreSQL", "Prisma ORM", "Hono", "Redux"],
    },
    {
      id: "3",
      image: "./aaolikhen.png",
      title: "Aao Likhen",
      githubLink: "https://github.com/ArinjayBhola/Aao-Likhen",
      liveUrl: "https://aao-likhen.vercel.app/signin",
      description:
        "A blogging platform where authenticated users can write, share, and read blogs, fostering a collaborative writing community.",
      techStack: ["React.js", "Tailwind CSS", "Hono", "PostgreSQL", "Prisma ORM"],
    },
    {
      id: "4",
      image: "./netflix.png",
      title: "Netflix Clone",
      githubLink: "https://github.com/ArinjayBhola/Netflix-Clone",
      liveUrl: "https://netflix-clone-dun-eta.vercel.app/browse",
      description:
        "A Netflix-inspired app with Firebase authentication, watchlist management, and AI-powered movie recommendations using Gemini API and TMDB.",
      techStack: ["React.js", "Tailwind CSS", "Firebase", "Gemini API", "TMDB API"],
    },
    {
      id: "5",
      image: "./youtube.png",
      title: "YouTube Clone",
      githubLink: "https://github.com/ArinjayBhola/Youtube",
      liveUrl: "https://youtube-delta-two.vercel.app/",
      description:
        "A YouTube clone allowing users to search and watch videos with infinite scrolling for a seamless experience.",
      techStack: ["React.js", "Tailwind CSS", "Redux"],
    },
  ];

  return (
    <section
      className="w-full px-4 py-20 flex justify-center bg-gradient-to-b from-white/60 via-blue-50/40 dark:from-slate-900/90 dark:via-slate-800/80 to-transparent"
      id="projects">
      <div className="w-full max-w-screen-lg flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-2 bg-gradient-to-tr from-blue-900 via-teal-500 to-cyan-400 dark:from-blue-200 dark:via-cyan-300 dark:to-teal-200 bg-clip-text text-transparent drop-shadow">
          Projects
        </motion.h2>
        <div className="border-b border-blue-500 dark:border-cyan-700 w-16 my-4 opacity-80"></div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full place-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}>
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              github={p.githubLink}
              url={p.liveUrl}
              title={p.title}
              description={p.description}
              image={p.image}
              stack={p.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="">
                  <span>{techIcons[tech] || null}</span>
                  {tech}
                </span>
              ))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
