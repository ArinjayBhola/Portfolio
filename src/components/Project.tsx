import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const Project = () => {
  const project = [
    {
      id: "1",
      image: "./lms.png",
      title: "LMS",
      githubLink: "https://github.com/ArinjayBhola/LMS",
      liveUrl: "https://lms-opal-gamma.vercel.app/dashboard",
      description:
        "An AI-powered learning platform called LMS makes it simple for users to design and administer courses. AI can create up to five courses for free-tier users, each of which includes notes, quizzes, and flashcards to improve learning. Additionally, the platform has progress tracking.",
      techStack: ["Next.js", "Tailwind CSS", "Inngest", "PostgreSQL", "Drizzle ORM", "Redux", "Gemini API", "Clerk"],
    },
    {
      id: "2",
      image: "./taskmanagment.png",
      title: "Task Management",
      githubLink: "https://github.com/ArinjayBhola/Task-Managment",
      liveUrl: "https://task-managment-8ihr.vercel.app/",
      description:
        "Task management is a productivity solution made to help users and admin handle activities effectively. In addition to seeing other users' activities, users can create, modify, and monitor their own tasks. For improved workflow management, admin can create users, assign tasks, and modify user duties.",
      techStack: ["React.js", "Tailwind CSS", "Material UI", "PostgreSQL", "Prisma ORM", "Hono", "Redux"],
    },
    {
      id: "3",
      image: "./aaolikhen.png",
      title: "Aao Likhen",
      githubLink: "https://github.com/ArinjayBhola/Aao-Likhen",
      liveUrl: "https://aao-likhen.vercel.app/signin",
      description:
        "Authenticated users can write, share, and read blogs on the Aao Likhen platform. Users can create a collaborative writing community by publishing their own blogs and reading other people's writing.",
      techStack: ["React.js", "Tailwind CSS", "Hono", "PostgreSQL", "Prisma ORM"],
    },
    {
      id: "4",
      image: "./netflix.png",
      title: "Netflix Clone",
      githubLink: "https://github.com/ArinjayBhola/Netflix-Clone",
      liveUrl: "https://netflix-clone-dun-eta.vercel.app/browse",
      description:
        "In Netflix Clone users gets authenticated via Firebase, add movies to a watchlist, and watch trailers. It features an AI-powered recommendation page, allowing users to search for any genre, with Gemini AI providing tailored suggestions.",
      techStack: ["React.js", "Tailwind CSS", "Firebase", "Gemini API", "TMDB API"],
    },
    {
      id: "5",
      image: "./youtube.png",
      title: "YouTube Clone",
      githubLink: "https://github.com/ArinjayBhola/Youtube",
      liveUrl: "https://youtube-delta-two.vercel.app/",
      description:
        "In YouTube Clone users can watch YouTube videos and search for videos with infinite scrolling for a seamless browsing experience.",
      techStack: ["React.js", "Tailwind CSS", "Redux"],
    },
  ];

  return (
    <section
      className="w-full px-4 py-20 flex justify-center bg-gradient-to-b from-white/60 via-blue-50/40 dark:from-slate-900/90 dark:via-slate-800/80 to-transparent"
      id="projects"
    >
      <div className="w-full max-w-screen-lg flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-2 bg-gradient-to-tr from-blue-900 via-teal-500 to-cyan-400 dark:from-blue-200 dark:via-cyan-300 dark:to-teal-200 bg-clip-text text-transparent drop-shadow"
        >
          Projects
        </motion.h2>
        <div className="border-b border-blue-500 dark:border-cyan-700 w-16 my-4 opacity-80"></div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full place-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {project.map((p) => (
            <ProjectCard
              key={p.id}
              github={p.githubLink}
              url={p.liveUrl}
              title={p.title}
              description={p.description}
              image={p.image}
              stack={p.techStack}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
