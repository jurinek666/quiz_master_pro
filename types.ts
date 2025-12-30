
export enum QuizStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  FULL = 'FULL',
}

export interface QuizEvent {
  id: string;
  name: string;
  venue: string;
  date: string;
  month: string;
  day: string;
  time: string;
  theme: string;
  status: QuizStatus;
  slotsOpen?: string;
  isUserIn?: boolean;
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'Available' | 'Away' | 'Active';
  isMe?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'message' | 'system';
  unread: boolean;
  avatar?: string;
}
