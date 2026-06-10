"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, FolderGit2, Mail, FileText, Moon, Sun } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FloatingDock, type DockItem } from "./ui/floating-dock";
import { useTheme } from "@/lib/theme-provider";
import Link from "next/link";

const SOCIALS = {
  email: "mailto:arinjay26bhola@gmail.com",
  github: "https://github.com/ArinjayBhola",
  linkedin: "https://www.linkedin.com/in/arinjay-bhola-755377246/",
  resume: "/ArinjayBhola-CV.pdf",
};

const SECTIONS = ["home", "about", "experience", "projects"] as const;

const Dock = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of [...SECTIONS, "contact"]) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const items: (DockItem | "divider")[] = [
    { title: "Home", icon: <Home className="h-full w-full" />, onClick: () => scrollTo("home") },
    { title: "About", icon: <User className="h-full w-full" />, onClick: () => scrollTo("about") },
    { title: "Experience", icon: <Briefcase className="h-full w-full" />, onClick: () => scrollTo("experience") },
    { title: "Projects", icon: <FolderGit2 className="h-full w-full" />, onClick: () => scrollTo("projects") },
    "divider",
    { title: "Email", icon: <Mail className="h-full w-full" />, href: SOCIALS.email },
    { title: "GitHub", icon: <FaGithub className="h-full w-full" />, href: SOCIALS.github, external: true },
    { title: "LinkedIn", icon: <FaLinkedinIn className="h-full w-full" />, href: SOCIALS.linkedin, external: true },
    { title: "Resume", icon: <FileText className="h-full w-full" />, href: SOCIALS.resume, external: true  },
    "divider",
    {
      title: theme === "dark" ? "Light mode" : "Dark mode",
      icon: theme === "dark" ? <Sun className="h-full w-full" /> : <Moon className="h-full w-full" />,
      onClick: toggleTheme,
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 24 }}
      className="fixed bottom-5 left-1/2 z-[60]"
    >
      <FloatingDock items={items} />

      <div className="flex items-center gap-1 rounded-2xl border border-border bg-background px-2.5 py-2 shadow-sm md:hidden">
        {[
          { title: "Home", icon: <Home className="h-4 w-4" />, onClick: () => scrollTo("home"), id: "home" },
          { title: "About", icon: <User className="h-4 w-4" />, onClick: () => scrollTo("about"), id: "about" },
          { title: "Projects", icon: <FolderGit2 className="h-4 w-4" />, onClick: () => scrollTo("projects"), id: "projects" },
          { title: "Contact", icon: <Mail className="h-4 w-4" />, onClick: () => scrollTo("contact"), id: "contact" },
        ].map((it) => (
          <button
            key={it.id}
            onClick={it.onClick}
            aria-label={it.title}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              activeSection === it.id ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-primary"
            }`}
          >
            {it.icon}
          </button>
        ))}
        <div className="mx-0.5 h-5 w-px bg-border/70" />
        <Link href={SOCIALS.resume} target="_blank" aria-label="Resume" className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <FileText className="h-4 w-4" />
        </Link>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground/70 hover:text-primary"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </motion.div>
  );
};

export default Dock;
