
import React, { useState, useEffect } from 'react';
import { RenderDatabase } from '../services/db';
import { TeamMember } from '../types';

const Team: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await RenderDatabase.getTeam();
      setTeam(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const me = team.find(m => m.isMe);
  const teamies = team.filter(m => !m.isMe);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-5 pt-8 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Náš Tým</h2>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center shadow-sm border border-slate-200 dark:border-white/5">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-10">
        <div className="px-5 mb-6">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary">search</span>
            <input 
              type="text" 
              placeholder="Hledat spoluhráče..." 
              className="w-full h-12 pl-12 pr-4 bg-white dark:bg-card-dark border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
        </div>

        <div className="px-5 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Můj Profil</h3>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#0f4ac4] p-5 shadow-xl shadow-primary/20">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-white/20" 
                    style={{ backgroundImage: `url(${me?.avatar})` }}
                  />
                  <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-accent-green border-2 border-primary"></div>
                </div>
                <div>
                  <p className="text-white text-lg font-bold">{me?.name}</p>
                  <p className="text-blue-100/80 text-xs font-semibold uppercase tracking-wider">{me?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between px-5 mb-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              Teamies
              <span className="bg-slate-100 dark:bg-slate-800 text-[10px] py-0.5 px-2 rounded-md text-slate-500 font-black">
                {teamies.length}
              </span>
            </h3>
          </div>
          <div className="flex flex-col">
            {teamies.map(m => (
              <div key={m.id} className="flex items-center justify-between px-5 py-4 hover:bg-white dark:hover:bg-card-dark transition-colors cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-base border border-primary/20 overflow-hidden">
                      {m.avatar ? (
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${m.avatar})` }} />
                      ) : (
                        m.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-bold">{m.name}</p>
                    <p className="text-xs font-medium text-slate-500">{m.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {m.status === 'Available' ? (
                    <span className="material-symbols-outlined text-accent-green text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  ) : (
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Away</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Team;
