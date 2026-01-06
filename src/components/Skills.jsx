import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';

// Helper to dynamically find an icon with BRAND COLORS
const getIcon = (skillName) => {
    const standardizedName = skillName.toLowerCase().replace(/[\s\.]/g, '');

    // Manual overrides for specific icons and colors
    const map = {
        'python': { icon: FaIcons.FaPython, color: '#3776AB' },
        'c++': { icon: SiIcons.SiCplusplus, color: '#00599C' },
        'cplusplus': { icon: SiIcons.SiCplusplus, color: '#00599C' },
        'c': { icon: SiIcons.SiC, color: '#A8B9CC' },
        'c#': { icon: SiIcons.SiCsharp, color: '#239120' },
        'csharp': { icon: SiIcons.SiCsharp, color: '#239120' },
        'java': { icon: FaIcons.FaJava, color: '#007396' },
        'react': { icon: SiIcons.SiReact, color: '#61DAFB' },
        'javascript': { icon: SiIcons.SiJavascript, color: '#F7DF1E' },
        'tailwindcss': { icon: SiIcons.SiTailwindcss, color: '#06B6D4' },
        'mysql': { icon: SiIcons.SiMysql, color: '#4479A1' },
        'git': { icon: SiIcons.SiGit, color: '#F05032' },
        'machinelearning': { icon: FaIcons.FaBrain, color: '#F7931E' }, // Generic Brain
        'dataanalysis': { icon: FaIcons.FaChartBar, color: '#36A2EB' },
        'iot': { icon: BiIcons.BiChip, color: '#4CAF50' },
        'numpy': { icon: SiIcons.SiNumpy, color: '#013243' },
        'pandas': { icon: SiIcons.SiPandas, color: '#150458' },
        'arduino': { icon: SiIcons.SiArduino, color: '#00979D' },
        'matplotlib': { icon: FaIcons.FaChartPie, color: '#11557c' }, // Fallback to chart
    };

    if (map[standardizedName]) {
        const { icon: Icon, color } = map[standardizedName];
        if (Icon) {
            return <Icon size={40} color={color} />;
        }
    }

    // Default Fallback
    return <FaIcons.FaCode size={40} className="text-white" />;
};

const Skills = ({ className }) => {
    const technicalSkills = profileData.skills.filter(s => s.category === 'Technical');

    return (
        <section id="skills" className={`py-24 bg-primary overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="font-display text-4xl font-bold text-white mb-2">TECHNICAL <span className="text-accent">ARSENAL</span></h2>
                    <div className="w-16 h-1 bg-accent mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {technicalSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1, borderColor: '#fff' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all duration-300 group aspect-square"
                        >
                            <div className="text-4xl">
                                {getIcon(skill.name)}
                            </div>
                            <span className="text-white font-sans font-bold text-sm text-center">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
