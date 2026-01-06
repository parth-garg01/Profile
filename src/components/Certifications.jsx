import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Scroll } from 'lucide-react';

const Certifications = () => {
    return (
        <section id="certifications" className="bg-[#03031a] relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="font-display text-5xl md:text-6xl font-bold text-white mb-16 text-center"
                >
                    <span className="text-accent">CERTIFICATIONS</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {profileData.certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-xl flex items-center gap-6 group cursor-pointer hover:bg-white/10"
                        >
                            <div className="p-4 bg-white/5 rounded-full">
                                <Scroll size={32} className="text-white group-hover:text-accent transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{cert.name}</h3>
                                <p className="text-lg text-secondary">{cert.issuer}</p>
                                <p className="text-sm font-mono text-accent mt-1 opacity-70">{cert.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
