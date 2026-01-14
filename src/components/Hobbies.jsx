import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import * as LucideIcons from 'lucide-react';

const Hobbies = ({ className }) => {
    return (
        <section id="hobbies" className={`bg-[#050510] ${className}`}>
            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="font-display text-4xl font-bold text-white">HOBBIES AND <span className="text-accent">INTERESTS</span></h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {profileData.hobbies.map((hobby, index) => {
                        const Icon = LucideIcons[hobby.icon] || LucideIcons.Smile;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/5 p-6 rounded-xl border border-white/5 flex flex-col items-center gap-3"
                            >
                                <Icon size={32} className="text-accent" />
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
