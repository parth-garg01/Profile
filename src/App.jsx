import React, { useCallback } from 'react';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
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

function App() {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="bg-primary min-h-screen relative sticky-wrapper cursor-none"> {/* Hidden default cursor */}
            <Cursor />

            {/* Global Particles Background - Moved to Top Layer (z-50) to float OVER opaque sections */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60, // Limit to 60 FPS for performance
                    interactivity: {
                        events: {
                            onClick: { enable: true, mode: "push" },
                            onHover: { enable: true, mode: "grab" },
                            resize: true,
                        },
                        modes: {
                            push: { quantity: 4 },
                            grab: { distance: 140, links: { opacity: 1 } },
                        },
                    },
                    particles: {
                        color: { value: "#aa8030" },
                        links: {
                            enable: false, // DISABLED for performance
                        },
                        move: {
                            direction: "top",
                            enable: true,
                            outModes: { default: "out" },
                            random: true,
                            speed: 0.3, // Slower, calmer movement
                            straight: false,
                        },
                        // Extreme optimization
                        number: { density: { enable: true, area: 800 }, value: 20 },
                        opacity: { value: 0.3 },
                        shape: { type: "circle" },
                        size: { value: { min: 2, max: 4 } },
                    },
                    detectRetina: false, // Critical for performance on high-DPI screens
                    fullScreen: { enable: false, zIndex: 0 },
                }}
                className="absolute inset-0 z-[100] h-full w-full fixed pointer-events-none"
            />

            {/* Content with explicit stacking */}
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
