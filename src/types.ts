export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerName: string;
  category: string;
  tags: string[];
  bannerUrl: string;
  capacity: number;
  registeredCount: number;
  status: 'Draft' | 'Published' | 'Completed';
  schedule: Session[];
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  speakerId: string;
  speakerName: string;
  startTime: string; // e.g. "10:00 AM"
  endTime: string;   // e.g. "11:00 AM"
  track: string;     // e.g. "AI & Machine Learning", "Design"
  location: string;  // e.g. "Hall A"
}

export interface Speaker {
  id: string;
  name: string;
  company: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  email: string;
}

export interface Attendee {
  id: string;
  name: string;
  company: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  industry: string;
  goals: string[];
  interests: string[];
  email: string;
}

export interface Connection {
  id: string;
  user: Attendee | Speaker;
  score: number;
  matchReason: string[];
  icebreaker: string;
  status: 'Suggested' | 'Pending' | 'Connected';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  hasLiked?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface AnalyticsStats {
  totalRegistrations: number;
  checkedIn: number;
  matchmakingConnections: number;
  activeAttendees: number;
  engagementRate: number;
  networkingSatisfaction: number;
  registrationTimeline: { date: string; registrations: number }[];
  categoryDistribution: { name: string; value: number }[];
  sessionAttendance: { name: string; count: number }[];
}
