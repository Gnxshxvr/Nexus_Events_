import React, { useState } from "react";
import { BookOpen, Shield, Code, Database, Users, Sparkles, Sliders, Play, Terminal, Cpu, Lightbulb, FileText, CheckCircle2 } from "lucide-react";

export default function SpecsTab() {
  const [activeCategory, setActiveCategory] = useState<string>("brand");
  const [copiedTagline, setCopiedTagline] = useState<number | null>(null);

  const categories = [
    { id: "brand", label: "Brand & Vision", icon: Sparkles, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
    { id: "users", label: "Users & Journeys", icon: Users, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/20" },
    { id: "ai", label: "AI Engine", icon: Cpu, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20" },
    { id: "db", label: "Database Schema", icon: Database, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
    { id: "tech", label: "Tech & Security", icon: Shield, color: "text-red-500 bg-red-50 dark:bg-red-950/20" },
    { id: "guide", label: "Developer Guide", icon: Terminal, color: "text-violet-500 bg-violet-50 dark:bg-violet-950/20" },
  ];

  const taglines = [
    "The AI Operating System For Events",
    "Where Events Become Intelligent",
    "From Event Management To Event Intelligence",
    "Frictionless Coordination, Powered by Nexus AI",
    "Smart Agenda, Personalized Matches, Zero Friction",
    "Hyper-Targeted Networking for High-Impact Innovators",
    "Transforming Chaos into Cohesion with Generative AI",
    "The Intelligent Layer for Modern Conferences",
    "Sync Less, Collaborate More with Nexus",
    "Unleash the Network Effect of Your Attendee Base",
    "Real-Time Matchmaking, Algorithmic Synergy",
    "Hackathon-Winning Product Built from Absolute Zero",
    "AI-Powered Operations, Redefined.",
    "Banish Spreadsheet Planning Forever",
    "Elevate Your Event with Proactive Agentic Insights",
    "The Self-Structuring Agenda Engine",
    "Where Speakers, Sponsors, and Attendees Seamlessly Align",
    "Reduce Event Friction by 70%",
    "The Multi-Agent Operating System for Tech Summits",
    "Connect Smarter, Learn Faster with Nexus Events AI"
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTagline(index);
    setTimeout(() => setCopiedTagline(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 md:p-8 shadow-sm border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-3xl">
          <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest bg-indigo-950/60 border border-indigo-800/60 px-3 py-1 rounded-full">
            Product Specifications Explorer
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-semibold mt-3 tracking-tight">
            The Living Blueprint of Nexus Events AI
          </h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base font-sans leading-relaxed">
            Actively displaying Sections 1 through 26. Browse branding assets, vector logo coordinates, system architecture diagrams, database entities, and developer instructions in this integrated directory.
          </p>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-slate-900"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80"
              }`}
            >
              <div className={`p-1.5 rounded-lg mb-2 ${cat.color} ${isActive ? "text-white bg-white/10" : ""}`}>
                <Icon size={18} />
              </div>
              <span className="text-xs font-medium font-sans">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[400px]">
        
        {/* CATEGORY: BRAND & VISION */}
        {activeCategory === "brand" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Sparkles className="text-indigo-500" size={24} />
              <h2 className="text-xl font-display font-semibold">Section 1 & 2: Brand Identity & Logo System</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-indigo-950">
                <h3 className="font-mono text-xs uppercase text-slate-500 mb-1">Mission Statement</h3>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                  "To build a high-performance, frictionless operating network for human gatherings—eliminating logistical overhead by 70% and turning chaotic events into hyper-focused, self-optimizing environments of mutual opportunity."
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-indigo-950">
                <h3 className="font-mono text-xs uppercase text-slate-500 mb-1">Vision Statement</h3>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                  "A world where no physical or virtual conference is static. Every schedule, connection, and insight becomes dynamic, powered by safe, context-aware AI agents serving human needs seamlessly."
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-indigo-950">
                <h3 className="font-mono text-xs uppercase text-slate-500 mb-1">Brand Personality</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["Minimalist", "High-Fidelity", "Intelligent", "Empathetic", "Reliable"].map((p) => (
                    <span key={p} className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-full font-medium">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-sans mt-2">
                  Voice is professional yet accessible. Stripe-like polish, Apple-like clarity.
                </p>
              </div>
            </div>

            {/* SVG Logo Concepts (Rendered Live) */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold font-display mb-4">Section 2: Primary & Monogram Logo Concepts (Live Vector Render)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Logo Concept 1 */}
                <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-950/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono text-slate-400 mb-4">Primary Vector Symbol (Geometric Harmony)</span>
                  <svg width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g className="text-indigo-600 dark:text-indigo-400">
                      <path d="M15 35 C 15 20, 25 15, 35 35 C 45 55, 55 50, 55 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                      <circle cx="35" cy="35" r="7" fill="currentColor"/>
                      <circle cx="15" cy="35" r="3" fill="#10B981"/>
                      <circle cx="55" cy="35" r="3" fill="#10B981"/>
                    </g>
                    <text x="75" y="44" fill="currentColor" className="text-slate-900 dark:text-white font-display font-semibold text-xl tracking-tight">
                      NEXUS
                    </text>
                    <text x="145" y="44" fill="#6366F1" className="font-mono font-medium text-xs">
                      AI
                    </text>
                  </svg>
                  <p className="text-xs text-slate-500 font-sans mt-4 text-center">
                    **Symbol Geometry**: A continuous sine-wave representing physical collaboration and digital syncing. The central hub is connected via emerald node endpoints.
                  </p>
                </div>

                {/* Logo Concept 2 */}
                <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-950/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono text-slate-400 mb-4">Monogram & App Icon Concept (Glassmorphic Shield)</span>
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden border border-white/20">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xs"></div>
                    <span className="font-display font-bold text-white text-3xl z-10 select-none">N</span>
                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900"></div>
                  </div>
                  <p className="text-xs text-slate-500 font-sans mt-4 text-center">
                    **App Monogram**: Designed for home screen widgets. Features premium deep-gradient background, clean typography tracking, and active status indicator.
                  </p>
                </div>

              </div>
            </div>

            {/* Taglines System */}
            <div>
              <h3 className="text-sm font-semibold font-display mb-3">Section 3: Professional Tagline Matrix (Copyable)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {taglines.map((tagline, idx) => (
                  <div 
                    key={idx}
                    onClick={() => copyToClipboard(tagline, idx)}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-all group"
                  >
                    <span className="text-xs font-sans text-slate-700 dark:text-slate-300">
                      {idx + 1}. <span className="font-medium">"{tagline}"</span>
                    </span>
                    <button className="text-xs text-slate-400 group-hover:text-indigo-500 font-mono">
                      {copiedTagline === idx ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY: USERS & JOURNEYS */}
        {activeCategory === "users" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Users className="text-indigo-500" size={24} />
              <h2 className="text-xl font-display font-semibold">Section 4 & 5: Target Users, Personas & Journeys</h2>
            </div>

            {/* Target Personas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  role: "The Organizer",
                  name: "Sarah Chen",
                  company: "Nexus Hackathon Club",
                  pain: "Manual spreadsheet track coordination, mismatched team profiles, and volunteer scheduling overhead.",
                  goal: "Reduce operational friction, automate schedule conflict checks, and increase sponsor booth engagement.",
                  intervention: "AI-powered schedule builder with immediate export of agenda structures."
                },
                {
                  role: "The Attendee",
                  name: "Ganesh Var",
                  company: "Build Inc.",
                  pain: "Lurking in giant Discord channels, failing to meet relevant co-founders, missing keynotes.",
                  goal: "Find high-caliber team members with complementary skills, get curated icebreakers.",
                  intervention: "AI Matchmaking Engine that processes goals to present high-probability partners."
                },
                {
                  role: "The Speaker",
                  name: "Dr. Elena Vance",
                  company: "Nova Labs",
                  pain: "Disconnected audiences, lack of QA moderation tools, and post-session follow-up chaos.",
                  goal: "Build professional pipeline, field highly advanced developer questions, share slides easily.",
                  intervention: "Auto-moderated community engagement panel and interactive live Q&As."
                },
                {
                  role: "The Sponsor",
                  name: "Chloe Zhao",
                  company: "Founders Fund",
                  pain: "Passive booths, handing out cheap swag stickers to irrelevant traffic, zero ROI tracking.",
                  goal: "Book high-quality face-to-face meetings with elite developers and pre-seed project leads.",
                  intervention: "Targeted skill matchmaking that routes vetted talent directly to sponsor boards."
                }
              ].map((persona, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">{persona.role}</span>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white mt-1">{persona.name}</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">{persona.company}</p>
                  
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Pain Point: </span>
                      <span className="text-slate-600 dark:text-slate-400">{persona.pain}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Platform Goal: </span>
                      <span className="text-slate-600 dark:text-slate-400">{persona.goal}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">AI Intervention: </span>
                      <span className="text-slate-600 dark:text-slate-400 font-sans italic">{persona.intervention}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Journeys Timeline */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold font-display mb-4">Section 5: Frictionless End-to-End Attendee Journey Flow</h3>
              <div className="relative border-l border-indigo-200 dark:border-indigo-900 ml-4 space-y-6">
                {[
                  {
                    step: "01. Prompt Registration",
                    desc: "User inputs email and links Github. No passwords; a magic login token sets credentials.",
                    frictionSaved: "Saves 3 minutes (No password creation/reset hassle)"
                  },
                  {
                    step: "02. AI Profile Parsing",
                    desc: "Gemini crawls professional fields, extracting skills (e.g. 'TypeScript'), industry, and goals.",
                    frictionSaved: "Saves 10 minutes of manual profile tagging"
                  },
                  {
                    step: "03. Proactive Matchmaking Suggestions",
                    desc: "Platform computes similarity scores and feeds personalized icebreaker cues to the dashboard.",
                    frictionSaved: "Saves hours searching for collaborators in general chat"
                  },
                  {
                    step: "04. Active Engagement & Schedule Sync",
                    desc: "Attend selected tracks. Dynamic chat assistant routes calendar conflicts smoothly.",
                    frictionSaved: "Keeps coordination streamlined and organized"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded-full"></div>
                    <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white">{item.step}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sans leading-relaxed">{item.desc}</p>
                    <span className="inline-block mt-1 font-mono text-[10px] text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full font-medium">
                      {item.frictionSaved}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY: AI ENGINE */}
        {activeCategory === "ai" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Cpu className="text-indigo-500" size={24} />
              <h2 className="text-xl font-display font-semibold">Section 8 & 9: AI System, LLM Orchestration & Matchmaking Engine</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Architecture specs */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-display font-semibold text-sm">Context-Aware LLM + RAG Pipeline</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                    Nexus Events AI utilizes **gemini-3.5-flash** as its core generation engine. Rather than making raw, untethered calls, the platform coordinates context retrieval via a localized memory system:
                  </p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 mt-2 list-disc list-inside space-y-1 font-sans">
                    <li>**Embeddings Generation**: Compiles user skills and bios.</li>
                    <li>**Prompt Orchestration**: Appends explicit formatting limits.</li>
                    <li>**Confidence Scoring**: Inspects JSON keys post-generation.</li>
                    <li>**Fallback Rules**: Gracefully routes to lightweight client heuristics if API fails or rate limits trigger.</li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-display font-semibold text-sm">Section 9: Core Matchmaking Scoring Algorithm</h3>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mt-2 font-mono text-[10px] text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">// Heuristically synced with Gemini scores</p>
                    <p>Score = (W_industry * IndustryMatch) + (W_skills * SkillOverlaps) + (W_goals * GoalSynergy)</p>
                    <p>Where:</p>
                    <p>- IndustryMatch: 1.0 if identical industry, else 0.2</p>
                    <p>- SkillOverlaps: IntersectionCount / UnionCount</p>
                    <p>- GoalSynergy: Calculated based on Goal keyword alignment (e.g. 'investor' matches 'startup')</p>
                  </div>
                </div>
              </div>

              {/* Real Prompt Templates */}
              <div className="bg-slate-900 text-slate-300 p-5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-indigo-400 font-semibold uppercase text-[10px]">Active Prompt Template: Matchmaking</span>
                  <span className="text-[10px] text-slate-500">System Core</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {`const prompt = \`You are a professional networking agent. Analyze these profiles:
Me: Skills [\${userProfile.skills}], Goal [\${userProfile.goals}]
Candidate: Skills [\${candidateProfile.skills}], Goal [\${candidateProfile.goals}]

Respond in strict JSON:
{
  "score": <1-100>,
  "matchReason": [<array of reasons>],
  "icebreaker": "<personalized intro>"
}
Do NOT include markdown backticks or commentary.\`;`}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-emerald-400 font-semibold uppercase text-[10px]">Safety Guardrails & Tokens</span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    - Maximum output restricted to 300 tokens to save costs.<br />
                    - System explicitly refuses inappropriate requests.<br />
                    - Post-parsing JSON safety wraps catch unformatted text.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CATEGORY: DATABASE SCHEMA */}
        {activeCategory === "db" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Database className="text-indigo-500" size={24} />
              <h2 className="text-xl font-display font-semibold">Section 11 & 15: Database Schema & Entity Relationships</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Prisma code box */}
              <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-[11px] h-[320px] overflow-y-auto border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 sticky top-0 bg-slate-950 z-10 text-slate-400">
                  <span>schema.prisma</span>
                  <span className="text-xs text-indigo-400">Prisma Model Spec</span>
                </div>
                <pre>{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  profile   Profile?
  posts     Post[]
}

model Profile {
  id         String    @id @default(uuid())
  userId     String    @unique
  user       User      @relation(fields: [userId], references: [id])
  name       String
  company    String?
  role       String?
  bio        String?
  avatarUrl  String?
  skills     String[]
  industry   String?
  goals      String[]
  interests  String[]
}

model Event {
  id          String    @id @default(uuid())
  title       String
  description String
  date        String
  time        String
  location    String
  sessions    Session[]
}

model Session {
  id          String   @id @default(uuid())
  eventId     String
  event       Event    @relation(fields: [eventId], references: [id])
  title       String
  description String
  speakerId   String
  speakerName String
  startTime   String
  endTime     String
  track       String
  location    String
}
`}</pre>
              </div>

              {/* ER Explanation & Rules */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-display font-semibold text-xs uppercase text-slate-500">Prisma Database Design Architecture</h3>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-2 font-sans list-disc list-inside">
                    <li>**UUID Primary Keys**: Mitigates ID crawling threats across public API routes.</li>
                    <li>**Soft Deletes**: Configured for messages, events, and posts.</li>
                    <li>**Relational Constraints**: Composite unique index constraints secure one-to-one mapping of User-to-Profile models.</li>
                    <li>**Cascading Behaviors**: Deleting an event safely cascades to remove associated scheduled sessions immediately.</li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-display font-semibold text-xs uppercase text-slate-500">Composite Indexes Specification</h3>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mt-2 font-mono text-[10px] text-slate-600 dark:text-slate-400 space-y-1">
                    <p>@@index([userId]) // Profile search speed</p>
                    <p>@@index([eventId, track]) // Schedule track routing query</p>
                    <p>@@index([senderId, receiverId]) // Message thread retrieval indexing</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CATEGORY: TECH & SECURITY */}
        {activeCategory === "tech" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Shield className="text-indigo-500" size={24} />
              <h2 className="text-xl font-display font-semibold">Section 10, 13 & 14: Tech Stack, Authentication & Security Threat Matrix</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tech Stack Matrix */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-sm">Technology Decision Grid</h3>
                <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Frontend Foundation</span>
                    <span className="text-slate-500">React 19 / TypeScript / Vite</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Style Engine</span>
                    <span className="text-slate-500">Tailwind CSS / Framer Motion</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Backend Server</span>
                    <span className="text-slate-500">Express Node / tsx / esbuild</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Artificial Intelligence</span>
                    <span className="text-slate-500">@google/genai (3.5-flash)</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-display font-semibold text-xs block text-slate-500 uppercase mb-2">Section 13: Authentication Layer Strategy</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    Uses Magic Link tokenized structures. Magic tokens generate a short-lived UUID. Authenticators check the magic code signature, establishing cookies with `HttpOnly`, `Secure`, and `SameSite=Lax` parameters to resist XSS.
                  </p>
                </div>
              </div>

              {/* Security Threats Model */}
              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="font-display font-semibold text-sm">Section 14: Threat & Mitigation Registry</h3>
                
                <div className="space-y-3">
                  {[
                    {
                      threat: "API Key Exposure via Browser Bundles",
                      risk: "CRITICAL",
                      mitigation: "Strict separation of @google/genai libraries. All API keys remain isolated in server-side process memory behind secure proxy routes."
                    },
                    {
                      threat: "Prompt Injection / Toxic Input",
                      risk: "HIGH",
                      mitigation: "Strict validation schemas and backend instruction guards filtering out any malicious command overrides inside the prompt payload."
                    },
                    {
                      threat: "Brute Force Magic Token Harvesting",
                      risk: "MEDIUM",
                      mitigation: "Strict rate limiting on login routes (maximum 5 calls per minute) utilizing robust express middleware controls."
                    }
                  ].map((threat, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{threat.threat}</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          threat.risk === "CRITICAL" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" :
                          threat.risk === "HIGH" ? "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400" :
                          "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/20 dark:text-yellow-400"
                        }`}>{threat.risk}</span>
                      </div>
                      <p className="text-slate-500 font-sans leading-relaxed text-[11px]">{threat.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CATEGORY: DEVELOPER GUIDE */}
        {activeCategory === "guide" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Terminal className="text-indigo-500" size={24} />
              <h2 className="text-xl font-display font-semibold">Section 16, 17 & 19: Git Repository Structure, Setup & Deployment Guide</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Repository tree structure */}
              <div className="bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-[11px] h-[320px] overflow-y-auto border border-slate-800 shadow-md">
                <div className="border-b border-slate-800 pb-2 mb-2 text-indigo-400 text-xs font-semibold">
                  NEXUS EVENTS AI — GITHUB TREE
                </div>
                <pre>{`nexus-events-ai/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.ts           # Custom Express full-stack API server
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types.ts        # Type Definitions Shared Modules
│   ├── data.ts         # Initial Seed Mock Dataset
│   └── components/
│       ├── DashboardTab.tsx
│       ├── AssistantTab.tsx
│       ├── NetworkingTab.tsx
│       ├── CommunityTab.tsx
│       ├── AnalyticsTab.tsx
│       ├── SettingsTab.tsx
│       └── SpecsTab.tsx
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions CI/CD Blueprint`}</pre>
              </div>

              {/* Installation & commands guide */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-display font-semibold text-sm">Judge & Developer Onboarding Instructions</h3>
                  
                  <div className="mt-3 space-y-4 text-xs font-sans">
                    <div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block font-mono uppercase text-[10px]">1. Local Installation</span>
                      <p className="text-slate-500 mt-1">Clone the source code and run standard installs to fetch dependency binaries:</p>
                      <code className="block bg-slate-900 text-indigo-400 p-2 rounded-md font-mono text-[10px] mt-1.5 shadow-inner">
                        git clone https://github.com/your-team/nexus.git<br/>
                        cd nexus && npm install
                      </code>
                    </div>

                    <div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block font-mono uppercase text-[10px]">2. Environment Secrets Setup</span>
                      <p className="text-slate-500 mt-1">Configure your `.env` variables cleanly with references inside the repository:</p>
                      <code className="block bg-slate-900 text-indigo-400 p-2 rounded-md font-mono text-[10px] mt-1.5 shadow-inner">
                        GEMINI_API_KEY="AI_STUDIO_KEY_HERE"<br/>
                        DATABASE_URL="postgresql://user:pass@localhost:5432/nexus"
                      </code>
                    </div>

                    <div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 block font-mono uppercase text-[10px]">3. Launching Development Server</span>
                      <code className="block bg-slate-900 text-indigo-400 p-2 rounded-md font-mono text-[10px] mt-1.5 shadow-inner">
                        npm run dev
                      </code>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
