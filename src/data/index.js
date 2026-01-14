export const profileData = {
    name: "Parth Garg",
    headline: "Computer Science Undergraduate | Coding & Robotics Enthusiast",
    contact: {
        email: "parth.garg1001@gmail.com",
        linkedin: "https://www.linkedin.com/in/parth-garg-588842306/",
        github: "https://github.com/parth-garg01",
    },
    about: "Parth Garg is a second-year engineering student at VIT Vellore, with a strong interest in the intersection of software and hardware, particularly in the fields of IoT, data science, Robotics and machine learning. He is proficient in Python, C, C++ and Java, and is currently deepening his understanding of machine learning and its applications. Parth recently held a Data Analytics position during his internship at Fintoric Capital, where he worked on extracting insights from financial data. In addition, he is actively involved in academic research and is co-authoring research and review papers under the guidance of his faculty on contemporary and impactful technological topics.",
    education: [
        {
            institution: "Vellore Institute of Technology, Vellore",
            degree: "B.Tech in Computer Science",
            period: "2024 - 2028 (Expected)",
        },
        {
            institution: "The Vivekanand School Narela",
            degree: "Senior Secondary School Certificate (Class 12th)",
            period: "2022 - 2024",
        },
        {
            institution: "Little Scholars School Kashipur",
            degree: "Secondary School Certificate (Class 10th)",
            period: "2017 - 2022",
        },
        {
            institution: "Delhi Public School",
            degree: "Primary School Certificate",
            period: "2014 - 2017",
        }
    ],
    journey: [
        {
            year: "2025 - Present",
            role: "Reseach and Development Head",
            company: "TAM-VIT",
            description: "Organised various workshops and contributed to technical events.",
            tech: ["Research and Development", "AI & ML", "Event Management", "Team Leadership", "Public Speaking"],
        },
        {
            year: "May 2025 - June 2025",
            role: "Data Analyst Intern",
            company: "Fintoric Capital",
            description: "Analyzed trading strategies (Iron Condor, etc.) and developed data-driven insights using Python. Automated report generation reducing 2 hours of manual work daily.",
            tech: ["Python", "Pandas", "MatplotLib", "Data Visualization", "Algorithmic Trading"],
        },
        {
            year: "2024 - 2028",
            role: "B.Tech in Computer Science",
            company: "Vellore Institute of Technology",
            description: "Pursuing undergraduate studies with a focus on software development, data structures, algorithms, and machine learning. Engaged in various projects and hackathons to apply theoretical knowledge practically.",
            tech: ["Computer Science", "Engineering"],
        },
    ],
    // Merged & Filtered Technical Credentials (Sorted by Year Descending)
    achievements: [
        {
            title: "Supervised Machine Learning",
            issuer: "Stanford University",
            date: "Dec 2025",
            description: "Completed an advanced specialization covering regression, classification, and deep learning neural networks. Implemented practical models for housing price prediction and medical diagnosis using Python and NumPy.",
            type: "Certification"
        },
        {
            title: "Best Project Award",
            issuer: "Code2Create Hackathon",
            date: "Sep 2025",
            description: "Secured 1st place in the AI Solutions track against 50+ teams. Developed 'Blind Aid', a real-time object detection system for the visually impaired, utilizing IoT sensors and a custom Python-based computer vision algorithm.",
            type: "Award"
        },
        {
            title: "C# Programming",
            issuer: "HackerRank",
            date: "May 2025",
            description: "Demonstrated strong proficiency in C# syntax, object-oriented programming, and algorithm implementation. Solved complex coding challenges focusing on data structures and memory management.",
            type: "Certification"
        },
        {
            title: "Python Certificate",
            issuer: "HackerRank",
            date: "May 2025",
            description: "Verified expertise in Python programming, covering data types, control flow, and functional programming. Successfully optimized algorithms for efficiency in timed competitive scenarios.",
            type: "Certification"
        },
        {
            title: "Design Thinking Workshop",
            issuer: "IIM Kashipur",
            date: "Mar 2022",
            description: "Participated in an intensive workshop on product innovation. Applied design thinking principles to prototype user-centric solutions, improving problem-solving frameworks for engineering projects.",
            type: "Workshop"
        }
    ],
    // Deprecated separate array
    certifications: [],

    experience: [],
    skills: [
        { name: "Python", category: "Technical" },
        { name: "C++", category: "Technical" },
        { name: "Java", category: "Technical" },
        { name: "React", category: "Technical" },
        { name: "JavaScript", category: "Technical" },
        { name: "Tailwind CSS", category: "Technical" },
        { name: "Machine Learning", category: "Technical" },
        { name: "Data Analysis", category: "Technical" },
        { name: "MySQL", category: "Technical" },
        { name: "Git", category: "Technical" },
        { name: "IoT", category: "Technical" },
        { name: "C", category: "Technical" },
        { name: "C#", category: "Technical" },
        { name: "Matplotlib", category: "Technical" },
        { name: "NumPy", category: "Technical" },
        { name: "Pandas", category: "Technical" },
        { name: "Arduino", category: "Technical" },
    ],
    projects: [
        {
            title: "Blind Aid System",
            description: "Award-winning project at Code2Create Hackathon. A system designed to assist visually impaired individuals using ultrasonic sensors and voice feedback.",
            tech: ["IoT", "Python", "Sensors", "Arduino"],
            link: "#"
        },
        {
            title: "MyTuneVault ",
            description: "Created a clone of the Spotify interface and added all the songs from my playlist. It allows me to listen to music without any ad breaks.",
            tech: ["React", "JavaScript", "CSS", "HTML"],
            link: "#"
        },
        {
            title: "Thermal DDoS Detector",
            description: "A network security tool that monitors thermal signatures of devices to detect potential DDoS attacks in real-time. Utilizes machine learning algorithms for anomaly detection.",
            tech: ["Python", "Machine Learning", "Ardiuno", "IoT"],
            link: "#"
        },
        {
            title: "Government Workflow Optimizer",
            description: "A machine learning-based system that predicts government file processing times and identifies delay risks. Features synthetic data generation, ML models for regression and classification, and an interactive Streamlit dashboard for workflow optimization.",
            tech: ["Streamlit","Scikit-learn","LightGBM","Plotly","Pandas"],
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "A modern, high-performance portfolio website with glassmorphism and stacked transitions. Built with React and Vite.",
            tech: ["React", "Tailwind CSS", "Framer Motion"],
            link: "#"
        }
    ],
    hobbies: [
        { name: "Coding", icon: "Code" },
        { name: "Hackthon", icon: "Trophy" },
        { name: "Abacus", icon: "Calculator" },
        { name: "Harmonium", icon: "Music" },
        { name: "Public Speaking", icon: "Mic" },
        { name: "Robotics", icon: "Bot" },
        { name: "Chess", icon: "Gamepad2" },
        { name: "Reading", icon: "Book" },
        { name: "Travel", icon: "Map" }
    ]
};