import { create } from 'zustand';
import { AuthState, User } from '../types';
import apiClient from '../api/apiClient';

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post<User>('/auth/login', credentials);
      set({ user: data, loading: false });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Login failed';
      set({ error: message, loading: false });
      throw err;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post<User>('/auth/register', userData);
      set({ user: data, loading: false });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Registration failed';
      set({ error: message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
      set({ user: null });
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await apiClient.get<User>('/auth/profile');
      set({ user: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      set({ user: null });
      localStorage.removeItem('user');
    }
  },
}));
