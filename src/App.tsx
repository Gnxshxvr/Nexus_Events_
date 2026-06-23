import React, { useState, useEffect } from "react";
import { Event, Attendee } from "./types";
import { initialEvents, initialAttendees } from "./data";
import DashboardTab from "./components/DashboardTab";
import AssistantTab from "./components/AssistantTab";
import NetworkingTab from "./components/NetworkingTab";
import CommunityTab from "./components/CommunityTab";
import AnalyticsTab from "./components/AnalyticsTab";
import SettingsTab from "./components/SettingsTab";
import SpecsTab from "./components/SpecsTab";
import { Sparkles, Calendar, MessageSquare, BrainCircuit, Users, BarChart3, Sliders, BookOpen, Sun, Moon } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentUser, setCurrentUser] = useState<Attendee>(initialAttendees[0]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Set up theme toggler effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleAddEvent = (newEvent: Event) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateProfile = (updated: Attendee) => {
    setCurrentUser(updated);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "assistant", label: "AI Assistant", icon: MessageSquare },
    { id: "networking", label: "AI Matchmaking", icon: BrainCircuit },
    { id: "community", label: "Community", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "specs", label: "Specifications", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans pb-12">
      
      {/* Top Navigation Rail */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="font-display font-semibold text-sm tracking-tight text-slate-900 dark:text-white uppercase">Nexus Events</span>
              <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 block -mt-1 font-bold">OPERATING SYSTEM</span>
            </div>
          </div>

          {/* Tab Selection */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls (Theme switch) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 cursor-pointer transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            
            {/* Simple Mobile Menu Trigger */}
            <div className="md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-xs font-medium rounded-xl px-3 py-1.5 focus:outline-hidden"
              >
                {navItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-6">
          
          {/* Dashboard Tab Router */}
          {activeTab === "dashboard" && (
            <DashboardTab events={events} onAddEvent={handleAddEvent} />
          )}

          {/* AI Assistant Chat Router */}
          {activeTab === "assistant" && (
            <AssistantTab />
          )}

          {/* Networking Matchmaker Router */}
          {activeTab === "networking" && (
            <NetworkingTab currentUser={currentUser} />
          )}

          {/* Community Forums Router */}
          {activeTab === "community" && (
            <CommunityTab />
          )}

          {/* Analytics Dashboard Router */}
          {activeTab === "analytics" && (
            <AnalyticsTab />
          )}

          {/* Exhaustive Specifications Router */}
          {activeTab === "specs" && (
            <SpecsTab />
          )}

          {/* Profile & Sandbox Settings Router */}
          {activeTab === "settings" && (
            <SettingsTab
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
          )}

        </div>
      </main>

    </div>
  );
}
