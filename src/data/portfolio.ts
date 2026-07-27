import resumeAsset from "@/assets/resume.pdf.asset.json";

export const profile = {
  name: "Arsh Goel",
  role: "Full Stack Developer",
  tagline:
    "Building scalable web applications, real-time systems, and AI-powered digital experiences.",
  location: "India",
  status: "Final Year B.Tech CSE Student",
  email: "goelarsh2005@gmail.com",
  github: "https://github.com/arsh-goel25",
  linkedin: "https://www.linkedin.com/in/arshgoel/",
  resume: resumeAsset.url,
  openTo: [
    "Software Engineering Internships",
    "Software Developer Roles",
    "Full Stack Developer Roles",
  ],
};

export const about = [
  {
    year: "The Spark",
    title: "Why I started coding",
    body: "A curiosity about how the products I used every day were built turned into hours of tinkering — and the realization that software is the closest thing we have to magic.",
  },
  {
    year: "The Craft",
    title: "What I love building",
    body: "Scalable MERN applications, AI-powered systems, real-time platforms, and REST APIs designed with clean architecture and performance in mind.",
  },
  {
    year: "Today",
    title: "What drives me",
    body: "Turning ambiguous problems into production-ready products. I obsess over performance budgets, thoughtful UX, and code that reads like prose.",
  },
  {
    year: "Ahead",
    title: "Where I'm going",
    body: "Joining a team that ships fast, thinks in systems, and builds software that reaches millions — while continuing to sharpen my engineering craft.",
  },
];

export const skills = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Material UI"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["MongoDB"],
  Realtime: ["WebRTC", "Socket.IO"],
  Auth: ["JWT", "Clerk", "RBAC"],
  Tools: ["Git", "GitHub", "VS Code", "Postman"],
  Practices: ["Responsive Design", "Performance Optimization", "Clean Architecture"],
} as const;

export const projects = [
  {
    slug: "syncora",
    name: "Syncora",
    subtitle: "AI-Powered Peer-to-Peer Video Conferencing",
    year: "2025",
    tech: ["React", "Node.js", "Express", "MongoDB", "WebRTC", "Socket.IO", "Clerk"],
    overview:
      "A production-grade video conferencing platform with AI transcription, live translation, and noise suppression — built on a peer-to-peer WebRTC core.",
    problem:
      "Existing video tools are heavy, cloud-locked, and language-siloed. Global teams and students need low-latency, private conversations that transcend language.",
    solution:
      "A P2P WebRTC layer for sub-100ms audio/video, Socket.IO for signaling and chat, and AI models for real-time transcription plus multilingual translation.",
    features: [
      "Secure authentication (Clerk)",
      "Peer-to-peer HD video & audio",
      "Screen sharing",
      "Live chat with presence",
      "AI speech transcription",
      "Multilingual translation",
      "Background noise suppression",
      "Fully responsive UI",
    ],
    challenges:
      "Engineering a resilient WebRTC signaling flow across NAT boundaries, and streaming ASR without blocking the render loop.",
    github: "https://github.com/arshgoel/syncora",
    live: "#",
    accent: "from-[oklch(0.72_0.19_245)] to-[oklch(0.68_0.24_305)]",
  },
  {
    slug: "doctorhub",
    name: "DoctorHub",
    subtitle: "Online Doctor Appointment Booking Platform",
    year: "2024",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    overview:
      "A full-stack healthcare platform connecting patients and doctors through role-based dashboards, appointments, and availability management.",
    problem:
      "Booking a doctor is still a phone call in most of the world. Patients need transparency; doctors need control over their calendar.",
    solution:
      "A dual-portal MERN application with JWT-based role access, doctor profiles, live availability, and a friction-free booking flow.",
    features: [
      "Patient & Doctor authentication",
      "Role-based access control",
      "Doctor and Patient dashboards",
      "Appointment booking flow",
      "Doctor profiles & availability",
      "REST APIs with validation",
      "Responsive design",
    ],
    challenges:
      "Modeling appointments to prevent double-bookings under race conditions, and shaping RBAC that stays simple as roles grow.",
    github: "https://github.com/arshgoel/doctorhub",
    live: "#",
    accent: "from-[oklch(0.68_0.24_305)] to-[oklch(0.72_0.19_245)]",
  },
];

export const achievements = [
  { value: 100, suffix: "+", label: "LeetCode Problems Solved" },
  { value: 8.0, suffix: "", label: "Current CGPA", decimals: 1 },
  { value: 2, suffix: "+", label: "Production MERN Projects" },
];

export const certifications = [
  {
    name: "Introduction to MongoDB",
    issuer: "MongoDB University",
    audience: "For Students",
    year: "2024",
  },
];

export const education = [
  {
    school: "Meerut Institute of Engineering and Technology",
    degree: "B.Tech, Computer Science Engineering",
    detail: "CGPA 8.0",
    period: "2023 — Present",
  },
];
