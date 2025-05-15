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
    <div className="flex flex-col text-center w-1/2 mx-auto my-5 mt-10">
      <div className="flex gap-4 text-center mx-auto">
        <div className="flex flex-wrap gap-4 justify-center mx-auto p-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-blue-300 text-black font-medium py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-200">
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <Button
          onClick={handleDownload}
          className="mt-4 px-8 py-4 rounded-lg">
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default About;
