
import React, { useState } from 'react';
import { MOCK_QUIZZES } from '../constants';
import { QuizStatus } from '../types';

const Schedule: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filteredQuizzes = MOCK_QUIZZES.filter(q => {
    if (filter === 'All') return true;
    if (filter === 'My Quizzes') return q.isUserIn;
    if (filter === 'Open Slots') return q.slotsOpen && q.status !== QuizStatus.FULL;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold tracking-tight">Quiz Schedule</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">filter_list</span>
            </button>
            <div className="size-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
              <img alt="User" className="w-full h-full object-cover" src="https://i.pravatar.cc/150?u=sarahlee" />
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-3 min-w-max">
            {['All Quizzes', 'My Quizzes', 'Open Slots'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95 ${
                  (filter === f || (filter === 'All' && f === 'All Quizzes'))
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {f === 'All Quizzes' ? 'calendar_view_day' : f === 'My Quizzes' ? 'person' : 'check_circle'}
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">{f}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4">
        {filteredQuizzes.map((quiz) => (
          <article 
            key={quiz.id} 
            className={`relative flex flex-col bg-white dark:bg-card-dark rounded-2xl p-4 shadow-sm border transition-all ${
              quiz.isUserIn 
                ? 'border-primary/30 ring-1 ring-primary/20 bg-primary/5' 
                : 'border-gray-100 dark:border-gray-800'
            }`}
          >
            {quiz.isUserIn && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-[9px] font-black px-2.5 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-widest">YOU'RE IN</div>
              </div>
            )}
            
            <div className="flex items-start gap-4">
              {/* Date Badge */}
              <div className={`shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl border ${
                quiz.isUserIn 
                  ? 'bg-primary/10 border-primary/20' 
                  : 'bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${quiz.isUserIn ? 'text-primary' : 'text-slate-500'}`}>{quiz.month}</span>
                <span className={`text-xl font-bold leading-none ${quiz.isUserIn ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{quiz.day}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{quiz.name}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{quiz.time}</span>
                      <span className="mx-0.5">•</span>
                      <span className="truncate">{quiz.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {quiz.slotsOpen ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 rounded-lg text-xs font-bold text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      {quiz.slotsOpen}
                    </div>
                  ) : quiz.isUserIn ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Confirmed
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-slate-400 italic">No slot info</div>
                  )}

                  {quiz.isUserIn ? (
                    <button className="flex items-center justify-center h-10 px-5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 text-sm font-bold rounded-xl transition-all active:scale-95 border border-red-200 dark:border-red-900/30">
                      Withdraw
                    </button>
                  ) : quiz.status === QuizStatus.FULL ? (
                    <button className="flex items-center justify-center h-10 px-5 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold rounded-xl cursor-not-allowed" disabled>
                      Full
                    </button>
                  ) : (
                    <button className="flex items-center justify-center h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="h-10"></div>
      </main>

      <div className="fixed bottom-24 right-4 z-40">
        <button className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 transition-transform hover:scale-110 active:scale-90">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Schedule;
