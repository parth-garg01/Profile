import React, { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = lazy(() => import('./HeroScene'));

const Hero = ({ className }) => {
    const component = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Cinematic Reveal
            tl.from(".hero-char", {
                opacity: 0,
                y: 150,
                z: -200,
                scale: 0.5,
                filter: "blur(12px)",
                rotateX: -80,
                stagger: {
                    amount: 0.8,
                    from: "center"
                },
                duration: 1.5,
                ease: "back.out(2)",
            })
                .from(".hero-subtitle", {
                    opacity: 0,
                    y: 30,
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power3.out"
                }, "-=1.2")
                .from(".hero-text", {
                    opacity: 0,
                    y: 30,
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power3.out"
                }, "-=1")
                .from(".scroll-indicator", {
                    opacity: 0,
                    y: -10,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.5");

            // ScrollTrigger: parallax fade-out as you scroll past hero
            gsap.to(".hero-content", {
                y: -120,
                opacity: 0,
                scale: 0.95,
                filter: "blur(6px)",
                ease: "none",
                scrollTrigger: {
                    trigger: component.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

        }, component);

        // 3D Parallax Tilt Effect
        const handleMouseMove = (e) => {
            if (!contentRef.current) return;

            const xPos = (e.clientX / window.innerWidth - 0.5);
            const yPos = (e.clientY / window.innerHeight - 0.5);

            gsap.to(contentRef.current, {
                rotationY: xPos * 15,
                rotationX: -yPos * 15,
                x: xPos * 20,
                y: yPos * 20,
                duration: 1,
                ease: "power2.out",
                transformPerspective: 1000,
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const name = "PARTH GARG";

    return (
        <section ref={component} className={`h-[100svh] w-full flex items-center justify-center overflow-hidden bg-transparent ${className}`} style={{ perspective: '1000px' }}>
            {/* Three.js Background */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Content Overlay */}
            <div className="hero-content relative z-10 text-center px-4 max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
                <div ref={contentRef} className="will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
                    <h2 className="hero-subtitle font-mono text-accent text-sm md:text-base mb-4 tracking-[0.2em] uppercase">
                        Hello, World! I am
                    </h2>
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight tracking-tight overflow-hidden p-4">
                        {name.split("").map((char, index) => (
                            <span key={index} className="hero-char inline-block whitespace-pre" style={{ transformStyle: 'preserve-3d' }}>
                                {char}
                            </span>
                        ))}
                    </h1>
                    <p className="hero-text font-sans text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Bridging the gap between <span className="text-white font-semibold">Hardware Engineering</span> and <span className="text-white font-semibold">Software Innovation</span>.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="scroll-indicator absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                    <span className="font-mono text-[10px] text-secondary tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;

