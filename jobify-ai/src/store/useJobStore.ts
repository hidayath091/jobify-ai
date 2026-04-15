import { create } from 'zustand';
import { JobState, Job } from '../types';
import apiClient from '../api/apiClient';

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get<Job[]>('/jobs');
      set({ jobs: data, loading: false });
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Failed to fetch jobs';
      set({ error: message, loading: false });
    }
  },

  addJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post<Job>('/jobs', jobData);
      set({ jobs: [data, ...get().jobs], loading: false });
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Failed to add job';
      set({ error: message, loading: false });
      throw err;
    }
  },

  updateJob: async (id, jobData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.put<Job>(`/jobs/${id}`, jobData);
      set({
        jobs: get().jobs.map((job) => (job._id === id ? data : job)),
        loading: false,
      });
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Failed to update job';
      set({ error: message, loading: false });
      throw err;
    }
  },

  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/jobs/${id}`);
      set({
        jobs: get().jobs.filter((job) => job._id !== id),
        loading: false,
      });
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Failed to delete job';
      set({ error: message, loading: false });
    }
  },
}));
