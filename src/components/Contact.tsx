import { Button } from "./ui/button";

const Contact = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10">
      <h2
        className="text-3xl"
        id="contact">
        Contact
      </h2>
      <div className="border-b border-gray-500 h-4 m-5 w-1/2"></div>

      <div className="flex flex-row w-full gap-6 mt-6">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <label
            htmlFor="message"
            className="text-gray-700 font-medium mb-1">
            Your message
          </label>
          <textarea
            id="message"
            placeholder="Enter your message here"
            className="w-full h-full px-4 py-2 border border-gray-300 rounded-md resize-none  focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end w-full mt-4">
        <Button className="bg-black text-white px-14 py-2 rounded-md">Submit</Button>
      </div>
    </div>
  );
};

export default Contact;
