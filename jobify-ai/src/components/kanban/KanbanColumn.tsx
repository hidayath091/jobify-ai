import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Job, JobStatus } from '../../types';
import JobCard from './JobCard';
import { Plus, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

interface KanbanColumnProps {
  id: JobStatus;
  title: string;
  jobs: Job[];
  onAddClick: (status: JobStatus) => void;
  onJobClick: (job: Job) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, jobs, onAddClick, onJobClick }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col w-full min-w-[300px] h-full bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm tracking-tight">{title}</h3>
          <span className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-bold text-slate-500">
            {jobs.length}
          </span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => onAddClick(id)}
            className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-slate-500" />
          </button>
          <button className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 p-3 overflow-y-auto"
      >
        <SortableContext items={jobs.map(j => j._id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onClick={onJobClick} />
          ))}
        </SortableContext>
        
        {jobs.length === 0 && (
          <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center">
            <p className="text-xs text-slate-400">No jobs yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
