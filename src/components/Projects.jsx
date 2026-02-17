import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ className }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.projects-heading', {
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
            gsap.from('.projects-line', {
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
        <section ref={sectionRef} id="projects" className={`py-32 bg-primary ${className}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="projects-heading font-display text-4xl font-bold text-white mb-2"><span className="text-accent">PROJECTS</span></h2>
                    <div className="projects-line w-16 h-1 bg-accent mx-auto origin-center"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profileData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-[#050510] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                        >
                            <div className="h-40 overflow-hidden shrink-0">
                                <div className="w-full h-full bg-accent/5 group-hover:bg-accent/10 transition-colors flex items-center justify-center">
                                    <span className="font-display text-3xl text-white/20 font-bold">{project.title.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                                <p className="text-secondary text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4 mt-auto">
                                    <a href={project.link} className="flex items-center gap-2 text-white hover:text-accent transition-colors">
                                        <Github size={18} /> <span className="text-xs font-bold">Code</span>
                                    </a>
                                    <a href={project.link} className="flex items-center gap-2 text-white hover:text-accent transition-colors">
                                        <ExternalLink size={18} /> <span className="text-xs font-bold">Demo</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

