import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ className }) => {
    return (
        <section className={`h-[100svh] w-full flex items-center justify-center overflow-hidden bg-transparent ${className}`}>
            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="font-mono text-accent text-sm md:text-base mb-4 tracking-[0.2em] uppercase">
                        Hello, World! I am
                    </h2>
                    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight tracking-tight">
                        PARTH GARG
                    </h1>
                    <p className="font-sans text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Bridging the gap between <span className="text-white font-semibold">Hardware Engineering</span> and <span className="text-white font-semibold">Software Innovation</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
