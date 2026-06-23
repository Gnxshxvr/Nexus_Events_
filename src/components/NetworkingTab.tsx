import React, { useState } from "react";
import { Attendee, Connection } from "../types";
import { initialAttendees } from "../data";
import { Sparkles, BrainCircuit, Shield, Send, MessageSquare, ArrowRight, UserCheck, Loader2 } from "lucide-react";

interface NetworkingTabProps {
  currentUser: Attendee;
}

export default function NetworkingTab({ currentUser }: NetworkingTabProps) {
  const [candidates, setCandidates] = useState<Attendee[]>(
    initialAttendees.filter((a) => a.id !== currentUser.id)
  );
  
  // Connection lists state
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);
  
  // Scoring states
  const [calculatingId, setCalculatingId] = useState<string | null>(null);
  
  // Messaging overlay state
  const [isMessagingOpen, setIsMessagingOpen] = useState<boolean>(false);
  const [activeMessageText, setActiveMessageText] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<{ [key: string]: { sender: string; text: string }[] }>({});

  const handleRunMatchmaking = async (candidate: Attendee) => {
    setCalculatingId(candidate.id);
    try {
      const response = await fetch("/api/matchmaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile: currentUser,
          candidateProfile: candidate
        })
      });

      if (!response.ok) throw new Error("Matchmaking endpoint failure");
      const data = await response.json();

      const newConnection: Connection = {
        id: `conn-${candidate.id}`,
        user: candidate,
        score: data.score || 75,
        matchReason: data.matchReason || ["Complementary professional profiles"],
        icebreaker: data.icebreaker || `Hi ${candidate.name}, let's collaborate!`,
        status: "Suggested"
      };

      setConnections((prev) => {
        const filtered = prev.filter((c) => c.user.id !== candidate.id);
        return [...filtered, newConnection];
      });
      setActiveConnectionId(newConnection.id);
    } catch (err) {
      console.error(err);
      // Heuristic Fallback
      const overlappingSkills = currentUser.skills.filter((s) => candidate.skills.includes(s));
      const score = 60 + (overlappingSkills.length * 10);
      const newConnection: Connection = {
        id: `conn-${candidate.id}`,
        user: candidate,
        score: Math.min(score, 98),
        matchReason: [
          `Both operate in modern tech circles.`,
          `Overlapping competencies in: ${overlappingSkills.slice(0, 2).join(", ") || "software design"}.`
        ],
        icebreaker: `Hey ${candidate.name}! I saw we both build systems with similar goals. Let's sync!`,
        status: "Suggested"
      };
      setConnections((prev) => {
        const filtered = prev.filter((c) => c.user.id !== candidate.id);
        return [...filtered, newConnection];
      });
      setActiveConnectionId(newConnection.id);
    } finally {
      setCalculatingId(null);
    }
  };

  const handleOpenChat = (conn: Connection) => {
    if (!messageHistory[conn.id]) {
      // Seed first message with the generated icebreaker
      setMessageHistory((prev) => ({
        ...prev,
        [conn.id]: [{ sender: "system", text: `AI Icebreaker generated: "${conn.icebreaker}"` }]
      }));
    }
    setActiveConnectionId(conn.id);
    setIsMessagingOpen(true);
  };

  const handleSendMessage = (connId: string) => {
    if (!activeMessageText.trim()) return;
    const userMsg = activeMessageText.trim();
    setActiveMessageText("");

    setMessageHistory((prev) => ({
      ...prev,
      [connId]: [...(prev[connId] || []), { sender: "me", text: userMsg }]
    }));

    // Simulate quick response
    setTimeout(() => {
      setMessageHistory((prev) => ({
        ...prev,
        [connId]: [
          ...(prev[connId] || []),
          { sender: "them", text: "Thanks for reaching out! That sounds like an awesome opportunity. Let's find some time to sync during the next networking track coffee break." }
        ]
      }));
    }, 1000);
  };

  const activeConnection = connections.find((c) => c.id === activeConnectionId);

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-display font-semibold text-sm">
            <BrainCircuit size={18} />
            <span>AI Matchmaking Network</span>
          </div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-sans">
            Personalized Synergy Recommendations
          </h2>
          <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-xl">
            Banish generic hallway conversations. Nexus AI evaluates skills, roles, and project goals using Gemini 3.5-flash to present high-probability partners paired with optimized conversation starters.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-xl shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-150">
            <img src={currentUser.avatarUrl} alt="Me" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="text-xs font-sans">
            <span className="font-semibold block text-slate-800 dark:text-slate-200">{currentUser.name}</span>
            <span className="text-slate-500 text-[10px] block">{currentUser.role}</span>
          </div>
        </div>
      </div>

      {/* Main Networking Hub Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Candidates List Column */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">Available Attendees</h3>
          
          <div className="space-y-3">
            {candidates.map((cand) => {
              const matchedConn = connections.find((c) => c.user.id === cand.id);
              const isCalculating = calculatingId === cand.id;
              
              return (
                <div key={cand.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-150">
                      <img src={cand.avatarUrl} alt={cand.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white leading-tight">{cand.name}</h4>
                      <p className="text-[10px] text-slate-400 font-sans mt-0.5">{cand.role} at {cand.company}</p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1">
                    {cand.skills.slice(0, 3).map((sk) => (
                      <span key={sk} className="text-[9px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-500 border border-slate-150 dark:border-slate-800 px-1.5 py-0.5 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>

                  {/* Matchmaker Trigger Button */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {matchedConn ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                          {matchedConn.score}% Match
                        </span>
                        <button
                          onClick={() => {
                            setActiveConnectionId(matchedConn.id);
                            setIsMessagingOpen(false);
                          }}
                          className="text-[10px] font-medium text-slate-500 hover:text-slate-800 font-sans cursor-pointer"
                        >
                          View Specs
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-sans">Sync status: pending</span>
                    )}

                    <button
                      onClick={() => handleRunMatchmaking(cand)}
                      disabled={isCalculating}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 px-3 py-1 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {isCalculating ? <Loader2 className="animate-spin" size={11} /> : <BrainCircuit size={11} />}
                      <span>{isCalculating ? "Calculating..." : "Run AI Sync"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Connection Detailed Specifications View */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs min-h-[360px] flex flex-col justify-between">
          
          {activeConnection ? (
            <div className="space-y-6">
              
              {/* Header profile cards */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-150">
                    <img src={activeConnection.user.avatarUrl} alt={activeConnection.user.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white">{activeConnection.user.name}</h3>
                    <p className="text-xs text-slate-500 font-sans">{activeConnection.user.role} • {activeConnection.user.company}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-semibold font-display text-indigo-600 dark:text-indigo-400 block">{activeConnection.score}%</span>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Synergy Score</span>
                </div>
              </div>

              {/* Reasons list */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-display font-semibold text-slate-700 dark:text-slate-300">
                  <Sparkles className="text-indigo-500 animate-pulse" size={14} />
                  <span>AI Synergy Compatibility Reasons</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeConnection.matchReason.map((reason, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Icebreaker widget */}
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-950/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-wider font-semibold">Suggested Icebreaker</span>
                  <span className="text-[9px] font-sans text-slate-400">Context: Profile Alignment</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed italic">
                  "{activeConnection.icebreaker}"
                </p>
              </div>

              {/* Actions box */}
              <div className="pt-4 border-t border-slate-150 dark:border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => handleOpenChat(activeConnection)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-indigo-600/10"
                >
                  <MessageSquare size={14} />
                  <span>Initiate Chat Thread</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <BrainCircuit className="text-slate-300 dark:text-slate-800" size={42} />
              <h3 className="font-display font-semibold text-xs text-slate-500 uppercase tracking-wider">No Sync Selected</h3>
              <p className="text-xs text-slate-400 font-sans max-w-sm">
                Click on the "Run AI Sync" button beside any candidate attendee to let Gemini evaluate compatibility.
              </p>
            </div>
          )}

          {/* MESSAGING OVERLAY WITHIN SPECS BOX */}
          {isMessagingOpen && activeConnection && (
            <div className="mt-6 pt-5 border-t border-slate-150 dark:border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-indigo-500" />
                  <span>Chat Session with {activeConnection.user.name}</span>
                </span>
                <button
                  onClick={() => setIsMessagingOpen(false)}
                  className="text-[10px] font-mono text-slate-400 hover:text-slate-600"
                >
                  Collapse Thread
                </button>
              </div>

              {/* Chat timeline inside overlay */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 h-44 overflow-y-auto space-y-2">
                {(messageHistory[activeConnection.id] || []).map((msg, idx) => (
                  <div key={idx} className={`max-w-[85%] rounded-xl p-2.5 text-[11px] font-sans ${
                    msg.sender === "system" ? "mx-auto bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 text-center italic text-[10px] w-full" :
                    msg.sender === "me" ? "ml-auto bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" :
                    "mr-auto bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                  }`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Chat inputs inside overlay */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activeMessageText}
                  onChange={(e) => setActiveMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(activeConnection.id)}
                  placeholder="Type a message or use the suggested icebreaker..."
                  className="flex-1 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs font-sans text-slate-850 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden"
                />
                <button
                  onClick={() => handleSendMessage(activeConnection.id)}
                  className="bg-indigo-600 hover:bg-indigo-505 text-white px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
