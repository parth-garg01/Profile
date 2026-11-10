// Site content. Every claim comes from Parth: his resume (creds/Parth_Garg_Resume_AI_ML.pdf),
// his repository READMEs, or his own answers. Results are left out on his instruction.

export const COLORS = {
  blue: '#1D2DE0',
  deep: '#1522A8',
  ink: '#0D1240',
  cream: '#FFF4E0',
  mist: '#C3CAFF',
  sun: '#FFD43B',
  coral: '#FF5B3A',
  mint: '#3BF0B0',
  pink: '#FF9BE0',
};

export const profile = {
  name: 'Parth Garg',
  first: 'Parth',
  last: 'Garg',
  role: 'AI/ML and security engineer',
  programme: 'B.Tech CSE (Information Security)',
  institution: 'VIT Vellore',
  year: 'Third year, graduating 2028',
  location: 'Vellore, India',
  resume: '/Parth_Garg_Resume.pdf',
  contact: {
    email: 'parth.garg1001@gmail.com',
    github: 'https://github.com/parth-garg01',
    githubLabel: 'parth-garg01',
    linkedin: 'https://www.linkedin.com/in/parth-garg-588842306/',
    linkedinLabel: 'parth-garg-588842306',
    scholar: 'https://scholar.google.com/citations?user=r_6TKugAAAAJ&hl=en',
  },
  lastUpdated: 'November 2026',
};

export const hero = {
  lead: 'I build machine learning systems and the tools that check them: language models, fine-tuning agents and test infrastructure.',
};

export const about = {
  statement: 'I like problems where the answer has to be checked, not just produced.',
  paragraphs: [
    'I’m a third-year Computer Science student at VIT Vellore, specialising in information security. I graduate in 2028.',
    'Most of my work sits where machine learning meets systems: a hybrid Transformer–Mamba language model, an agent that fine-tunes LLMs on free GPUs, and an engine that works out which environment difference makes a test fail.',
    'I’m Research Head at the TAM club, where I work on the club’s papers and was the point of contact for its Agentic AI workshop.',
  ],
  now: 'Teaching a language model, block by block, when to read with attention and when to use a state-space layer.',
  outside: 'Away from the keyboard: chess, harmonium and public speaking.',
};

// Project categories. Colour is used for the filter and the row hover.
export const CATEGORIES = [
  { id: 'ai', name: 'AI and ML', color: COLORS.sun },
  { id: 'security', name: 'Security', color: COLORS.mint },
  { id: 'research', name: 'Research', color: COLORS.pink },
  { id: 'software', name: 'Software', color: COLORS.cream },
  { id: 'hardware', name: 'Hardware', color: COLORS.coral },
];
export const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

const gh = (repo) => `https://github.com/parth-garg01/${repo}`;

// The three projects on the resume.
export const featured = [
  {
    slug: 'adaptive-block-routing',
    name: 'Adaptive Block Routing',
    kicker: 'Hybrid Transformer–Mamba language model',
    color: COLORS.sun,
    visual: 'routing',
    summary:
      'A hybrid language model in PyTorch where a Gumbel-Softmax router, with entropy-controlled temperature, sends each block of tokens to either attention or a Mamba state-space layer.',
    detail:
      'Cross-Block State Continuity carries Mamba’s recurrent state across routing boundaries, so a block that goes to Mamba picks up where the last Mamba block left off.',
    facts: [
      ['Routing', 'Gumbel-Softmax, Mixture-of-Experts style'],
      ['Scale', '16M parameters, one RTX 2050'],
      ['Data', 'WikiText-103'],
    ],
    stack: ['Python', 'PyTorch', 'Mamba', 'CUDA'],
    link: gh('Hybrid_Transformer_Mamba'),
  },
  {
    slug: 'tunepilot',
    name: 'TunePilot',
    kicker: 'Autonomous LLM fine-tuning orchestrator',
    color: COLORS.cream,
    visual: 'pipeline',
    summary:
      'A terminal agent that picks a base model from Hugging Face, checks it fits in VRAM, writes the QLoRA or SFT config and launches training on Kaggle’s free dual T4 GPUs.',
    detail:
      'Every job lives in a SQLite state machine with retries and backoff. Notebooks are scanned for secrets before upload, and expected GPU hours and memory are shown for approval before anything runs.',
    facts: [
      ['Runs on', 'Kaggle, 2 × T4'],
      ['Tracking', 'SQLite state machine'],
      ['Safety', 'Secret scan and approval gate'],
    ],
    stack: ['Python', 'Hugging Face', 'QLoRA', 'SQLite'],
    link: gh('TunePilot'),
  },
  {
    slug: 'morph',
    name: 'Morph',
    kicker: 'Environment fault isolation engine',
    color: COLORS.coral,
    visual: 'bisection',
    summary:
      'Works out which environment difference (OS, network latency, locale, CPU or memory limits) makes a test fail, by re-running it under controlled conditions with Linux cgroups, tc/netem and a TCP proxy.',
    detail:
      'Anytime-valid sequential tests hold false positives at alpha, and a probabilistic bisection search with a Bayesian dose-response model finds the failure threshold, such as a lock lease that breaks above 134 ms of latency.',
    facts: [
      ['Controls', 'cgroups, tc/netem, TCP proxy'],
      ['Statistics', 'Anytime-valid e-values'],
      ['Search', 'Probabilistic bisection'],
    ],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript'],
    link: gh('Morph'),
  },
];

