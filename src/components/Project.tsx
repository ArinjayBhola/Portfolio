import ProjectCard from "./ProjectCard";

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
      className="w-full px-4 py-16 flex justify-center"
      id="projects">
      <div className="w-full max-w-screen-lg flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">Projects</h2>
        <div className="border-b border-gray-500 w-1/2 my-4"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full place-items-center">
          {project.map((p) => (
            <div
              key={p.id}
              className="w-full max-w-md">
              <ProjectCard
                github={p.githubLink}
                url={p.liveUrl}
                title={p.title}
                description={p.description}
                image={p.image}
                stack={p.techStack}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
