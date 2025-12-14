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

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
         />
         <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, -30, 0],
              y: [0, 50, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[100px]" 
         />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-foreground/80 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
              <div className="overflow-hidden">
                <motion.span variants={letterAnimation} className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Creating</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={letterAnimation} className="inline-block text-muted-foreground">Digital</motion.span>{' '}
                <motion.span 
                  variants={letterAnimation} 
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto]"
                >
                  Value.
                </motion.span>
              </div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mb-12 leading-relaxed"
          >
            I'm Arinjay Bhola, a Full Stack Developer focused on building clean, scalable, and user-centric web applications that leave a lasting impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-7 rounded-full border-border hover:bg-secondary transition-transform hover:scale-105 active:scale-95 bg-background/50 backdrop-blur-sm"
              onClick={handleDownload}
            >
              Download CV
              <Download className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
