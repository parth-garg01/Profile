import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Journey = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.journey-heading', {
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
            gsap.from('.journey-line', {
                scaleX: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className={`bg-primary overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-[#05051e]/50 to-primary/50 opacity-80 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                <div className="mb-16 text-center">
                    <h2 className="journey-heading font-display text-4xl font-bold text-white mb-2">MY <span className="text-accent">JOURNEY</span></h2>
                    <div className="journey-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <div className="space-y-12 border-l-2 border-white/10 ml-4 md:ml-0 pl-8 md:pl-0">
                    {profileData.journey.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative md:grid md:grid-cols-5 md:gap-8 group"
                        >
                            {/* Dot */}
                            <div className="absolute -left-[41px] top-0 md:left-auto md:right-0 md:relative md:col-span-1 md:text-right">
                                <div className="hidden md:block">
                                    <span className="font-mono text-accent text-sm font-bold block mb-1">{item.year}</span>
                                </div>
                                <div className="absolute left-0 top-1 w-5 h-5 bg-accent rounded-full border-4 border-primary md:hidden"></div>
                            </div>

                            {/* Center Dot for Desktop */}
                            <div className="hidden md:flex md:col-span-1 justify-center relative">
                                <div className="w-4 h-4 bg-accent rounded-full border-4 border-primary z-10 sticky top-1/2"></div>
                                <div className="absolute top-0 bottom-0 w-0.5 bg-white/10 left-1/2 -translate-x-1/2 h-full"></div>
                            </div>

                            <div className="md:col-span-3">
                                <div className="md:hidden mb-2">
                                    <span className="font-mono text-accent text-sm font-bold">{item.year}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{item.role}</h3>
                                <h4 className="text-lg text-white/70 mb-4 font-display">{item.company}</h4>
                                <p className="text-secondary leading-relaxed mb-4">{item.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tech && item.tech.map(t => (
                                        <span key={t} className="text-xs font-mono text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;

