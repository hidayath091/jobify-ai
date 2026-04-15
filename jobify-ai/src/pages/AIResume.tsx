import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { Sparkles, Loader2, Send, FileText, CheckCircle2 } from 'lucide-react';

const AIResume: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const getFeedback = async () => {
    if (!resumeText) return;
    setLoading(true);
    try {
      const { data } = await apiClient.post('/ai/resume-feedback', { resumeText });
      setFeedback(data.feedback);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Resume Review</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Get instant, actionable feedback on your resume content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6 flex flex-col h-[600px]">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary-500" />
            <h3 className="font-bold">Paste Resume Content</h3>
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="flex-1 w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all resize-none text-sm"
            placeholder="Experience, Skills, Project details..."
          />
          <button
            onClick={getFeedback}
            disabled={loading || !resumeText}
            className="mt-4 btn btn-primary py-3 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Resume
              </>
            )}
          </button>
        </div>

        <div className="card p-6 flex flex-col h-[600px] bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold">AI Feedback</h3>
          </div>
          
          {feedback ? (
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 rounded-2xl">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {feedback}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm text-slate-400 max-w-[200px]">
                Enter your resume content on the left to see AI suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResume;
