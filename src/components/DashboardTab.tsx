import React, { useState } from "react";
import { Event, Session } from "../types";
import { Plus, Sparkles, Calendar, MapPin, Users, Clock, ArrowRight, CheckCircle2, ChevronRight, Loader2, Tag } from "lucide-react";

interface DashboardTabProps {
  events: Event[];
  onAddEvent: (newEvent: Event) => void;
}

export default function DashboardTab({ events, onAddEvent }: DashboardTabProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || "");
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  
  // Wizard Form Fields
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [location, setLocation] = useState<string>("Soma Innovation Hub, San Francisco");
  const [date, setDate] = useState<string>("June 28, 2026");
  const [capacity, setCapacity] = useState<number>(200);
  const [selectedTracks, setSelectedTracks] = useState<string[]>(["AI & Machine Learning", "Design & Frontend"]);
  
  // AI schedule generator loading states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedSessions, setGeneratedSessions] = useState<Session[]>([]);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleAIScheduleBuilder = async () => {
    if (!theme.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTheme: theme,
          attendeeCount: capacity,
          tracks: selectedTracks
        })
      });

      if (!response.ok) throw new Error("Failed to generate schedules");
      const data = await response.json();
      setGeneratedSessions(data.sessions || []);
    } catch (err) {
      console.error(err);
      // Hard fallback schedules if server fails
      setGeneratedSessions([
        {
          id: "gen-f1",
          eventId: "evt-temp",
          title: `Keynote: Architecting the ${theme} Ecosystem`,
          description: "An opening deep-dive into scalable multi-agent systems and real-time prompt optimization.",
          speakerId: "spk-1",
          speakerName: "Dr. Elena Vance",
          startTime: "09:30 AM",
          endTime: "10:30 AM",
          track: selectedTracks[0] || "General",
          location: "Stage Alpha"
        },
        {
          id: "gen-f2",
          eventId: "evt-temp",
          title: `Technical Panel: Scaling ${theme} Globally`,
          description: "Overcoming physical cloud bottlenecks and engineering robust API gateways for modern users.",
          speakerId: "spk-3",
          speakerName: "Sarah Chen",
          startTime: "11:00 AM",
          endTime: "12:00 PM",
          track: selectedTracks[1] || "General",
          location: "Stage Beta"
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      title,
      description,
      date,
      time: "09:00 AM - 05:00 PM",
      location,
      organizerName: "My Team",
      category: "Conference",
      tags: selectedTracks.concat(["AI"]),
      bannerUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80",
      capacity,
      registeredCount: 1,
      status: "Published",
      schedule: generatedSessions.length > 0 ? generatedSessions : [
        {
          id: `s-${Date.now()}`,
          eventId: `evt-${Date.now()}`,
          title: "Opening Keynote & Setup Guide",
          description: "Orientation keynote for all active registered participants.",
          speakerId: "spk-3",
          speakerName: "Sarah Chen",
          startTime: "09:30 AM",
          endTime: "10:30 AM",
          track: "General",
          location: "Main Stage"
        }
      ]
    };

    onAddEvent(newEvent);
    setSelectedEventId(newEvent.id);
    setIsWizardOpen(false);
    
    // Reset form
    setTitle("");
    setDescription("");
    setTheme("");
    setGeneratedSessions([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Sleek Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Registrations", value: "342", change: "+14% from yesterday", color: "text-indigo-600" },
          { label: "Checked-In Attendees", value: "218", change: "64% check-in rate", color: "text-emerald-600" },
          { label: "AI Matchmaking Pairs", value: "184", change: "92% successful matches", color: "text-purple-600" },
          { label: "Community Engagement", value: "88%", change: "+5% engagement rate", color: "text-amber-600" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
            <span className="text-xs text-slate-500 font-sans block">{stat.label}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-semibold font-display ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] text-slate-400 font-mono">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Events selection column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-display font-semibold text-sm">Target Events</h3>
            <button
              onClick={() => setIsWizardOpen(true)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer shadow-sm shadow-indigo-600/10"
            >
              <Plus size={14} />
              <span>Create Event</span>
            </button>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedEventId === evt.id
                    ? "border-slate-950 bg-slate-50 dark:border-white dark:bg-slate-950"
                    : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-sm font-semibold tracking-wider">
                    {evt.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{evt.date}</span>
                </div>
                <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white leading-tight">
                  {evt.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-[10px] font-sans text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users size={11} />
                    <span>{evt.registeredCount} Registered</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    <span className="truncate max-w-[120px]">{evt.location}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Event Details Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          
          {/* Header Banner */}
          <div className="relative h-40 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <img
              src={selectedEvent.bannerUrl}
              alt="Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                Event Overview Panel
              </span>
              <h2 className="text-lg md:text-xl font-display font-semibold text-white tracking-tight mt-1">
                {selectedEvent.title}
              </h2>
            </div>
          </div>

          {/* Details Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="text-indigo-500 shrink-0" size={16} />
              <div>
                <span className="font-mono text-[9px] block text-slate-400 uppercase">Date & Schedule</span>
                <span className="font-medium">{selectedEvent.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPin className="text-indigo-500 shrink-0" size={16} />
              <div>
                <span className="font-mono text-[9px] block text-slate-400 uppercase">Venue Location</span>
                <span className="font-medium truncate max-w-[180px] block">{selectedEvent.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Users className="text-indigo-500 shrink-0" size={16} />
              <div>
                <span className="font-mono text-[9px] block text-slate-400 uppercase">Event Capacity</span>
                <span className="font-medium">{selectedEvent.registeredCount} / {selectedEvent.capacity} Attendees</span>
              </div>
            </div>
          </div>

          {/* Event description */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">About the Event</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed mt-2">
              {selectedEvent.description}
            </p>
          </div>

          {/* Sessions schedule agenda list */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">Smart Agenda Tracks</h3>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-full">
                {selectedEvent.schedule.length} Sessions Auto-Routed
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {selectedEvent.schedule.map((session, idx) => (
                <div key={session.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-400">{session.startTime} - {session.endTime}</span>
                      <span className="text-[9px] font-mono bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 px-2 py-0.5 rounded">
                        {session.track}
                      </span>
                      <span className="text-[9px] font-mono bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 px-2 py-0.5 rounded">
                        {session.location}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white">
                      {session.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans line-clamp-1 leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 border-l border-slate-200 dark:border-slate-800 pl-4 shrink-0 md:w-36">
                    <div className="w-7 h-7 bg-indigo-50 dark:bg-indigo-950 rounded-full flex items-center justify-center font-display font-semibold text-[11px] text-indigo-700 dark:text-indigo-400 shrink-0">
                      {session.speakerName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Speaker</span>
                      <span className="text-[10px] font-sans font-medium text-slate-700 dark:text-slate-300 block leading-tight truncate max-w-[100px]">{session.speakerName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* EVENT CREATION WIZARD MODAL */}
      {isWizardOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles size={18} />
                <h3 className="font-display font-semibold text-sm">Event Creation Wizard (AI-Powered)</h3>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-mono select-none"
              >
                Close
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSubmitEvent} className="p-6 overflow-y-auto space-y-4 flex-1">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Event Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. SF Generative AI Hackathon"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Date</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. June 28, 2026"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">About Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the target audience, grants, or challenge specifications..."
                  className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 resize-none"
                />
              </div>

              {/* AI AGENDA SCHEDULER WIDGET */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-950/60 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-display font-semibold text-indigo-700 dark:text-indigo-400">
                    <Sparkles size={14} />
                    <span>AI Agenda Schedule Builder</span>
                  </div>
                  <span className="text-[9px] font-mono text-indigo-400 uppercase">Powered by Gemini 3.5</span>
                </div>
                
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Struggle with track planning? Input a core theme. Nexus will draft high-caliber agenda sessions with topics, credible speakers, and room routing instantly.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Input Theme (e.g. Web3, DeFi, Cybersecurity, Agentic UX)"
                    className="flex-1 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl px-3.5 py-1.5 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAIScheduleBuilder}
                    disabled={isGenerating || !theme.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white px-3 py-1.5 rounded-xl font-medium text-xs font-sans flex items-center gap-1 transition-all cursor-pointer shrink-0"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                    <span>{isGenerating ? "Drafting..." : "Let AI Build"}</span>
                  </button>
                </div>

                {/* Generated Preview */}
                {generatedSessions.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-indigo-100 dark:border-indigo-950/60">
                    <span className="text-[10px] font-mono text-indigo-500 font-semibold uppercase tracking-wider block">Drafted Track Sessions Preview:</span>
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {generatedSessions.map((s, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span>{s.startTime} - {s.endTime}</span>
                            <span>{s.location}</span>
                          </div>
                          <h5 className="font-display font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{s.title}</h5>
                          <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">Speaker: <span className="font-medium">{s.speakerName}</span> ({s.track})</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsWizardOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-sans hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer shadow-sm"
                >
                  Publish MVP Event
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
