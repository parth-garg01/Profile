import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Mail, Linkedin, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-heading', {
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
            gsap.from('.contact-line', {
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
        <section ref={sectionRef} id="contact" className={`py-24 bg-primary overflow-hidden ${className}`}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020215] to-primary z-0"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                {/* Animated heading above the card */}
                <div className="mb-12">
                    <h2 className="contact-heading font-display text-4xl font-bold text-white mb-2">
                        LET'S <span className="text-accent">CONNECT</span>
                    </h2>
                    <div className="contact-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-[#050515] border border-white/10 p-12 rounded-3xl"
                >
                    <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
                        Whether you have a project in mind, a question about my work, or just want to say hi, I'm always open to discussing new opportunities.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                        <motion.a
                            href={`mailto:${profileData.contact.email}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-3 bg-accent text-primary font-bold px-8 py-4 rounded-xl hover:bg-white transition-colors"
                        >
                            <Mail size={20} /> Say Hello
                        </motion.a>
                        <div className="flex justify-center gap-4">
                            <motion.a
                                href={profileData.contact.linkedin}
                                whileHover={{ scale: 1.1, borderColor: 'rgba(139,92,246,0.6)' }}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-accent transition-colors text-white"
                            >
                                <Linkedin size={24} />
                            </motion.a>
                            <motion.a
                                href={profileData.contact.github}
                                whileHover={{ scale: 1.1, borderColor: 'rgba(139,92,246,0.6)' }}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-accent transition-colors text-white"
                            >
                                <Github size={24} />
                            </motion.a>
                        </div>
                    </div>

                    <p className="text-white/30 text-sm font-mono">
                        &copy; {new Date().getFullYear()} Parth Garg. Built with React &amp; Vite.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
