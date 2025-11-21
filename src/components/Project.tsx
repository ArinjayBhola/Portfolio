import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaDocker, FaLink, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BackgroundPattern } from "./ui/background-pattern";
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
  "Next.js": <SiNextdotjs className="text-gray-900 dark:text-white" size={16} />,
  React: <FaReact className="text-cyan-400" size={16} />,
  "React.js": <FaReact className="text-cyan-400" size={16} />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400" size={16} />,
  PostgreSQL: <SiPostgresql className="text-blue-600" size={16} />,
  "Prisma ORM": <SiPrisma className="text-slate-700 dark:text-white" size={16} />,
  Redux: <SiRedux className="text-purple-600" size={16} />,
  Firebase: <SiFirebase className="text-amber-500" size={16} />,
  "Gemini API": <SiGooglegemini className="text-cyan-400" size={16} />,
  "Material UI": <SiMui className="text-blue-500" size={16} />,
  Hono: <SiHono className="text-orange-500" size={16} />,
  Inngest: <FaLink className="text-indigo-500" size={16} />,
  Clerk: <SiClerk className="text-pink-500" size={16} />,
  "TMDB API": <FaLink className="text-green-600" size={16} />,
  Vercel: <SiVercel className="text-gray-900 dark:text-white" size={16} />,
  Docker: <FaDocker className="text-sky-500" size={16} />,
  "Drizzle ORM": <SiDrizzle className="text-blue-500" size={16} />,
  Razorpay: <SiRazorpay className="text-blue-500" size={16} />,
};

const Project = () => {
  const projects = [
    {
      id: "1",
      image: "./lms.png",
      title: "AI Learning Management System",
      category: "Education",
      githubLink: "https://github.com/ArinjayBhola/LMS",
      liveUrl: "https://lms-opal-gamma.vercel.app/dashboard",
      description:
        "An AI-powered learning platform that enables users to design and manage courses easily. Features auto-generated notes, quizzes, and flashcards via Gemini AI with comprehensive progress tracking.",
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
      featured: true,
    },
    {
      id: "2",
      image: "./taskmanagment.png",
      title: "Task Management System",
      category: "Productivity",
      githubLink: "https://github.com/ArinjayBhola/Task-Managment",
      liveUrl: "https://task-managment-8ihr.vercel.app/",
      description:
        "A comprehensive productivity tool for managing users and tasks efficiently. Features admin dashboard for user management, task assignment, and activity tracking with full CRUD capabilities.",
      techStack: ["React.js", "Tailwind CSS", "Material UI", "PostgreSQL", "Prisma ORM", "Hono", "Redux"],
      featured: false,
    },
    {
      id: "3",
      image: "./aaolikhen.png",
      title: "Aao Likhen",
      category: "Social",
      githubLink: "https://github.com/ArinjayBhola/Aao-Likhen",
      liveUrl: "https://aao-likhen.vercel.app/signin",
      description:
        "A collaborative blogging platform where authenticated users can write, share, and read blogs. Features rich text editing, comment system, and community engagement tools.",
      techStack: ["React.js", "Tailwind CSS", "Hono", "PostgreSQL", "Prisma ORM"],
      featured: false,
    },
    {
      id: "4",
      image: "./netflix.png",
      title: "Netflix Clone",
      category: "Entertainment",
      githubLink: "https://github.com/ArinjayBhola/Netflix-Clone",
      liveUrl: "https://netflix-clone-dun-eta.vercel.app/browse",
      description:
        "A Netflix-inspired streaming platform with Firebase authentication, personalized watchlist management, and AI-powered movie recommendations using Gemini API and TMDB integration.",
      techStack: ["React.js", "Tailwind CSS", "Firebase", "Gemini API", "TMDB API"],
      featured: false,
    },
    {
      id: "5",
      image: "./youtube.png",
      title: "YouTube Clone",
      category: "Entertainment",
      githubLink: "https://github.com/ArinjayBhola/Youtube",
      liveUrl: "https://youtube-delta-two.vercel.app/",
      description:
        "A fully functional YouTube clone featuring video search, playback, and infinite scrolling for a seamless viewing experience. Built with modern React patterns.",
      techStack: ["React.js", "Tailwind CSS", "Redux"],
      featured: false,
    },
  ];

  const categories = ["All", "Education", "Productivity", "Social", "Entertainment"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <BackgroundPattern variant="dots" opacity={0.02} animated={true} />
      
      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Portfolio
          </Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Explore my latest work spanning web applications, AI-powered tools, and innovative solutions.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <Card variant="glass" hover="lift" className="overflow-hidden h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary/10 to-purple-500/10">
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="gradient" className="px-3 py-1">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-lg leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="glass" className="text-xs px-2 py-1">
                          <span className="mr-1">{techIcons[tech]}</span>
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{project.techStack.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <FaGithub className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Live
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="group"
            asChild
          >
            <a
              href="https://github.com/ArinjayBhola"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View More Projects
              <FaExternalLinkAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;