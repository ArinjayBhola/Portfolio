import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="hidden md:flex w-full px-4 py-3 justify-between items-center shadow-sm sticky top-0 bg-white dark:bg-black/80 backdrop-blur z-50 transition-colors">
      <div className="text-xl font-bold">Arinjay Bhola | Full Stack Developer</div>

      <nav className="flex gap-8 items-center text-lg font-medium">
        <p
          className="cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          Home
        </p>
        <p
          className="cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          About
        </p>
        <p
          className="cursor-pointer"
          onClick={() => scrollToSection("projects")}
        >
          Projects
        </p>
        <Button
          variant={"default"}
          className="px-6 py-2"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </Button>
      </nav>
      <div className="ml-6">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
