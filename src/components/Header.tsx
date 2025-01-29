import { Button } from "./ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex justify-between items-center p-4 mx-2">
      <div className="text-2xl font-bold"></div>
      <div className="flex gap-10 items-center my-1 mx-2 text-lg font-semibold">
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">About</p>
        <p
          className="cursor-pointer"
          onClick={() => {
            scrollToSection("projects");
          }}>
          Projects
        </p>
        <Button
          variant={"default"}
          className="px-9 py-1"
          onClick={() => {
            scrollToSection("contact");
          }}>
          Contact
        </Button>
      </div>
    </div>
  );
};

export default Header;
