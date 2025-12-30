
import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  const me = TEAM_MEMBERS.find(m => m.isMe);
  const captains = TEAM_MEMBERS.filter(m => !m.isMe && (m.role.includes('Lead') || m.role.includes('Captain')));
  const members = TEAM_MEMBERS.filter(m => !m.isMe && !m.role.includes('Lead') && !m.role.includes('Captain'));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-5 pt-8 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Team Roster</h2>
        <div className="flex items-center gap-3">
          <button className="size-10 rounded-full bg-card-light dark:bg-card-dark flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-10">
        {/* Search */}
        <div className="px-5 mb-6">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary">search</span>
            <input 
              type="text" 
              placeholder="Find team members..." 
              className="w-full h-12 pl-12 pr-4 bg-white dark:bg-card-dark border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary shadow-sm"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">tune</button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-6">
          {['All', 'Captains', 'Signed Up', 'Away'].map((f, i) => (
            <button 
              key={f}
              className={`flex h-9 shrink-0 items-center justify-center px-6 rounded-full text-sm font-semibold transition-all ${
                i === 0 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* My Status */}
        <div className="px-5 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">My Status</h3>
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
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Edit
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-blue-100 text-sm font-medium">Next Quiz: <span className="text-white font-black">Oct 24</span></span>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="material-symbols-outlined text-accent-green text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-white text-[10px] font-black uppercase tracking-wider">Signed Up</span>
              </div>
            </div>
          </div>
        </div>

        {/* Captains */}
        <section className="mb-6">
          <h3 className="px-5 mb-2 text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500">local_police</span>
            Captains
          </h3>
          <div className="flex flex-col">
            {captains.map(c => (
              <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-white dark:hover:bg-card-dark transition-colors cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-800" style={{ backgroundImage: `url(${c.avatar})` }} />
                  <div>
                    <p className="text-base font-bold">{c.name}</p>
                    <p className="text-xs font-medium text-slate-500">{c.role}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                  c.status === 'Available' 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-transparent'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Members */}
        <section>
          <h3 className="px-5 mb-2 text-lg font-bold flex items-center gap-2">
            Members
            <span className="bg-slate-100 dark:bg-slate-800 text-[10px] py-0.5 px-2 rounded-md text-slate-500 font-black">{members.length}</span>
          </h3>
          <div className="flex flex-col">
            {members.map(m => (
              <div key={m.id} className="flex items-center justify-between px-5 py-4 hover:bg-white dark:hover:bg-card-dark transition-colors cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black text-base shadow-inner">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-base font-bold">{m.name}</p>
                    <p className="text-xs font-medium text-slate-500">{m.role}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-accent-green text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Team;
