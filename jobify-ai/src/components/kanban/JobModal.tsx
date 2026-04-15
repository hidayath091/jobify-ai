import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Job, JobStatus } from '../../types';
import { X, Loader2, Trash2 } from 'lucide-react';
import { useJobStore } from '../../store/useJobStore';

const jobSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['Applied', 'Interview', 'Offer', 'Rejected', 'Pending']),
  dateApplied: z.string(),
  notes: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobModalProps {
  job?: Job | null;
  initialStatus?: JobStatus;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ job, initialStatus, isOpen, onClose }) => {
  const { addJob, updateJob, deleteJob, loading } = useJobStore();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      status: initialStatus || 'Pending',
      dateApplied: new Date().toISOString().split('T')[0],
    }
  });

  useEffect(() => {
    if (job) {
      reset({
        company: job.company,
        role: job.role,
        status: job.status,
        dateApplied: new Date(job.dateApplied).toISOString().split('T')[0],
        notes: job.notes || '',
      });
    } else {
      reset({
        status: initialStatus || 'Pending',
        dateApplied: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }
  }, [job, initialStatus, reset]);

  const onSubmit = async (data: JobFormData) => {
    try {
      if (job) {
        await updateJob(job._id, data);
      } else {
        await addJob(data);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (job && window.confirm('Are you sure you want to delete this application?')) {
      await deleteJob(job._id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">{job ? 'Edit Application' : 'Add Application'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Company</label>
              <input 
                {...register('company')}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                placeholder="Google, Meta, etc."
              />
              {errors.company && <p className="text-[10px] text-red-500 ml-1">{errors.company.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Role</label>
              <input 
                {...register('role')}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                placeholder="Software Engineer"
              />
              {errors.role && <p className="text-[10px] text-red-500 ml-1">{errors.role.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Status</label>
              <select 
                {...register('status')}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Date Applied</label>
              <input 
                {...register('dateApplied')}
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Notes</label>
            <textarea 
              {...register('notes')}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all resize-none"
              placeholder="Talked to recruiter, technical interview next week..."
            />
          </div>

          <div className="pt-4 flex gap-3">
            {job && (
              <button
                type="button"
                onClick={handleDelete}
                className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors border border-transparent hover:border-red-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              disabled={loading}
              type="submit"
              className="flex-1 btn btn-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (job ? 'Update' : 'Add Application')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
