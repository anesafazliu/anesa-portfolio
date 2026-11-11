import { useState } from "react";
import Footer from "./components/Footer";
import GridRules from "./components/GridRules";
import Header from "./components/Header";
import About from "./sections/About";
import Approach from "./sections/Approach";
import Capabilities from "./sections/Capabilities";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Stack from "./sections/Stack";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main" inert={menuOpen}>
        Skip to content
      </a>

      <GridRules />
      <Header menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />

      <main id="main" tabIndex={-1} inert={menuOpen}>
        <Hero />
        <About />
        <Capabilities />
        <Stack />
        <Approach />
        <Contact />
      </main>

      <Footer inert={menuOpen} />
    </>
  );
}
