import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useJobStore } from '../store/useJobStore';
import { Job, JobStatus } from '../types';
import KanbanColumn from '../components/kanban/KanbanColumn';
import JobCard from '../components/kanban/JobCard';
import JobModal from '../components/kanban/JobModal';
import { Plus, Search, Filter } from 'lucide-react';

const COLUMNS: { id: JobStatus; title: string }[] = [
  { id: 'Pending', title: 'Pending' },
  { id: 'Applied', title: 'Applied' },
  { id: 'Interview', title: 'Interview' },
  { id: 'Offer', title: 'Offer' },
  { id: 'Rejected', title: 'Rejected' },
];

const Board: React.FC = () => {
  const { jobs, fetchJobs, updateJob } = useJobStore();
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [initialStatus, setInitialStatus] = useState<JobStatus>('Pending');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredJobs = jobs.filter(job => 
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const job = jobs.find((j) => j._id === active.id);
    if (job) setActiveJob(job);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Check if dragging over a column or another card
    const isActiveAJob = jobs.some(j => j._id === activeId);
    const isOverAJob = jobs.some(j => j._id === overId);
    const isOverAColumn = COLUMNS.some(c => c.id === overId);

    if (isActiveAJob && isOverAColumn) {
      const activeJob = jobs.find(j => j._id === activeId);
      if (activeJob && activeJob.status !== overId) {
        // We handle the actual update in handleDragEnd to avoid too many API calls
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const jobId = active.id as string;
    const overId = over.id as string;

    const activeJob = jobs.find(j => j._id === jobId);
    if (!activeJob) return;

    // Determine the new status
    let newStatus: JobStatus = activeJob.status;
    
    // If over a column
    if (COLUMNS.some(c => c.id === overId)) {
      newStatus = overId as JobStatus;
    } else {
      // If over another card
      const overJob = jobs.find(j => j._id === overId);
      if (overJob) {
        newStatus = overJob.status;
      }
    }

    if (newStatus !== activeJob.status) {
      await updateJob(jobId, { status: newStatus });
    }
  };

  const openAddModal = (status: JobStatus = 'Pending') => {
    setSelectedJob(null);
    setInitialStatus(status);
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">App Board</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Visualize and manage your applications.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 w-full sm:w-64 transition-all"
            />
          </div>
          <button 
            onClick={() => openAddModal()}
            className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Application
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              jobs={filteredJobs.filter((job) => job.status === column.id)}
              onAddClick={openAddModal}
              onJobClick={openEditModal}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeJob ? (
            <JobCard job={activeJob} onClick={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <JobModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        initialStatus={initialStatus}
      />
    </div>
  );
};

export default Board;
