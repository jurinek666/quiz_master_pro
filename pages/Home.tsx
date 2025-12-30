
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderDatabase } from '../services/db';
import { QuizEvent, TeamMember } from '../types';
import { GoogleGenAI } from "@google/genai";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizEvent[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [isAsking, setIsAsking] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [q, t] = await Promise.all([
        RenderDatabase.getQuizzes(),
        RenderDatabase.getTeam()
      ]);
      setQuizzes(q);
      setTeam(t);
    } catch (err) {
      setError("Nepodařilo se spojit s Render API. Server se možná probouzí...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const askAI = async () => {
    setIsAsking(true);
    setAiResponse("Analýza databáze...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Máš přístup k databázi týmu QuizMaster Pro. 
        Tým má ${team.length} členů. 
        Aktuální data z SQL databáze naznačují, že příští kvíz je: ${quizzes[0]?.name}.
        Navrhni 3 odborné okruhy k přípravě. Odpověz česky a stručně.`,
      });
      setAiResponse(response.text || "Nepodařilo se získat AI analýzu.");
    } catch (error) {
      setAiResponse("AI asistent je momentálně zaneprázdněn.");
    } finally {
      setIsAsking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-5 text-center">
        <div className="relative">
          <div className="size-16 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
          <div className="absolute top-0 left-0 size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div>
          <p className="text-slate-900 dark:text-white font-bold text-lg">Připojování k Render.com</p>
          <p className="text-slate-500 text-sm animate-pulse">Navazování SQL session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-accent-red opacity-50">cloud_off</span>
        <div>
          <h2 className="text-xl font-bold mb-2">Chyba připojení</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <button 
            onClick={loadData}
            className="px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all"
          >
            Zkusit znovu
          </button>
        </div>
      </div>
    );
  }

  const nextQuiz = quizzes[0];
  const me = team.find(m => m.isMe);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20" 
              style={{ backgroundImage: `url(${me?.avatar})` }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green border-2 border-background-dark rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-accent-green font-black uppercase tracking-tighter">Live SQL</span>
              <div className="size-1 bg-accent-green rounded-full"></div>
            </div>
            <h2 className="text-base font-bold leading-tight">{me?.name.split(' ')[0]}</h2>
          </div>
        </div>
        <button 
          onClick={() => navigate('/inbox')}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-card-dark transition-colors relative"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">notifications</span>
          <span className="absolute top-2 right-2 size-2.5 bg-accent-red rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      <div className="flex flex-col gap-8 px-4 pb-12">
        {/* AI Assistant Card */}
        <section>
          <div className="bg-gradient-to-br from-indigo-600 to-primary p-5 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-white">psychology</span>
                <h3 className="text-white font-bold">SQL Insights (Gemini)</h3>
              </div>
              {aiResponse ? (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-4 border border-white/20">
                  <p className="text-white text-xs leading-relaxed">{aiResponse}</p>
                </div>
              ) : (
                <p className="text-blue-100 text-sm mb-4">Chcete analyzovat aktuální data z Renderu pro lepší přípravu?</p>
              )}
              <button 
                onClick={askAI}
                disabled={isAsking}
                className={`w-full h-10 flex items-center justify-center gap-2 bg-white text-primary font-bold rounded-xl text-sm transition-all active:scale-95 ${isAsking ? 'opacity-50 cursor-wait' : 'hover:bg-blue-50'}`}
              >
                {isAsking ? (
                  <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">database</span>
                )}
                {isAsking ? 'Dotazuji se...' : 'Analyzovat SQL data'}
              </button>
            </div>
          </div>
        </section>

        {/* Next Quiz Hero */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h1 className="text-xl font-bold tracking-tight">Příští Kvíz</h1>
            <span className="text-primary text-sm font-semibold cursor-pointer" onClick={() => navigate('/schedule')}>Kompletní rozvrh</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-800">
            <div className="relative h-48 w-full">
              <div 
                className="absolute inset-0 bg-center bg-cover" 
                style={{ backgroundImage: `url(${nextQuiz?.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
              <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                SQL Ověřeno
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-2xl font-bold mb-1">{nextQuiz?.date}</h3>
                <p className="text-slate-300 text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  {nextQuiz?.venue}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                {nextQuiz?.description}
              </p>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Start</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{nextQuiz?.time}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Téma</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{nextQuiz?.theme}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sync Indicator */}
        <div className="px-1 flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Last sync: Just now</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
