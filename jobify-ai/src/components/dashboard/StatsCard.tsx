import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: 'blue' | 'green' | 'amber' | 'red' | 'indigo';
}

const colorMap = {
  blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800',
  green: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800',
  amber: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800',
  red: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800',
  indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800',
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, trendUp, color }) => {
  return (
    <div className="card p-6 flex items-center justify-between group hover:shadow-lg transition-all duration-300">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <p className={clsx(
            "text-xs font-semibold mt-2 flex items-center gap-1",
            trendUp ? "text-green-600" : "text-red-600"
          )}>
            {trendUp ? '↑' : '↓'} {trend}
            <span className="text-slate-400 font-normal ml-0.5">vs last month</span>
          </p>
        )}
      </div>
      <div className={clsx(
        "p-3 rounded-2xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
        colorMap[color]
      )}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatsCard;
