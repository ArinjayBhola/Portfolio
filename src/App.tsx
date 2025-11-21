import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Info from "./components/Info";
import Project from "./components/Project";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Info />
        <About />
        <Experience />
        <Project />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
