import { Event, Attendee, Speaker, Post, Poll, AnalyticsStats } from "./types";

export const initialSpeakers: Speaker[] = [
  {
    id: "spk-1",
    name: "Dr. Elena Vance",
    company: "Nova AI Labs",
    role: "Chief AI Architect",
    bio: "Elena specializes in multi-agent prompt orchestration and custom neural embedding layers. Author of 'The Choreography of LLMs'.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
    skills: ["TypeScript", "Python", "Vector Databases", "Embeddings"],
    email: "elena@novaai.labs"
  },
  {
    id: "spk-2",
    name: "Marcus Brody",
    company: "Stripe",
    role: "Staff UX Designer",
    bio: "Marcus has spent over a decade shaping checkout flows and financial dashboards. Passionate about minimalist web interfaces and typography.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    skills: ["Figma", "Tailwind CSS", "Interaction Design", "Typography"],
    email: "mbrody@stripe.com"
  },
  {
    id: "spk-3",
    name: "Sarah Chen",
    company: "Y-Combinator",
    role: "Venture Partner",
    bio: "Former Principal Engineer at Netflix. Now investing in early-stage AI infrastructure and developer tooling.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    skills: ["Product Strategy", "Go-To-Market", "Scale Engineering", "Fundraising"],
    email: "sarah.chen@ycombinator.com"
  }
];

export const initialAttendees: Attendee[] = [
  {
    id: "att-me",
    name: "Ganesh Var",
    company: "AI Studio Build Team",
    role: "Full-Stack Developer",
    bio: "Passionate about crafting pixel-perfect, highly responsive React products with robust backends and intelligent agents.",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
    skills: ["React", "TypeScript", "Express", "Tailwind CSS", "PostgreSQL"],
    industry: "Developer Tooling",
    goals: ["Build a startup team", "Learn advanced RAG architecture", "Meet potential seed investors"],
    interests: ["Artificial Intelligence", "UI/UX", "DeFi", "Open Source"],
    email: "ganeshvar505@gmail.com"
  },
  {
    id: "att-1",
    name: "Aisha Rahman",
    company: "DeepMind",
    role: "Research Scientist",
    bio: "Working on the intersection of Reinforcement Learning and agentic task execution.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    skills: ["Python", "PyTorch", "Reinforcement Learning", "Embeddings"],
    industry: "Artificial Intelligence",
    goals: ["Find engineering collaborators", "Brainstorm agent applications"],
    interests: ["Artificial Intelligence", "Robotics", "BioTech"],
    email: "aisha.r@deepmind.com"
  },
  {
    id: "att-2",
    name: "Devon Miller",
    company: "Linear App",
    role: "Senior Frontend Engineer",
    bio: "Obsessed with buttery-smooth animations, fast load times, and custom keyboard-navigable command menus.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    skills: ["React", "Vite", "Framer Motion", "Tailwind CSS"],
    industry: "Software & Productivity",
    goals: ["Discuss micro-frontend patterns", "Discover developer-first tools"],
    interests: ["UI/UX", "Desktop Apps", "Interaction Design"],
    email: "devon@linear.app"
  },
  {
    id: "att-3",
    name: "Chloe Zhao",
    company: "Founders Fund",
    role: "Investment Associate",
    bio: "Sourcing pre-seed and seed-stage startups in AI, security, and developer infrastructure.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    skills: ["Financial Modeling", "Due Diligence", "Product Strategy"],
    industry: "Venture Capital",
    goals: ["Identify standout talent", "Meet tech founders"],
    interests: ["Space Tech", "Artificial Intelligence", "SaaS Startup"],
    email: "chloe@foundersfund.com"
  }
];

