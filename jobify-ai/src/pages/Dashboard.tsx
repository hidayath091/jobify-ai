import React, { useEffect } from 'react';
import { useJobStore } from '../store/useJobStore';
import StatsCard from '../components/dashboard/StatsCard';
import ApplicationChart from '../components/dashboard/ApplicationChart';
import { Briefcase, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

const Dashboard: React.FC = () => {
  const { jobs, fetchJobs, loading } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'Applied').length,
    interviews: jobs.filter(j => j.status === 'Interview').length,
    offers: jobs.filter(j => j.status === 'Offer').length,
    rejected: jobs.filter(j => j.status === 'Rejected').length,
  };

  // Mock data for chart - in a real app, this would be computed from job dates
  const chartData = [
    { name: 'Jan', applications: 4 },
    { name: 'Feb', applications: 7 },
    { name: 'Mar', applications: 5 },
    { name: 'Apr', applications: 12 },
    { name: 'May', applications: 8 },
    { name: 'Jun', applications: 15 },
  ];

  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Snapshot of your career progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Applications" 
          value={stats.total} 
          icon={Briefcase} 
          trend="12%" 
          trendUp={true} 
          color="indigo" 
        />
        <StatsCard 
          title="Interviews" 
          value={stats.interviews} 
          icon={Calendar} 
          trend="5%" 
          trendUp={true} 
          color="blue" 
        />
        <StatsCard 
          title="Offers Received" 
          value={stats.offers} 
          icon={CheckCircle} 
          trend="2%" 
          trendUp={true} 
          color="green" 
        />
        <StatsCard 
          title="Pending" 
          value={stats.applied} 
          icon={Clock} 
          trend="8%" 
          trendUp={false} 
          color="amber" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Application Trends</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <ApplicationChart data={chartData} />
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {jobs.slice(0, 5).map((job) => (
              <div key={job._id} className="flex gap-4">
                <div className="mt-1">
                  <div className={clsx(
                    "w-2 h-2 rounded-full",
                    job.status === 'Offer' ? 'bg-green-500' : 
                    job.status === 'Interview' ? 'bg-blue-500' :
                    job.status === 'Rejected' ? 'bg-red-500' : 'bg-slate-300'
                  )} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{job.company}</p>
                  <p className="text-xs text-slate-500">{job.role} • {job.status}</p>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400">No applications yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
