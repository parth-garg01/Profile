import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Papers from './components/Papers';
import Projects from './components/Projects';
import { Experience, Recognition } from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Work />
        <Papers />
        <Projects />
        <Experience />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
