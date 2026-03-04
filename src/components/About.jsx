import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-heading', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
            gsap.from('.about-line', {
                scaleX: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
            gsap.from('.about-text', {
                y: 20,
                opacity: 0,
                duration: 0.9,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className={`py-20 bg-primary ${className}`}>
            {/* Background Mesh Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                <div className="mb-10">
                    <h2 className="about-heading font-display text-4xl font-bold text-white mb-2">
                        ABOUT <span className="text-accent">ME</span>
                    </h2>
                    <div className="about-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl"
                >
                    <p className="about-text font-sans text-secondary text-lg leading-relaxed">
                        {profileData.about}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
