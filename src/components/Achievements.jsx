import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Award, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Achievements = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.achieve-heading', {
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
            gsap.from('.achieve-line', {
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
        <section ref={sectionRef} id="achievements" className={`bg-[#020215] overflow-hidden py-32 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="mb-16 text-center">
                    <h2 className="achieve-heading font-display text-4xl font-bold text-white mb-2">
                        ACHIEVEMENTS & <span className="text-accent">CERTIFICATIONS</span>
                    </h2>
                    <div className="achieve-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profileData.achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.4)' }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-accent/40 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="mb-4 flex justify-between items-start">
                                <div className="p-3 bg-accent/10 rounded-full">
                                    {item.type === 'Award'
                                        ? <Award size={24} className="text-accent" />
                                        : <CheckCircle size={24} className="text-accent" />}
                                </div>
                                <span className="font-mono text-xs text-secondary/60 border border-white/10 px-2 py-1 rounded">
                                    {item.date}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                            <p className="text-accent font-mono text-sm mb-4">{item.issuer}</p>
                            <p className="text-secondary text-sm leading-relaxed flex-grow">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
