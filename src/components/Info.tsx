import { Button } from "./ui/button";

const Info = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col text-center w-1/2 mx-auto items-center my-5">
      <div className="text-5xl mb-2">Arinjay Bhola</div>
      <div className="text-2xl">Full Stack Developer</div>
      <div className="border-b border-gray-500 h-4 m-4 w-1/2"></div>
      <div className="flex gap-4 text-center mx-auto my-5">
        <Button
          variant={"outline"}
          className="px-14 py-2"
          onClick={() => {
            scrollToSection("projects");
          }}>
          Projects
        </Button>
        <Button
          variant={"default"}
          className="px-14 py-2"
          onClick={() => {
            scrollToSection("contact");
          }}>
          Contact
        </Button>
      </div>
      <div className="m-6">
        Resourceful and driven college student with experience in Full Stack through projects and a previous internship,
        seeking to apply skills in a Full Stack development role. Proficient in <b>Next.js</b>, <b>React.js</b> and{" "}
        <b>Node.js</b>, with a solid foundation in <b>HTML</b>, <b>CSS</b> and <b>JavaScript</b>. Demonstrated success
        in identifying and resolving complex coding challenges, developing innovative web designs, and contributing
        positively to team efforts.
      </div>
    </div>
  );
};

export default Info;
