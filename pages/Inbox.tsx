
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS } from '../constants';

const Inbox: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 pt-4">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="material-symbols-outlined">arrow_back</button>
            <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
          </div>
          <button className="text-primary text-sm font-bold uppercase tracking-widest">Mark all read</button>
        </div>

        {/* Segmented Control */}
        <div className="px-5 pb-4">
          <div className="flex h-10 w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-[#1c2433] p-1">
            {['All', 'Alerts', 'Messages'].map((tab, i) => (
              <button 
                key={tab}
                className={`flex-1 h-full rounded-lg text-xs font-bold transition-all ${i === 0 ? 'bg-white dark:bg-[#2a3447] text-primary dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 py-2 space-y-1">
        <div className="py-2 mt-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Today</p>
        </div>

        {NOTIFICATIONS.map(notif => (
          <div 
            key={notif.id}
            className={`group relative flex items-start gap-4 py-5 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 -mx-5 px-5 transition-colors cursor-pointer ${!notif.unread ? 'opacity-70' : ''}`}
          >
            <div className="shrink-0 relative">
              {notif.avatar ? (
                <div className="size-12 rounded-full bg-cover bg-center border border-slate-100 dark:border-white/10" style={{ backgroundImage: `url(${notif.avatar})` }} />
              ) : (
                <div className={`flex items-center justify-center size-12 rounded-full ${notif.type === 'alert' ? 'bg-primary/10 text-primary' : 'bg-accent-green/10 text-accent-green'}`}>
                  <span className="material-symbols-outlined text-[24px]">
                    {notif.type === 'alert' ? 'notifications_active' : 'check_circle'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate pr-2">{notif.title}</h3>
                <span className={`text-[10px] font-black shrink-0 ${notif.unread ? 'text-primary' : 'text-slate-500'}`}>{notif.time}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-snug">
                {notif.message}
              </p>
            </div>

            {notif.unread && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex h-full items-start pt-6">
                <div className="size-2.5 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
              </div>
            )}
          </div>
        ))}

        <div className="py-4 mt-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Yesterday</p>
        </div>
        
        <div className="text-center py-10 opacity-30">
          <span className="material-symbols-outlined text-4xl block mb-2">history</span>
          <p className="text-xs font-bold uppercase tracking-wider">No more notifications</p>
        </div>
      </main>
    </div>
  );
};

export default Inbox;
