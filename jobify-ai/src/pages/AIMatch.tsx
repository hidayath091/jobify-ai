import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { Target, Loader2, FileText, Briefcase, Zap, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const AIMatch: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; suggestions: string } | null>(null);

  const getMatch = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);
    try {
      const { data } = await apiClient.post('/ai/match', { resumeText, jobDescription });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Job Matcher</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Check how well your resume matches a specific job post.</p>
        </div>
        {result && (
          <div className={clsx(
            "p-4 rounded-2xl flex flex-col items-center justify-center border-2 shadow-lg",
            result.score > 80 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
          )}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Match Score</span>
            <span className={clsx(
              "text-3xl font-black",
              result.score > 80 ? "text-green-600" : "text-amber-600"
            )}>{result.score}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card p-6 flex flex-col h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary-500" />
              <h3 className="font-bold">Resume Content</h3>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="flex-1 w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all resize-none text-sm"
              placeholder="Paste your resume content..."
            />
          </div>

          <div className="card p-6 flex flex-col h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold">Job Description</h3>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="flex-1 w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all resize-none text-sm"
              placeholder="Paste the job requirements..."
            />
          </div>

          <button
            onClick={getMatch}
            disabled={loading || !resumeText || !jobDescription}
            className="w-full btn btn-primary py-4 flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary-500/20"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <Target className="w-5 h-5" />
                Calculate Match Score
              </>
            )}
          </button>
        </div>

        <div className="card p-6 flex flex-col min-h-[600px] bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-lg">AI Optimization Strategy</h3>
          </div>
          
          {result ? (
            <div className="flex-1 space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex gap-3 mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-bold self-center">Improvement Gaps</h4>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                  {result.suggestions}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Status</p>
                  <p className="text-sm font-semibold text-green-600">Actionable</p>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Time to fix</p>
                  <p className="text-sm font-semibold">~15 mins</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
              <Target className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-4" />
              <p className="text-sm text-slate-400 max-w-[250px]">
                Compare your resume to the job description to get a tailoring strategy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMatch;
