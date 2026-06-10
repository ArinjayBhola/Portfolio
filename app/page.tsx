import Layout from "../components/Layout";
import Dock from "../components/Dock";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Project from "../components/Project";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <Layout>
      <Dock />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Project />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </Layout>
  );
}
