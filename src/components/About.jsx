import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';

const About = ({ className }) => {
    return (
        <section id="about" className={`py-20 bg-primary ${className}`}>
            {/* Background Mesh Gradient for About Section specific flair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 border border-white/5 bg-white/5 rounded-2xl"
                >
                    <h2 className="font-display text-4xl font-bold text-white mb-8">ABOUT <span className="text-accent">ME</span></h2>
                    <p className="font-sans text-secondary text-lg leading-relaxed">
                        {profileData.about}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
