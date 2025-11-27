import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a 
                  href="mailto:arinjay26bhola@gmail.com" 
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail size={24} />
                  </div>
                  <span className="text-lg">arinjay26bhola@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <User size={24} />
                  </div>
                  <span className="text-lg">Full Stack Developer</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border-primary/20">
              <h3 className="text-xl font-bold mb-2">Open for Opportunities</h3>
              <p className="text-muted-foreground">
                I am currently available for freelance work and full-time positions. If you have a project that needs some creative touch, let's connect!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-2 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    disabled
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <textarea
                    id="message"
                    placeholder="Your message..."
                    rows={4}
                    className="w-full pl-10 pr-4 py-2 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    disabled
                  />
                </div>
              </div>

              <Button className="w-full gap-2" disabled>
                Send Message
                <Send size={18} />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Form is currently disabled. Please email me directly.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

