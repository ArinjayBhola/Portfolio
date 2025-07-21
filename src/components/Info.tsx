import { Button } from "./ui/button";

const Info = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 py-10 flex justify-center">
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Arinjay Bhola</h1>
        <h2 className="text-xl sm:text-2xl font-medium text-gray-700">Full Stack Developer</h2>

        <div className="border-b border-gray-400 w-1/2 my-4"></div>

        <div className="flex flex-col sm:flex-row gap-4 my-6">
          <Button
            variant="outline"
            className="px-10 py-2 w-full sm:w-auto"
            onClick={() => scrollToSection("projects")}>
            Projects
          </Button>
          <Button
            variant="default"
            className="px-10 py-2 w-full sm:w-auto"
            onClick={() => scrollToSection("contact")}>
            Contact
          </Button>
        </div>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2 sm:px-6">
          Resourceful and driven college student with experience in Full Stack through projects and a previous
          internship, seeking to apply skills in a Full Stack development role. Proficient in <b>Next.js</b>,{" "}
          <b>React.js</b>, and <b>Node.js</b>, with a solid foundation in <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>
          . Demonstrated success in identifying and resolving complex coding challenges, developing innovative web
          designs, and contributing positively to team efforts.
        </p>
      </div>
    </section>
  );
};

export default Info;
