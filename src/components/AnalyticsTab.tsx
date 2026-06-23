import React, { useState } from "react";
import { initialAnalytics } from "../data";
import { TrendingUp, Award, BarChart3, PieChart, Users, Calendar, ArrowUpRight } from "lucide-react";

export default function AnalyticsTab() {
  const [stats, setStats] = useState(initialAnalytics);

  // SVG dimensions for the registration line chart
  const padding = 40;
  const chartHeight = 160;
  const chartWidth = 500;

  // Max value for line chart scaling
  const maxRegs = Math.max(...stats.registrationTimeline.map((r) => r.registrations)) * 1.1;
  const dataPointsCount = stats.registrationTimeline.length;

  // Compute SVG line path points
  const points = stats.registrationTimeline.map((pt, idx) => {
    const x = padding + (idx * (chartWidth - padding * 2)) / (dataPointsCount - 1);
    const y = chartHeight - padding - (pt.registrations * (chartHeight - padding * 2)) / maxRegs;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="space-y-6">
      
      {/* Sleek top statistics grids */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Registrations", value: stats.totalRegistrations, desc: "+14% from last week", icon: Users, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20" },
          { label: "Check-in Count", value: stats.checkedIn, desc: `${Math.round((stats.checkedIn / stats.totalRegistrations) * 100)}% attendance rate`, icon: Calendar, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" },
          { label: "Matchmaking Connections", value: stats.matchmakingConnections, desc: `${stats.networkingSatisfaction}% satisfaction index`, icon: Award, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20" },
          { label: "Active Engagement", value: `${stats.engagementRate}%`, desc: "Avg. 3 sessions/attendee", icon: TrendingUp, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20" }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-sans block">{item.label}</span>
                <span className="text-xl font-semibold font-display text-slate-900 dark:text-white block">{item.value}</span>
                <span className="text-[10px] text-slate-400 font-mono block">{item.desc}</span>
              </div>
              <div className={`p-2 rounded-xl ${item.color} shrink-0`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts bento layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration Timeline Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-display font-semibold text-sm">
              <TrendingUp size={16} className="text-indigo-500" />
              <span>Registration Timeline (Daily Growth)</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-500 font-semibold bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
              <span>Sync Live</span>
              <ArrowUpRight size={10} />
            </span>
          </div>

          {/* SVG Line Chart Render */}
          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto text-indigo-600 dark:text-indigo-400" fill="none">
              {/* Background horizontal lines */}
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="rgba(156, 163, 175, 0.15)" strokeWidth="1" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="rgba(156, 163, 175, 0.08)" strokeWidth="1" strokeDasharray="4" />
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="rgba(156, 163, 175, 0.08)" strokeWidth="1" strokeDasharray="4" />

              {/* Registration Gradient Fill Area */}
              <path
                d={`M ${padding},${chartHeight - padding} L ${points} L ${chartWidth - padding},${chartHeight - padding} Z`}
                fill="url(#grad-line)"
                opacity="0.1"
              />

              {/* SVG Line path */}
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points nodes */}
              {stats.registrationTimeline.map((pt, idx) => {
                const x = padding + (idx * (chartWidth - padding * 2)) / (dataPointsCount - 1);
                const y = chartHeight - padding - (pt.registrations * (chartHeight - padding * 2)) / maxRegs;
                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle cx={x} cy={y} r="4" fill="currentColor" stroke="white" strokeWidth="1.5" />
                  </g>
                );
              })}

              {/* Gradients declarations */}
              <defs>
                <linearGradient id="grad-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* X Axis labels */}
          <div className="flex justify-between px-6 text-[10px] font-mono text-slate-400">
            {stats.registrationTimeline.map((pt, idx) => (
              <span key={idx}>{pt.date.split(" ")[1]}</span>
            ))}
          </div>
        </div>

        {/* Category distribution Pie/Grid representation */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-display font-semibold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
            <PieChart size={16} className="text-indigo-500" />
            <span>Attendee Demographics</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {stats.categoryDistribution.map((cat, idx) => {
              const bgColors = ["bg-indigo-600", "bg-emerald-500", "bg-purple-500", "bg-amber-500"];
              const bg = bgColors[idx % bgColors.length];
              return (
                <div key={cat.name} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-sans">
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded ${bg} shrink-0`}></span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="font-mono font-semibold">{cat.value}%</span>
                  </div>
                  {/* Custom progress gauge bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className={`${bg} h-full rounded-full`} style={{ width: `${cat.value}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Session attendance bar grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-display font-semibold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
          <BarChart3 size={16} className="text-indigo-500" />
          <span>Real-Time Track Session Check-ins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {stats.sessionAttendance.map((sess) => {
            const pct = Math.round((sess.count / stats.checkedIn) * 100);
            return (
              <div key={sess.name} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Live Session Metrics</span>
                <h4 className="font-display font-semibold text-xs text-slate-800 dark:text-white truncate">{sess.name}</h4>
                
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg font-semibold font-mono text-slate-900 dark:text-white">{sess.count}</span>
                  <span className="text-[10px] text-slate-400 font-sans">Checked in ({pct}%)</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-850 h-1 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
