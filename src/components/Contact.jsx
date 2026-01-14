import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = ({ className }) => {
    return (
        <section id="contact" className={`py-24 bg-primary overflow-hidden ${className}`}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020215] to-primary z-0"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-[#050515] border border-white/10 p-12 rounded-3xl"
                >
                    <h2 className="font-display text-4xl font-bold text-white mb-6">Let's <span className="text-accent">Connect</span></h2>
                    <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
                        Whether you have a project in mind, a question about my work, or just want to say hi, I'm always open to discussing new opportunities.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                        <a href={`mailto:${profileData.contact.email}`} className="flex items-center justify-center gap-3 bg-accent text-primary font-bold px-8 py-4 rounded-xl hover:bg-white transition-colors">
                            <Mail size={20} /> Say Hello
                        </a>
                        <div className="flex justify-center gap-4">
                            <a href={profileData.contact.linkedin} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-accent transition-colors text-white">
                                <Linkedin size={24} />
                            </a>
                            <a href={profileData.contact.github} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-accent transition-colors text-white">
                                <Github size={24} />
                            </a>
                        </div>
                    </div>

                    <p className="text-white/30 text-sm font-mono">
                        &copy; {new Date().getFullYear()} Parth Garg. Built with React & Vite.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
