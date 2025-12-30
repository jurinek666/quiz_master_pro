
import React, { useState, useEffect } from 'react';
import { RenderDatabase } from '../services/db';
import { QuizEvent, QuizStatus } from '../types';

const Schedule: React.FC = () => {
  const [filter, setFilter] = useState('Všechny');
  const [quizzes, setQuizzes] = useState<QuizEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const loadData = async () => {
    const data = await RenderDatabase.getQuizzes();
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAttendance = async (id: string) => {
    setActionId(id);
    const updated = await RenderDatabase.toggleQuizAttendance(id);
    setQuizzes(updated);
    setActionId(null);
  };

  const filteredQuizzes = quizzes.filter(q => {
    if (filter === 'Všechny') return true;
    if (filter === 'Moje kvízy') return q.isUserIn;
    if (filter === 'Volná místa') return q.slotsOpen && q.status !== QuizStatus.FULL;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full gap-6 px-5">
        <div className="relative">
          <div className="size-20 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
          <div className="absolute top-0 left-0 size-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary animate-pulse text-3xl">calendar_month</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Načítání rozvrhu</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse flex items-center gap-2">
            <span className="size-1.5 bg-accent-green rounded-full"></span>
            Synchronizace s databází...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold tracking-tight">Rozvrh Kvízů</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">filter_list</span>
            </button>
            <div className="size-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
              <img alt="User" className="w-full h-full object-cover" src="https://i.pravatar.cc/150?u=sarahlee" />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-3 min-w-max">
            {['Všechny', 'Moje kvízy', 'Volná místa'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95 ${
                  filter === f
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm font-semibold whitespace-nowrap">{f}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4">
        {filteredQuizzes.length > 0 ? filteredQuizzes.map((quiz) => (
          <article 
            key={quiz.id} 
            className={`relative flex flex-col bg-white dark:bg-card-dark rounded-2xl p-4 shadow-sm border transition-all ${
              quiz.isUserIn 
                ? 'border-primary/30 ring-1 ring-primary/20 bg-primary/5' 
                : 'border-gray-100 dark:border-gray-800'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl border ${
                quiz.isUserIn ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700'
              }`}>
                <span className="text-[10px] font-bold uppercase tracking-wider">{quiz.month}</span>
                <span className="text-xl font-bold leading-none">{quiz.day}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{quiz.name}</h3>
                <p className="text-slate-500 text-sm">{quiz.venue} • {quiz.time}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${quiz.isUserIn ? 'bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {quiz.isUserIn ? 'Přihlášen' : 'K dispozici'}
                  </span>
                  <button 
                    onClick={() => handleAttendance(quiz.id)}
                    disabled={actionId === quiz.id}
                    className={`h-9 min-w-[100px] px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      quiz.isUserIn 
                        ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' 
                        : 'bg-primary text-white hover:bg-primary/90'
                    } ${actionId === quiz.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {actionId === quiz.id ? (
                      <div className="size-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      quiz.isUserIn ? 'Odhlásit se' : 'Zúčastnit se'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        )) : (
          <div className="py-20 text-center opacity-40">
            <span className="material-symbols-outlined text-5xl mb-2">search_off</span>
            <p className="font-bold">Žádné kvízy neodpovídají filtru</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Schedule;
