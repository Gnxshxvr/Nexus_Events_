# Nexus Events AI — The AI Operating System for Human Gathering

Nexus Events AI is an advanced, high-performance Event Intelligence Platform designed to eliminate coordination friction by up to 70%. Built from the ground up with high-contrast, beautiful UI layouts, clean typography pairings, and a server-side AI architecture, Nexus transforms static conferences into dynamic, self-optimizing networks.

---

## 🚀 Key Architectural Advantages

*   **Dynamic AI Agenda Planner**: Instantly structures multi-track events, workshop timings, and speaker assignments using contextual theme prompts powered by Gemini 3.5.
*   **Aura Matchmaking Network**: Computes compatibility scores based on participant skills, roles, and interests. Generates friendly, ready-to-send conversation icebreakers.
*   **Self-Contained Full-Stack Sandbox**: Uses a lightweight React + Vite + TypeScript frontend proxied securely by an Express + Node backend. This prevents API key exposure and protects user metrics.
*   **Linear & Stripe Aesthetics**: Clean borders, generous padding, fast page loads, glassmorphic headers, and optimized responsive viewport rules.

---

## 📂 Repository Structure

```bash
nexus-events-ai/
├── .env.example
├── .gitignore
├── Dockerfile                  # Production container definitions
├── docker-compose.yml          # Local multi-service orchestrator
├── package.json
├── server.ts                   # Secure Express API & Vite asset proxy
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types.ts                # Shared Types & Contracts
│   ├── data.ts                 # Initial Sandbox seed data
│   └── components/
│       ├── DashboardTab.tsx    # Creation Wizard & live track list
│       ├── AssistantTab.tsx    # Live Gemini 3.5 chat assistant
│       ├── NetworkingTab.tsx   # Aura Matchmaking & icebreakers
│       ├── CommunityTab.tsx    # Live posts, comments, & interactive polls
│       ├── AnalyticsTab.tsx    # Custom registration SVG graphs
│       ├── SettingsTab.tsx     # Trait settings & dark mode configs
│       └── SpecsTab.tsx        # High-fidelity project blueprints viewer
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions CI/CD blueprint
```

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
*   Node.js v18+ or Docker.
*   A Gemini API Key (obtainable from [Google AI Studio](https://aistudio.google.com)).

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/your-username/nexus-events-ai.git
cd nexus-events-ai
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and provide your secrets:
```bash
cp .env.example .env
```
Update your `.env` file:
```env
GEMINI_API_KEY="YOUR_ACTUAL_API_KEY"
APP_URL="http://localhost:3000"
```

### 3. Run Development Server
Boot both the frontend bundle and server middleware:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## ⚡ Production Deployment (CI/CD)

### Using Docker
You can compile and launch a release build of the application using Docker:
```bash
docker build -t nexus-events-ai .
docker run -p 3000:3000 --env-file .env nexus-events-ai
```

### GitHub Actions Workflow
The project includes a pre-configured workflow file at `.github/workflows/deploy.yml` which automates testing and deployment to cloud containers.

---

## 🧑‍💻 Technical Stack & Guidelines

*   **Framework**: React 19 / TypeScript
*   **Styling**: Tailwind CSS with Custom glassmorphism classes
*   **Icons**: Lucide React
*   **Orchestration**: Express Server with tsx and esbuild
*   **Intelligence**: Gemini 3.5-flash with lazy initialization schemas to guard safety.
