import { Button } from "./ui/button";

const Contact = () => {
  return (
    <section
      className="w-full px-4 py-10 flex justify-center"
      id="contact">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Contact</h2>
        <div className="border-b border-gray-500 w-1/2 my-4"></div>

        <p className="text-sm text-red-600 mb-6 italic text-center">
          This form is currently non-functional, but will be available soon.
        </p>

        <form className="w-full flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <div className="flex flex-col w-full">
              <label
                htmlFor="name"
                className="text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="message"
              className="text-gray-700 font-medium mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message here"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-black text-white px-10 py-2 rounded-md"
              disabled>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
