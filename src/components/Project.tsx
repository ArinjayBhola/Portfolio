import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaDocker, FaLink,FaAws } from "react-icons/fa";
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
  SiLangchain
} from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import { TbVector } from "react-icons/tb";


const techIcons: Record<string, JSX.Element> = {
  "Next.js": <SiNextdotjs className="inline mr-1" size={14} />,
  React: <FaReact className="inline mr-1" size={14} />,
  "React.js": <FaReact className="inline mr-1" size={14} />,
  "Tailwind CSS": <SiTailwindcss className="inline mr-1" size={14} />,
  PostgreSQL: <SiPostgresql className="inline mr-1" size={14} />,
  "Prisma ORM": <SiPrisma className="inline mr-1" size={14} />,
  Redux: <SiRedux className="inline mr-1" size={14} />,
  Firebase: <SiFirebase className="inline mr-1" size={14} />,
  "Gemini API": <SiGooglegemini className="inline mr-1" size={14} />,
  "Material UI": <SiMui className="inline mr-1" size={14} />,
  Hono: <SiHono className="inline mr-1" size={14} />,
  Inngest: <FaLink className="inline mr-1" size={14} />,
  Clerk: <SiClerk className="inline mr-1" size={14} />,
  "TMDB API": <FaLink className="inline mr-1" size={14} />,
  Vercel: <SiVercel className="inline mr-1" size={14} />,
  Docker: <FaDocker className="inline mr-1" size={14} />,
  "Drizzle ORM": <SiDrizzle className="inline mr-1" size={14} />,
  Razorpay: <SiRazorpay className="inline mr-1" size={14} />,
  "Vercel AI SDK": <FaLink className="inline mr-1" size={14} />,
  LangChain: <SiLangchain className="inline mr-1" size={14} />,
  "Hugging Face": <RiRobot2Line className="inline mr-1" size={14} />,
  Pinecone: <TbVector className="inline mr-1" size={14} />,
  "AWS S3": <FaAws className="inline mr-1" size={14} />,

};

const Project = () => {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      id: "1",
      image: "./pdf-chat.png",
      title: "PDF-Chat(In Progress - GitHub Available, Live Demo Coming Soon)",
      category: "Full Stack",
      githubLink: "https://github.com/ArinjayBhola/Chat-PDF",
      liveUrl: "https://chat-pdf-beryl.vercel.app/",
      description:
        "An AI-driven document chat platform that lets users upload PDFs and images and query their content intelligently. It uses OCR for image-based text extraction, converts documents into vector embeddings with open-source ML models, stores them in a vector database for semantic search, and delivers accurate, context-aware responses through a modern Next.js interface.",
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "Vercel AI SDK",
        "Gemini API",
        "LangChain",
        "Hugging Face",
        "Pinecone",
        "AWS S3",
        "Clerk",
      ],
    },
    {
      id: "2",
      image: "./lms.png",
      title: "LMS",
      category: "Full Stack",
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
      id: "3",
      image: "./taskmanagment.png",
      title: "Task Management",
      category: "Full Stack",
      githubLink: "https://github.com/ArinjayBhola/Task-Managment",
      liveUrl: "https://task-managment-8ihr.vercel.app/",
      description:
        "A productivity tool for managing users and tasks efficiently. Admins can create users, assign tasks, and track activity, while users manage their own workflows with full CRUD capabilities.",
      techStack: ["React.js", "Tailwind CSS", "Material UI", "PostgreSQL", "Prisma ORM", "Hono", "Redux"],
    },
    {
      id: "4",
      image: "./aaolikhen.png",
      title: "Aao Likhen",
      category: "Full Stack",
      githubLink: "https://github.com/ArinjayBhola/Aao-Likhen",
      liveUrl: "https://aao-likhen.vercel.app/signin",
      description:
        "A blogging platform where authenticated users can write, share, and read blogs, fostering a collaborative writing community.",
      techStack: ["React.js", "Tailwind CSS", "Hono", "PostgreSQL", "Prisma ORM"],
    },
    {
      id: "5",
      image: "./netflix.png",
      title: "Netflix Clone",
      category: "Frontend",
      githubLink: "https://github.com/ArinjayBhola/Netflix-Clone",
      liveUrl: "https://netflix-clone-dun-eta.vercel.app/browse",
      description:
        "A Netflix-inspired app with Firebase authentication, watchlist management, and AI-powered movie recommendations using Gemini API and TMDB.",
      techStack: ["React.js", "Tailwind CSS", "Firebase", "Gemini API", "TMDB API"],
    },
    {
      id: "6",
      image: "./youtube.png",
      title: "YouTube Clone",
      category: "Frontend",
      githubLink: "https://github.com/ArinjayBhola/Youtube",
      liveUrl: "https://youtube-delta-two.vercel.app/",
      description:
        "A YouTube clone allowing users to search and watch videos with infinite scrolling for a seamless experience.",
      techStack: ["React.js", "Tailwind CSS", "Redux"],
    },
  ];

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const categories = ["All", "Full Stack", "Frontend"];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
             Featured Work.
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  github={p.githubLink}
                  url={p.liveUrl}
                  title={p.title}
                  description={p.description}
                  image={p.image}
                  stack={p.techStack.map((tech, i) => (
                    <span key={i} className="flex items-center">
                      {techIcons[tech]} {tech}
                    </span>
                  ))}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;


