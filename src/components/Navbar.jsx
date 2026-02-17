import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // GSAP Animation for Navbar Links
        const ctx = gsap.context(() => {
            gsap.from(".nav-link", {
                y: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5 // Wait for Hero text slightly
            });
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };
    }, []);

    const links = [
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Projects', href: '#projects' },
        { name: 'Hobbies', href: '#hobbies' },
        { name: 'Journey', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#" className="font-display text-2xl font-bold tracking-wider text-white">
                    PARTH<span className="text-accent">.GARG</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-6" id="nav-container">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="nav-link font-mono text-xs text-secondary hover:text-accent transition-colors duration-300 uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-primary/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-8 space-y-6">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="font-display text-xl text-white hover:text-accent tracking-wider"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
