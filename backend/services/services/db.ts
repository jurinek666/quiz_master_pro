
import { QuizEvent, TeamMember, Notification } from '../types';
import { MOCK_QUIZZES, TEAM_MEMBERS, NOTIFICATIONS } from '../constants';

// Default to localhost for development
const API_BASE_URL = 'http://localhost:3001/api';

export class RenderDatabase {
  /**
   * Generic request wrapper with fallback to mock data on failure.
   */
  private static async request<T>(endpoint: string, fallback: T, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`Backend unavailable at ${endpoint}. using mock data.`, error);
      return fallback;
    }
  }

  static async getQuizzes(): Promise<QuizEvent[]> {
    return this.request<QuizEvent[]>('/quizzes', MOCK_QUIZZES);
  }

  static async getTeam(): Promise<TeamMember[]> {
    return this.request<TeamMember[]>('/team', TEAM_MEMBERS);
  }

  static async getNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>('/notifications', NOTIFICATIONS);
  }

  static async toggleQuizAttendance(quizId: string): Promise<QuizEvent[]> {
    // Optimistic update for fallback scenario
    const updatedMock = MOCK_QUIZZES.map(q => 
      q.id === quizId ? { ...q, isUserIn: !q.isUserIn } : q
    );
    return this.request<QuizEvent[]>(`/quizzes/${quizId}/attendance`, updatedMock, {
      method: 'POST',
    });
  }

  static async updateUserProfile(userData: Partial<TeamMember>): Promise<TeamMember> {
    const me = TEAM_MEMBERS.find(m => m.isMe);
    const fallback = me ? { ...me, ...userData } : TEAM_MEMBERS[0];
    
    return this.request<TeamMember>('/user/profile', fallback, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  }
}
