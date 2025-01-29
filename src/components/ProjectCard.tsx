import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

interface ProjectCardProps {
  github: string;
  url: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
}

const ProjectCard = ({ github, url, title, description, image, stack }: ProjectCardProps) => {
  return (
    <div className="flex flex-col gap-3 border border-gray-200 my-2">
      <img
        src={image}
        alt="Not Found"
      />
      <div className="flex flex-col">
        <p className="text-lg mt-2 font-semibold">{title}</p>
        <div className="border-b border-gray-500 h-4 mb-1 w-1/2 mx-auto"></div>
        <p className="font-light m-1">{description}</p>
        <div className="flex flex-wrap gap-2 m-1 mx-2">
          {stack.map((s, index) => (
            <p
              key={index}
              className="bg-gray-200 px-2 py-1 rounded hover:scale-105 transition cursor-pointer duration-300 ease-in-out">
              {s}
            </p>
          ))}
        </div>

        <div className="flex gap-2 m-2">
          <a
            href={github}
            target="_blank"
            className="ml-2">
            <FaGithub />
          </a>
          <a
            href={url}
            target="_blank">
            <FaLink />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
