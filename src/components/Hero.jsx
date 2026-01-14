import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

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
                z: -200, // Depth
                scale: 0.5,
                filter: "blur(12px)",
                rotateX: -80,
                stagger: {
                    amount: 0.8,
                    from: "center" // Ripple out from center
                },
                duration: 1.5,
                ease: "back.out(2)", // Elastic pop
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
                }, "-=1");

        }, component);

        // 3D Parallax Tilt Effect
        const handleMouseMove = (e) => {
            if (!contentRef.current) return;

            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5); // -0.5 to 0.5
            const yPos = (clientY / window.innerHeight - 0.5); // -0.5 to 0.5

            gsap.to(contentRef.current, {
                rotationY: xPos * 15, // Max 15 degree tilt
                rotationX: -yPos * 15,
                x: xPos * 20, // Subtle movement
                y: yPos * 20,
                duration: 1, // Smooth lag
                ease: "power2.out",
                transformPerspective: 1000 // Essential for 3D feel
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const name = "PARTH GARG";

    return (
        <section ref={component} className={`h-[100svh] w-full flex items-center justify-center overflow-hidden bg-transparent perspective-1000 ${className}`}>
            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto perspective-1000">
                <div ref={contentRef} className="will-change-transform transform-style-3d">
                    <h2 className="hero-subtitle font-mono text-accent text-sm md:text-base mb-4 tracking-[0.2em] uppercase">
                        Hello, World! I am
                    </h2>
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight tracking-tight overflow-hidden p-4">
                        {name.split("").map((char, index) => (
                            <span key={index} className="hero-char inline-block whitespace-pre transform-style-3d">
                                {char}
                            </span>
                        ))}
                    </h1>
                    <p className="hero-text font-sans text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Bridging the gap between <span className="text-white font-semibold">Hardware Engineering</span> and <span className="text-white font-semibold">Software Innovation</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
