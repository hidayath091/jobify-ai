import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Job } from '../../types';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: job._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(job)}
      className={clsx(
        "card p-4 cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary-500/20 transition-all select-none mb-3",
        isDragging && "scale-105 shadow-2xl ring-2 ring-primary-500 z-50"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-sm line-clamp-1">{job.company}</h4>
        {job.aiMatchScore && (
          <span className={clsx(
            "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
            job.aiMatchScore > 80 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
          )}>
            {job.aiMatchScore}% Match
          </span>
        )}
      </div>
      
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-1">{job.role}</p>

      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(job.dateApplied).toLocaleDateString()}</span>
        </div>
        {job.notes && (
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Notes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
