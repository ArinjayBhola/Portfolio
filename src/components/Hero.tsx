import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
  const pdfUrl = "/ArinjayBhola-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "ArinjayBholaResume.pdf";
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6">
          <span className="px-4 py-2 rounded-full glass text-sm font-medium text-primary border border-primary/20">
            Available for Work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Building the <br />
          <span className="text-gradient-primary">Digital Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          I'm Arinjay Bhola, a Full Stack Developer passionate about crafting immersive web experiences with modern
          technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full group"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-full glass border-white/10 hover:bg-white/10"
            onClick={handleDownload}>
            Download CV
            <Download className="ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-scroll" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
