import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "./ui/button";

const About = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "Hono",
    "Next.js",
    "Tailwind CSS",
    "Material UI",
    "Cloudflare",
    "Redux",
    "PostgreSQL",
    "SQL",
    "MySQL",
    "MongoDB",
  ];

  const pdfUrl = "./ArinjayBhola-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "arinjayresume.pdf";
    link.click();
  };

  return (
    <section className="w-full px-4 py-10 flex justify-center">
      <div className="w-full max-w-screen-md flex flex-col items-center text-center">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-blue-300 text-black font-medium py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              {skill}
            </div>
          ))}
        </div>

        <Button
          onClick={handleDownload}
          className="mt-4 px-6 py-3 text-base sm:text-lg rounded-lg">
          Download Resume
        </Button>
      </div>
    </section>
  );
};

export default About;