// Everything else worth showing. 21 entries, newest first within each year.
export const projects = [
  { name: 'BlindSpot', cat: 'hardware', year: 2025, stack: 'Raspberry Pi 5, Python, OpenCV', summary: 'A camera on a Raspberry Pi that tells a visually impaired user what is in front of them, out loud. Won the AI track at Code2Create and is the subject of the patent application.', link: 'https://github.com/Ad1th/BlindSpot', team: true },
  { name: 'CodeWeaver', cat: 'software', year: 2026, stack: 'Python', summary: 'LLM-free code migration through a typed intermediate representation, which reports exactly what it could not translate.', link: gh('Codeweaver') },
  { name: 'Nova', cat: 'ai', year: 2026, stack: 'Python, RAG, React', summary: 'A company-agnostic AI assistant demo with streaming chat, cited retrieval, permission-controlled tools and evaluation.', link: gh('Omniagent') },
  { name: 'TroubleIR', cat: 'ai', year: 2026, stack: 'Python, Groq', summary: 'Samsung PRISM: turns a vague Galaxy device complaint into a validated, step-by-step troubleshooting plan grounded in support documents.', link: gh('TroubleIR') },
  { name: 'ChainTrace', cat: 'security', year: 2026, stack: 'JavaScript, blockchain', summary: 'Scan a package and check every claim about its journey against the signed on-chain checkpoint behind it.', link: gh('chaintrace') },
  { name: 'iPadDisplay', cat: 'software', year: 2026, stack: 'C++', summary: 'Turns an iPad into a real second display for a Windows laptop over local Wi-Fi, with its own wire protocol and pairing.', link: gh('duet_link') },
  { name: 'LPM for Windows', cat: 'software', year: 2026, stack: 'Rust, ConPTY', summary: 'A native Windows workspace for running services, actions and parallel AI coding agents side by side.', link: gh('lpm_windows') },
  { name: 'Smart Mail Merger', cat: 'software', year: 2026, stack: 'Electron, React, Gmail API', summary: 'Scheduled, personalised Gmail campaigns from a spreadsheet, as a desktop app and a hosted web version.', link: gh('mail_merge_web') },
  { name: 'ScanMark', cat: 'software', year: 2026, stack: 'TypeScript', summary: 'Event attendance from a phone camera: volunteers scan ID card barcodes into one shared Google Sheet.', link: gh('barcode_scanner') },
  { name: 'Grape Leaf Disease Benchmark', cat: 'research', year: 2026, stack: 'Python, PyTorch', summary: 'How much CNNs and transformers lose when they move from lab images to field images of grape leaves.', link: gh('grape_leaf_disease_exp') },
  { name: 'Retinal Disease Screening', cat: 'research', year: 2026, stack: 'Python, scikit-learn, XGBoost', summary: '628 handcrafted features per patient on ODIR-5K, fed to voting and stacking ensembles. The code behind the NELEX paper.', link: gh('OcularDisease') },
  { name: 'Digital Twin', cat: 'research', year: 2026, stack: 'Python, STGCN', summary: 'A coupled smart-city simulation where traffic flow and energy demand drive each other, forecast with a spatiotemporal graph network on METR-LA.', link: gh('Digital-Twin') },
  { name: 'VoxCraft', cat: 'ai', year: 2026, stack: 'FastAPI, Next.js, Whisper', summary: 'An offline-first speech-to-text and text-to-speech platform with REST APIs and a fine-tuning pipeline.', link: gh('NLP') },
  { name: 'Sentinel', cat: 'security', year: 2026, stack: 'Flutter, AES, SHA-256', summary: 'Emergency reporting disguised as a calculator, with encrypted evidence, hash-chained integrity and delayed upload.', link: gh('Sentinel') },
  { name: 'FocusLock', cat: 'software', year: 2026, stack: 'Kotlin, Chrome extension', summary: 'Timed focus sessions that block chosen apps on Android and chosen sites in Chrome, with a strict mode.', link: gh('FocusLock') },
  { name: 'Deadline Sentinel', cat: 'software', year: 2026, stack: 'Chrome extension', summary: 'Reads assignment deadlines from the college portal and emails a reminder a day before each one.', link: gh('Assignment-Deadline-Tracker') },
  { name: 'TAM Research Cycle Portal', cat: 'software', year: 2026, stack: 'Next.js, MongoDB', summary: 'Weekly research updates for the TAM club, with Google sign-in and an admin view that sends reminders.', link: gh('TAM-ResearchCycle-TaskSubmission-Portal') },
  { name: 'GazePoint', cat: 'ai', year: 2026, stack: 'Python, MediaPipe, OpenCV', summary: 'Moves the cursor with your eyes through real-time iris tracking, and clicks when you blink.', link: gh('GazePoint') },
  { name: 'MultilingualAI', cat: 'ai', year: 2026, stack: 'Whisper, MarianMT, Edge-TTS', summary: 'Speech-to-speech translation across English, Hindi and Tamil that tries to keep tone and idiom.', link: gh('MultilingualAI') },
  { name: 'Thermal DDoS Detector', cat: 'security', year: 2026, stack: 'Arduino, C++, Python', summary: 'Correlates a temperature sensor with host CPU load to spot a denial-of-service attack, and cuts power through a relay.', link: gh('Thermal-DDoS-Detector') },
  { name: 'FlowGov AI', cat: 'ai', year: 2025, stack: 'LightGBM, XGBoost, Streamlit', summary: 'Predicts how long a government file will take and whether it will miss its deadline, with a dashboard.', link: gh('gov-workflow-optimizer') },
];

