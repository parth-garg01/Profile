import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Award, CheckCircle } from 'lucide-react';

const Achievements = ({ className }) => {
    return (
        <section id="achievements" className={`bg-[#020215] overflow-hidden py-32 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="font-display text-4xl font-bold text-white mb-16 text-center"
                >
                    ACHIEVEMENTS & <span className="text-accent">CERTIFICATIONS</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {profileData.achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-accent/40 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="mb-4 flex justify-between items-start">
                                <div className="p-3 bg-accent/10 rounded-full">
                                    {item.type === 'Award' ? <Award size={24} className="text-accent" /> : <CheckCircle size={24} className="text-accent" />}
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
