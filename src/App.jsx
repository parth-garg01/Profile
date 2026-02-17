import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Education from './components/Education';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';

function App() {
    return (
        <div className="bg-primary min-h-screen relative sticky-wrapper cursor-none">
            <ScrollProgress />
            <Cursor />

            <Navbar />

            <Hero className="stack-1" />
            <About className="stack-2" />
            <Education className="stack-3" />
            <Skills className="stack-4" />
            <Achievements className="stack-5" />
            <Projects className="stack-6" />
            <Hobbies className="stack-7" />
            <Journey className="stack-8" />
            <Contact className="stack-9" />
        </div>
    );
}

export default App;
