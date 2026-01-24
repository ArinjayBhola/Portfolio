"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Get in Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Let's create something together.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out directly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8">
              <div className="p-8 border border-border rounded-lg bg-secondary/20">
                <a
                  href="mailto:arinjay26bhola@gmail.com"
                  className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                  <div className="p-3 rounded-full bg-background border border-border text-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Email Me</p>
                    <p className="text-lg font-bold">arinjay26bhola@gmail.com</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
