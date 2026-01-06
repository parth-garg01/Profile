import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { profileData } from '../data';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-transparent relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-4xl font-bold text-white mb-4">EXPERIENCE</h2>
                    <div className="w-16 h-1 bg-accent mx-auto"></div>
                </motion.div>

                <div className="space-y-12 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2 hidden md:block"></div>

                    {profileData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                        >
                            <div className="flex-1 w-full text-left md:text-right">
                                {index % 2 === 0 ? (
                                    <div className="md:pr-12 group">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h3>
                                        <h4 className="text-xl text-secondary font-mono mb-2">{exp.company}</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                ) : (
                                    <div className="md:pl-12 text-left md:text-left">
                                        <span className="font-mono text-accent text-sm border border-accent/30 px-3 py-1 rounded mb-4 inline-block">{exp.period}</span>
                                    </div>
                                )}
                            </div>

                            {/* Icon */}
                            <div className="z-10 bg-primary border-4 border-primary rounded-full">
                                <div className="w-12 h-12 bg-white/5 backdrop-blur-md border border-accent rounded-full flex items-center justify-center text-accent shadow-[0_0_15px_rgba(230,179,92,0.3)]">
                                    <Briefcase size={20} />
                                </div>
                            </div>

                            <div className="flex-1 w-full text-left">
                                {index % 2 === 0 ? (
                                    <div className="md:pl-12">
                                        <span className="font-mono text-accent text-sm border border-accent/30 px-3 py-1 rounded mb-4 inline-block">{exp.period}</span>
                                    </div>
                                ) : (
                                    <div className="md:pr-12 group md:text-right text-left">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h3>
                                        <h4 className="text-xl text-secondary font-mono mb-2">{exp.company}</h4>
                                        <p className="text-secondary/80 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