export const papers = {
  paper: {
    title: 'An Efficient Handcrafted Feature-Driven Ensemble Learning Approach for Retinal Disease Screening',
    role: 'First author',
    venue: 'International Conference on Next Generation Electronics (NELEX)',
    publisher: 'IEEE',
    year: 2026,
    doi: 'https://doi.org/10.1109/NELeX69209.2026.11590537',
    code: gh('OcularDisease'),
    note: 'Six families of handcrafted features from both eyes, 628 per patient, classified by voting and stacking ensembles on the ODIR-5K fundus dataset.',
  },
  patent: {
    title: 'A System for Real Time Environmental Perception and Assistance for a Visually Impaired User',
    office: 'Indian Patent Office',
    number: '202641010249',
    published: '13 February 2026',
    note: 'The system behind BlindSpot: a camera and a Raspberry Pi that detect what is ahead and describe it aloud.',
    photo: '/work/blindspot-device.png',
  },
};

export const experience = [
  {
    org: 'BAMKO',
    role: 'Summer Intern',
    dates: 'May – Jun 2026',
    place: 'Dehradun, India',
    points: [
      'Built an LLM voice bot and full-stack speech features for a Quality Management System used by iLeads, with Sarvam speech-to-text and Groq for the language model step.',
      'Built the backend: a BullMQ and Redis job queue for speech-to-text, a 25-table PostgreSQL schema in Prisma and REST APIs, deployed with Docker on AWS EC2.',
      'Fixed production bugs across live systems and contributed to the system design of the HR management system.',
    ],
  },
  {
    org: 'TAM Club, VIT',
    role: 'Research Head',
    dates: '2025 – present',
    place: 'Vellore, India',
    points: [
      'Point of contact for the club’s Agentic AI workshop, attended by more than 250 people.',
      'Designed and built the website for Code Cortex, a 30-hour ML hackathon with more than 300 participants.',
      'Work on the club’s research papers, from ideas and experiments to the writing.',
    ],
  },
  {
    org: 'Fintoric Capital',
    role: 'Data Analyst Intern',
    dates: 'May – Jun 2025',
    place: 'Delhi, India',
    points: [
      'Backtested three options strategies (Iron Condor, B120 and ORB) against historical market data in Pandas.',
      'Ran the firm’s in-house models through the same backtests to check whether they would hold up.',
      'Plotted daily and cumulative returns in Matplotlib so the team could compare strategies over the same periods.',
    ],
  },
];

export const recognition = [
  { title: 'Winner, AI Solutions Track', where: 'Code2Create Hackathon, ACM-VIT', year: '2025', note: 'With BlindSpot' },
  { title: 'Top 15 and Best Write-up award', where: 'Zodiak CTF, z0diak', year: '2026', note: 'Write-up for Re:Play' },
  { title: 'Supervised Machine Learning: Regression and Classification', where: 'Andrew Ng, Coursera', year: '2025' },
];

export const toolkit = [
  ['Languages', 'Python, Java, C, C++, JavaScript, SQL'],
  ['Machine learning', 'PyTorch, scikit-learn, XGBoost, LightGBM, OpenCV, NumPy, Pandas, LangChain, RAG, LLMs'],
  ['Web', 'React, Next.js, Node.js, FastAPI, Flutter, HTML, CSS'],
  ['Data and cloud', 'PostgreSQL, Supabase, SQLite, ChromaDB, Firebase, AWS (EC2, S3, IAM)'],
  ['Tools', 'Git, Linux, Docker, Kubernetes, CI/CD, Streamlit, Ollama'],
];

export const contact = {
  lead: 'Looking for research and engineering internships for summer 2027.',
};

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'papers', label: 'Papers' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
