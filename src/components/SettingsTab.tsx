import React, { useState } from "react";
import { Attendee } from "../types";
import { Sparkles, Sliders, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SettingsTabProps {
  currentUser: Attendee;
  onUpdateProfile: (updatedProfile: Attendee) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsTab({ currentUser, onUpdateProfile, isDarkMode, onToggleDarkMode }: SettingsTabProps) {
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [company, setCompany] = useState(currentUser.company);
  const [bio, setBio] = useState(currentUser.bio);
  
  const [skills, setSkills] = useState(currentUser.skills.join(", "));
  const [interests, setInterests] = useState(currentUser.interests.join(", "));
  const [goals, setGoals] = useState(currentUser.goals.join(", "));
  
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Attendee = {
      ...currentUser,
      name,
      role,
      company,
      bio,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      interests: interests.split(",").map((i) => i.trim()).filter(Boolean),
      goals: goals.split(",").map((g) => g.trim()).filter(Boolean)
    };
    onUpdateProfile(updated);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Toast notifications */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl border border-slate-700/30 flex items-center gap-2.5 shadow-lg animate-fade-in z-50">
          <CheckCircle2 className="text-emerald-500" size={16} />
          <span className="text-xs font-sans font-medium">Profile synced successfully with AI Matchmaking Engine!</span>
        </div>
      )}

      {/* Settings Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-6">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-sm font-semibold font-display text-slate-900 dark:text-white">Active Profile Alignment</h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5 leading-relaxed">
            Update your professional traits. The AI Matchmaking Engine immediately parses these tags to calculate dynamic networking synergy scores and icebreakers with candidates.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Job Role / Designation</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Affiliation / Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Professional Biography</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="A short sentence about what you build..."
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          {/* TRAITS CHIPS SETTERS */}
          <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Sparkles size={12} className="text-indigo-500" />
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Competency Skills (Comma Separated)</label>
              </div>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, TypeScript, Python, Vector Databases"
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Sparkles size={12} className="text-indigo-500" />
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Event Goals (Comma Separated)</label>
              </div>
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. Find team, Settle seed capital, Discuss product architectures"
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Sparkles size={12} className="text-indigo-500" />
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Domain Interests (Comma Separated)</label>
              </div>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Artificial Intelligence, Open Source, UI/UX"
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white px-5 py-2 rounded-xl font-semibold text-xs font-sans transition-all cursor-pointer shadow-sm"
            >
              Align AI Matching Traits
            </button>
          </div>

        </form>

      </div>

      {/* Visual System Settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold font-display text-slate-900 dark:text-white">Aesthetic theme configuration</h3>
            <p className="text-[11px] text-slate-500 font-sans mt-0.5">Toggle visual templates of Apple simplicity and Stripe polish.</p>
          </div>
          <button
            onClick={onToggleDarkMode}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-3 py-1.5 rounded-lg text-xs font-sans font-medium cursor-pointer"
          >
            Switch to {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-500">
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-semibold block text-slate-800 dark:text-slate-200">Light Slate Preset</span>
            <span>Generates soft whites, clean borders, high-contrast typography, and beautiful spacing.</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-semibold block text-slate-800 dark:text-slate-200">Dark Indigo Preset</span>
            <span>Establishes elegant slate dark frames, crisp indigo accents, and subtle borders.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