export const initialEvents: Event[] = [
  {
    id: "evt-1",
    title: "Global HackAI 2026",
    description: "The premiere 48-hour global gathering for builders crafting the next generation of multi-agent networks, RAG pipelines, and decentralized AI systems. Over $50K in developer grants up for grabs.",
    date: "June 26 - 28, 2026",
    time: "09:00 AM (Friday) - 06:00 PM (Sunday)",
    location: "Soma Innovation Hub, San Francisco",
    organizerName: "Nexus Core Organizers",
    category: "Hackathon",
    tags: ["Artificial Intelligence", "Hackathon", "Open Source", "TypeScript"],
    bannerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80",
    capacity: 500,
    registeredCount: 342,
    status: "Published",
    schedule: [
      {
        id: "s-1",
        eventId: "evt-1",
        title: "Opening Ceremony & Nexus Core Platform Launch",
        description: "Welcome keynote from the organizers and announcement of sponsor challenges, evaluation criteria, and available sandbox tools.",
        speakerId: "spk-3",
        speakerName: "Sarah Chen",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        track: "Foundership",
        location: "Grand Ballroom"
      },
      {
        id: "s-2",
        eventId: "evt-1",
        title: "Masterclass: Deploying Multi-Agent Networks on Cloud Run",
        description: "An in-depth technical walk-through on vector embeddings, prompt routing, and minimizing LLM context footprint in production.",
        speakerId: "spk-1",
        speakerName: "Dr. Elena Vance",
        startTime: "10:30 AM",
        endTime: "11:45 AM",
        track: "AI & Machine Learning",
        location: "Tech Sandbox Room"
      },
      {
        id: "s-3",
        eventId: "evt-1",
        title: "The Stripe Polish: Designing High-Conversion AI Interfaces",
        description: "Understanding user friction in generative apps. How to build responsive, micro-animated feedback loops that establish trust.",
        speakerId: "spk-2",
        speakerName: "Marcus Brody",
        startTime: "01:30 PM",
        endTime: "02:45 PM",
        track: "Design & Frontend",
        location: "Design Studio Hub"
      }
    ]
  }
];

export const initialPosts: Post[] = [
  {
    id: "post-1",
    authorName: "Dr. Elena Vance",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces",
    content: "Thrilled to be keynoting the AI track at Global HackAI 2026. I'll be sharing some brand-new research on context footprint pruning. Can't wait to see what you all build! Drop your team ideas below if you're looking for feedback.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: [
      {
        id: "c-1",
        postId: "post-1",
        authorName: "Aisha Rahman",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=faces",
        content: "Super excited about this topic! Elena's work on context pruning is game-changing.",
        timestamp: "1.5 hours ago"
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Marcus Brody",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
    content: "Remember: judges spend at most 3 minutes looking at your hackathon project. Clean visual polish, immediate page loads, and clear value statements beat massive feature lists every single time. Optimize your landing screen!",
    timestamp: "4 hours ago",
    likes: 42,
    comments: []
  }
];

export const initialPolls: Poll[] = [
  {
    id: "poll-1",
    question: "What is your main technical stack for the Hackathon?",
    options: [
      { id: "o-1", text: "React / Vite / Express (Full-Stack)", votes: 142 },
      { id: "o-2", text: "Python / FastAPI / LangChain", votes: 98 },
      { id: "o-3", text: "Next.js / Server Actions / Supabase", votes: 85 },
      { id: "o-4", text: "Rust / WASM / WebSockets", votes: 24 }
    ],
    totalVotes: 349
  },
  {
    id: "poll-2",
    question: "Which workshop track are you attending?",
    options: [
      { id: "o2-1", text: "AI & Machine Learning", votes: 110 },
      { id: "o2-2", text: "Design & Frontend", votes: 55 },
      { id: "o2-3", text: "Foundership & Pitching", votes: 35 }
    ],
    totalVotes: 200
  }
];

export const initialAnalytics: AnalyticsStats = {
  totalRegistrations: 342,
  checkedIn: 218,
  matchmakingConnections: 184,
  activeAttendees: 156,
  engagementRate: 88,
  networkingSatisfaction: 94,
  registrationTimeline: [
    { date: "June 16", registrations: 45 },
    { date: "June 18", registrations: 112 },
    { date: "June 20", registrations: 189 },
    { date: "June 21", registrations: 240 },
    { date: "June 22", registrations: 310 },
    { date: "June 23", registrations: 342 }
  ],
  categoryDistribution: [
    { name: "Developers", value: 45 },
    { name: "AI Researchers", value: 25 },
    { name: "Designers", value: 15 },
    { name: "Entrepreneurs", value: 15 }
  ],
  sessionAttendance: [
    { name: "Opening Keynote", count: 218 },
    { name: "Multi-Agent class", count: 180 },
    { name: "Stripe Design Polish", count: 145 }
  ]
};
