import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Contact from "./components/Contact";

function App() {
  return (
    <Layout>
      <Header />
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
      <Footer />
    </Layout>
  );
}

export default App;
