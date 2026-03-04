import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Code, Trophy, Calculator, Music, Mic, Bot, Gamepad2, Book, Map, Smile } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Code, Trophy, Calculator, Music, Mic, Bot, Gamepad2, Book, Map, Smile };

const Hobbies = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hobbies-heading', {
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
            gsap.from('.hobbies-line', {
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
        <section ref={sectionRef} id="hobbies" className={`py-24 bg-[#050510] ${className}`}>
            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                <div className="mb-12">
                    <h2 className="hobbies-heading font-display text-4xl font-bold text-white mb-2">
                        HOBBIES & <span className="text-accent">INTERESTS</span>
                    </h2>
                    <div className="hobbies-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {profileData.hobbies.map((hobby, index) => {
                        const Icon = iconMap[hobby.icon] || Smile;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.08, borderColor: 'rgba(139,92,246,0.5)' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06, duration: 0.5 }}
                                className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col items-center gap-3 transition-all duration-300 group"
                            >
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Icon size={32} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                                </motion.div>
                                <span className="text-white font-medium">{hobby.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hobbies;
