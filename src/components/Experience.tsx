const Experience = () => {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Codehop Interfusion Pvt. Ltd",
      duration: "June 2024 – September 2024",
      description: [
        "Led debugging efforts and optimized page functionality to enhance overall user experience, resulting in improved performance and faster load times.",
        "Developed and implemented responsive web pages, driving a smoother and more efficient interaction for end-users.",
        "Collaborated cross-functionally with team members to identify performance bottlenecks, resolve technical issues, and deliver a seamless application experience.",
        "Utilized Docker to containerize and run the API, ensuring a consistent and isolated environment for development, testing, and deployment.",
      ],
      technologies: ["React.js", "Node.js", "Docker", "Tailwind CSS", "Docker", "Spring Boot"],
    },
    {
      role: "Freelance Full Stack Developer",
      company: "Remote",
      duration: "May 2025 – Present",
      description: [
        "Collaborated with clients to build custom web applications tailored to business needs using modern full stack technologies.",
        "Designed scalable and responsive UIs using React and Tailwind CSS.",
        "Built backend APIs with Node.js and deployed solutions using platforms like Vercel and Cloudflare Workers.",
        "Maintained communication with clients and delivered high-quality solutions on tight timelines.",
      ],
      technologies: ["Next.js", "React", "Node.js", "Tailwind CSS", "Vercel", "Cloudflare Workers"],
    },
  ];

  return (
    <section
      className="w-full px-4 py-10 flex justify-center bg-white"
      id="experience">
      <div className="w-full max-w-screen-md flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Experience</h2>
        <div className="border-b border-gray-500 w-1/2 my-4"></div>

        <div className="w-full flex flex-col gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="text-left bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-gray-600 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
              <ul className="list-disc list-inside text-gray-700 mb-2 space-y-1">
                {exp.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-sm mt-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-200 text-black px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
