import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, MessageSquare, Bot, HelpCircle, Loader2 } from "lucide-react";

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AssistantTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I am your **Nexus Events AI Assistant**. I can help you build schedules, find matchmaking partners, write icebreakers, coordinate volunteers, or brainstorm marketing strategies. How can I help you succeed at your event today?"
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Draft an opening keynote outline for a Web3 & AI hackathon",
    "How does the AI Matchmaking calculate its score?",
    "Give me 3 icebreakers for developers meeting seed investors",
    "Write a broadcast announcement for teams searching for designers"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact Gemini endpoint");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'model', content: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: "Sorry, I encountered an issue reaching the server. Please ensure your Express backend is running and Gemini API secrets are configured correctly."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
      
      {/* Sidebar Suggestions */}
      <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-display font-semibold text-sm">
            <Sparkles size={18} />
            <span>AI Quick Commands</span>
          </div>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            Unleash automated reasoning. Click any suggested command below to prompt the AI event agent:
          </p>
          <div className="space-y-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-sans text-slate-700 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono space-y-1">
          <p>Model: gemini-3.5-flash</p>
          <p>Context: Nexus Event Context Engine</p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold font-display text-slate-900 dark:text-white">Nexus Events Intelligence Agent</h3>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono uppercase font-semibold tracking-wider">● Online & Guarded</p>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div key={idx} className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white ${
                  isUser ? "bg-slate-800" : "bg-indigo-600"
                }`}>
                  {isUser ? <User size={15} /> : <Bot size={15} />}
                </div>
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                  isUser
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-200"
                }`}>
                  <p className="whitespace-pre-line">{m.content}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white bg-indigo-600">
                <Bot size={15} />
              </div>
              <div className="p-3.5 rounded-2xl text-xs bg-slate-100 text-slate-500 dark:bg-slate-950 dark:text-slate-400 flex items-center gap-2 font-sans">
                <Loader2 className="animate-spin text-indigo-500" size={14} />
                <span>AI Agent is drafting an optimized response...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 border-t border-slate-150 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask anything about scheduling, attendee engagement, matchmaking..."
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-sans text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white px-4 py-2.5 rounded-xl font-medium text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>

      </div>
    </div>
  );
}
