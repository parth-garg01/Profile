import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { GraduationCap } from 'lucide-react';

const Education = ({ className }) => {
    return (
        <section id="education" className={`bg-[#020210] overflow-hidden py-16 ${className}`}>
            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-8 justify-center md:justify-start"
                >
                    <div className="p-2 bg-accent/10 rounded-lg">
                        <GraduationCap size={24} className="text-accent" />
                    </div>
                    <h2 className="font-display text-4xl font-bold text-white">EDUCATION</h2>
                </motion.div>

                <div className="space-y-4">
                    {profileData.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group"
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
