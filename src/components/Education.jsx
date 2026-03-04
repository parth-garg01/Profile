import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.edu-heading', {
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
            gsap.from('.edu-line', {
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
        <section ref={sectionRef} id="education" className={`bg-[#020210] overflow-hidden py-16 ${className}`}>
            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                <div className="mb-12 text-center">
                    <div className="flex items-center gap-3 justify-center mb-2">
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <GraduationCap size={24} className="text-accent" />
                        </div>
                        <h2 className="edu-heading font-display text-4xl font-bold text-white">EDUCATION</h2>
                    </div>
                    <div className="edu-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <div className="space-y-4">
                    {profileData.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.01, borderColor: 'rgba(139,92,246,0.4)' }}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{edu.institution}</h3>
                                    <p className="text-base text-secondary">{edu.degree}</p>
                                </div>
                                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-xs border border-accent/20 whitespace-nowrap">
                                    {edu.period}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
