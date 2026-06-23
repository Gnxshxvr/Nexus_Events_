import React, { useState } from "react";
import { Post, Poll, Comment } from "../types";
import { initialPosts, initialPolls } from "../data";
import { MessageSquare, Heart, Send, Plus, BarChart2, CheckCircle2 } from "lucide-react";

export default function CommunityTab() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  
  // New Feed Input states
  const [newPostText, setNewPostText] = useState<string>("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");

  // New Poll creation states
  const [isPollCreatorOpen, setIsPollCreatorOpen] = useState<boolean>(false);
  const [pollQuestion, setPollQuestion] = useState<string>("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: "Ganesh Var",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
      content: newPostText.trim(),
      timestamp: "Just now",
      likes: 0,
      comments: []
    };

    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            likes: hasLiked ? p.likes + 1 : p.likes - 1,
            hasLiked
          };
        }
        return p;
      })
    );
  };

  const handleCreateComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      postId,
      authorName: "Ganesh Var",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
      content: newCommentText.trim(),
      timestamp: "Just now"
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
    setNewCommentText("");
    setActiveCommentPostId(null);
  };

  const handleVotePoll = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id === pollId) {
          if (p.userVotedOptionId === optionId) {
            // Undo vote
            return {
              ...p,
              totalVotes: p.totalVotes - 1,
              userVotedOptionId: undefined,
              options: p.options.map((o) => (o.id === optionId ? { ...o, votes: o.votes - 1 } : o))
            };
          } else {
            // Perform vote (re-routing if voted on another option)
            let updatedOptions = p.options.map((o) => {
              if (o.id === optionId) return { ...o, votes: o.votes + 1 };
              if (o.id === p.userVotedOptionId) return { ...o, votes: Math.max(o.votes - 1, 0) };
              return o;
            });
            const votesDiff = p.userVotedOptionId ? 0 : 1;
            return {
              ...p,
              totalVotes: p.totalVotes + votesDiff,
              userVotedOptionId: optionId,
              options: updatedOptions
            };
          }
        }
        return p;
      })
    );
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestion.trim() || pollOptions.some((o) => !o.trim())) return;

    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      question: pollQuestion.trim(),
      options: pollOptions.map((text, idx) => ({
        id: `opt-${idx}-${Date.now()}`,
        text: text.trim(),
        votes: 0
      })),
      totalVotes: 0
    };

    setPolls((prev) => [newPoll, ...prev]);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setIsPollCreatorOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Community Feed timeline Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Post Composition Field */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
          <form onSubmit={handleCreatePost} className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8.5 h-8.5 rounded-full overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=faces" alt="Avatar" />
              </div>
              <textarea
                rows={2}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What's happening on the hackathon ground? Share updates, milestones, or questions..."
                className="flex-1 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-sans text-slate-850 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 resize-none"
              />
            </div>
            
            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="bg-slate-950 hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 disabled:bg-slate-200 disabled:text-slate-400 text-white px-4 py-1.5 rounded-xl font-semibold text-xs font-sans transition-all cursor-pointer"
              >
                Broadcast Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts timeline */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs space-y-3">
              
              {/* Header metadata */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-slate-100">
                  <img src={post.authorAvatar} alt="Author" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold font-display text-slate-900 dark:text-white leading-tight">{post.authorName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{post.timestamp}</span>
                </div>
              </div>

              {/* Main Content */}
              <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Interaction Bars */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-sans">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer ${
                    post.hasLiked ? "text-red-500 font-semibold" : "text-slate-400"
                  }`}
                >
                  <Heart size={14} fill={post.hasLiked ? "currentColor" : "none"} />
                  <span>{post.likes} Likes</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>{post.comments.length} Comments</span>
                </button>
              </div>

              {/* Comments expander section */}
              {post.comments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-xl">
                  {post.comments.map((comm) => (
                    <div key={comm.id} className="flex gap-2.5 text-xs">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
                        <img src={comm.authorAvatar} alt="Commenter" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-0.5 font-sans leading-relaxed">
                        <div className="flex items-baseline justify-between">
                          <span className="font-semibold text-slate-900 dark:text-white">{comm.authorName}</span>
                          <span className="text-[9px] text-slate-400 font-mono">{comm.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">{comm.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Composition overlay */}
              {activeCommentPostId === post.id && (
                <form
                  onSubmit={(e) => handleCreateComment(e, post.id)}
                  className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 animate-fade-in"
                >
                  <input
                    type="text"
                    required
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment reply..."
                    className="flex-1 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  >
                    Reply
                  </button>
                </form>
              )}

            </div>
          ))}
        </div>

      </div>

      {/* Engagement Polls Sidebar Column */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Header and trigger */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-display font-semibold text-sm">
            <BarChart2 size={16} className="text-indigo-500" />
            <span>Interactive Polls</span>
          </div>
          <button
            onClick={() => setIsPollCreatorOpen(!isPollCreatorOpen)}
            className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-sans font-semibold cursor-pointer"
          >
            {isPollCreatorOpen ? "Cancel" : "Create Poll"}
          </button>
        </div>

        {/* Poll creation wizard */}
        {isPollCreatorOpen && (
          <form onSubmit={handleCreatePoll} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Question</span>
              <input
                type="text"
                required
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-1.5 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Options</span>
              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  required
                  value={opt}
                  onChange={(e) => {
                    const updated = [...pollOptions];
                    updated[idx] = e.target.value;
                    setPollOptions(updated);
                  }}
                  placeholder={`Option ${idx + 1}`}
                  className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-3.5 py-1.5 text-xs font-sans text-slate-800 dark:text-slate-200 focus:outline-hidden"
                />
              ))}

              <button
                type="button"
                onClick={() => setPollOptions((prev) => [...prev, ""])}
                className="text-[10px] text-indigo-500 font-sans hover:underline block font-medium"
              >
                + Add Option
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded-xl font-medium text-xs font-sans transition-all cursor-pointer shadow-xs"
            >
              Launch Live Poll
            </button>
          </form>
        )}

        {/* Live Polls display cards */}
        <div className="space-y-4">
          {polls.map((poll) => (
            <div key={poll.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-display font-semibold text-xs text-slate-800 dark:text-white leading-snug">
                  {poll.question}
                </h4>
                <span className="text-[9px] font-mono text-slate-400 font-medium">
                  {poll.totalVotes} Votes
                </span>
              </div>

              {/* Options lists with visual percentages */}
              <div className="space-y-2">
                {poll.options.map((opt) => {
                  const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                  const isVoted = poll.userVotedOptionId === opt.id;
                  
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVotePoll(poll.id, opt.id)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs font-sans relative overflow-hidden transition-all group flex items-center justify-between ${
                        isVoted
                          ? "border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-200"
                          : "border-slate-150 bg-slate-50/50 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800/40 dark:text-slate-300"
                      }`}
                    >
                      {/* Visual gauge bar behind content */}
                      <div
                        className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${
                          isVoted ? "bg-indigo-500/10" : "bg-slate-200/40 dark:bg-slate-800/40"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>

                      <div className="relative z-10 font-medium truncate max-w-[80%]">
                        {opt.text}
                      </div>

                      <div className="relative z-10 font-mono text-[10px] text-slate-500 group-hover:text-slate-800 flex items-center gap-1">
                        {isVoted && <CheckCircle2 size={11} className="text-indigo-600 shrink-0" />}
                        <span>{percentage}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
