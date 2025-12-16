import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-f627ddd3`;

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Use access token if available, otherwise use anon key
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data.error || 'Unknown error', 'Status:', response.status);
      throw new Error(data.error || 'API call failed');
    }

    return data;
  } catch (error: any) {
    console.error('API Call Failed:', endpoint, error.message);
    throw error;
  }
}

// Auth API
export const auth = {
  signup: async (email: string, password: string, name: string, username: string) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, username }),
    });
  },

  signin: async (email: string, password: string) => {
    const data = await apiCall('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store access token
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.user.id);
    }
    
    return data;
  },

  signout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  },

  getToken: () => {
    return localStorage.getItem('accessToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};

// User API
export const user = {
  getProfile: async () => {
    // Check if user is authenticated
    if (!auth.isAuthenticated()) {
      // Return demo data for demo users
      return {
        profile: {
          id: 'demo-user-id',
          email: 'demo@gamebalance.com',
          name: 'Demo User',
          username: 'demo_user',
          phone: '',
          birthdate: '',
        },
        settings: {
          dailyLimit: 120,
          weeklyLimit: 840,
          breakReminder: true,
          limitWarning: true,
          sound: true,
          nightMode: true,
          vibration: true,
        }
      };
    }
    
    return apiCall('/user/profile');
  },

  updateProfile: async (updates: any) => {
    // Check if user is authenticated
    if (!auth.isAuthenticated()) {
      console.log('Demo mode: Profile changes not saved');
      return { success: true, message: 'Demo mode: Changes not saved' };
    }
    
    return apiCall('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  updateSettings: async (settings: any) => {
    // Check if user is authenticated
    if (!auth.isAuthenticated()) {
      console.log('Demo mode: Settings changes not saved');
      // Save to localStorage for demo mode
      localStorage.setItem('demoSettings', JSON.stringify(settings));
      return { success: true };
    }
    
    return apiCall('/user/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// Session API
export const session = {
  start: async (gameName: string, gameIcon: string, gameColor: string) => {
    if (!auth.isAuthenticated()) {
      console.log('Demo mode: Session not saved');
      return { success: true, sessionId: 'demo-session-' + Date.now() };
    }
    
    return apiCall('/session/start', {
      method: 'POST',
      body: JSON.stringify({ gameName, gameIcon, gameColor }),
    });
  },

  end: async (duration: number) => {
    if (!auth.isAuthenticated()) {
      console.log('Demo mode: Session not saved');
      return { success: true };
    }
    
    return apiCall('/session/end', {
      method: 'POST',
      body: JSON.stringify({ duration }),
    });
  },

  getSessions: async () => {
    if (!auth.isAuthenticated()) {
      return { sessions: [] };
    }
    
    return apiCall('/sessions');
  },
};

// Stats API
export const stats = {
  get: async () => {
    if (!auth.isAuthenticated()) {
      return {
        todayMinutes: 45,
        weeklyTotal: 315,
        dailyData: {},
        totalSessions: 2,
      };
    }
    
    return apiCall('/stats');
  },
};