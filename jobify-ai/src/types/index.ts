export interface User {
  _id: string;
  name: string;
  email: string;
}

export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Pending';

export interface Job {
  _id: string;
  user: string;
  company: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
  notes?: string;
  aiMatchScore?: number;
  aiFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (jobData: Partial<Job>) => Promise<void>;
  updateJob: (id: string, jobData: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}
