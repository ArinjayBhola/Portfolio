import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Mail, User2, MessageSquareText } from "lucide-react";

const Contact = () => {
  return (
    <section
      className="w-full px-4 py-20 flex justify-center bg-gradient-to-b from-blue-50/50 via-white/70 dark:from-slate-900/80 dark:via-black/80 to-transparent"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl flex flex-col items-center rounded-3xl bg-white/70 dark:bg-black/70 shadow-2xl backdrop-blur-2xl border border-slate-200 dark:border-slate-700 p-8 md:p-12"
        style={{ WebkitBackdropFilter: 'blur(18px)', backdropFilter: 'blur(18px)' }}
        aria-label="Contact Section"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-800 via-teal-400 to-teal-300 dark:from-blue-200 dark:via-teal-400 dark:to-cyan-200 bg-clip-text text-transparent drop-shadow">
          Contact
        </h2>
        <div className="border-b border-blue-300 dark:border-cyan-700 w-16 my-4 opacity-70"></div>

        <p className="text-sm text-red-600 mb-5 italic text-center">
          This form is currently non-functional, but will be available soon.
        </p>

        <form className="w-full flex flex-col gap-7" aria-label="Contact form">
          <div className="flex flex-col sm:flex-row gap-7 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-gray-800 dark:text-gray-200 font-semibold mb-1 flex items-center gap-2">
                <User2 className="text-blue-400" size={18} /> Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-blue-200 dark:border-slate-700 rounded-lg bg-white/60 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
                disabled
                tabIndex={-1}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-800 dark:text-gray-200 font-semibold mb-1 flex items-center gap-2">
                <Mail className="text-blue-400" size={18} /> Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="w-full px-4 py-2 border border-blue-200 dark:border-slate-700 rounded-lg bg-white/60 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
                disabled
                tabIndex={-1}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="message" className="text-gray-800 dark:text-gray-200 font-semibold mb-1 flex items-center gap-2">
              <MessageSquareText className="text-blue-400" size={18} /> Your Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message here"
              rows={6}
              className="w-full px-4 py-2 border border-blue-200 dark:border-slate-700 rounded-lg bg-white/60 dark:bg-slate-900/60 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
              disabled
              tabIndex={-1}
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-gradient-to-r from-blue-700 via-blue-500 to-teal-400 text-white px-10 py-2 rounded-lg font-semibold shadow hover:bg-blue-800/90 transition-all focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled
              aria-disabled="true"
            >
              Submit
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
