
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUIZZES, TEAM_MEMBERS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const nextQuiz = MOCK_QUIZZES.find(q => q.id === '3'); // Golden Lion Pub

  return (
    <div className="flex flex-col gap-6 pt-2">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20" 
              style={{ backgroundImage: `url(${TEAM_MEMBERS.find(m => m.isMe)?.avatar})` }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green border-2 border-background-dark rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Welcome back,</span>
            <h2 className="text-base font-bold leading-tight">Alex</h2>
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

      {/* Main Content Scroll Area */}
      <div className="flex flex-col gap-8 px-4 pb-12">
        {/* Next Quiz Hero */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h1 className="text-xl font-bold tracking-tight">Next Quiz</h1>
            <span className="text-primary text-sm font-semibold cursor-pointer" onClick={() => navigate('/schedule')}>View Details</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-800">
            <div className="relative h-48 w-full">
              <div 
                className="absolute inset-0 bg-center bg-cover" 
                style={{ backgroundImage: `url(${nextQuiz?.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"></div>
              <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Confirmed
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white text-2xl font-bold mb-1">{nextQuiz?.date}</h3>
                <p className="text-slate-300 text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  {nextQuiz?.venue}
                </p>
              </div>
            </div>
            <div className="p-4 bg-card-light dark:bg-card-dark">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Time</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{nextQuiz?.time}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Theme</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{nextQuiz?.theme}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                  I'm Out
                </button>
                <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                  I'm In
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Who's Going */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-bold tracking-tight">Who's Going?</h2>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">5/6 Spots Filled</span>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            <button className="flex flex-col items-center gap-2 min-w-[60px] group">
              <div className="flex items-center justify-center size-14 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors bg-card-light dark:bg-card-dark">
                <span className="material-symbols-outlined">add</span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">Invite</span>
            </button>
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-2 min-w-[60px] relative">
                <div 
                  className={`bg-center bg-no-repeat bg-cover rounded-full size-14 ${member.isMe ? 'ring-2 ring-primary ring-offset-2 ring-offset-background-dark' : 'border-2 border-slate-800'}`}
                  style={{ backgroundImage: `url(${member.avatar})` }}
                />
                <span className={`text-[10px] font-medium ${member.isMe ? 'text-white' : 'text-slate-400'}`}>
                  {member.isMe ? 'You' : member.name.split(' ')[0]}
                </span>
                {member.isMe && (
                  <div className="absolute top-0 right-0 bg-primary rounded-full p-0.5 border border-background-dark">
                    <span className="material-symbols-outlined text-white text-[10px] block">check</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Last Week Result */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-bold tracking-tight">Last Week's Result</h2>
          </div>
          <div className="bg-gradient-to-br from-card-dark to-[#161a23] p-5 rounded-2xl border border-slate-800 flex items-center justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 bg-primary/10 size-32 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
            <div className="relative z-10 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-500 uppercase border border-yellow-500/20">Podium Finish</span>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">2nd Place</h3>
              <p className="text-slate-400 text-sm">The King's Head • General Trivia</p>
            </div>
            <div className="relative z-10 flex flex-col items-end">
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">48</span>
                <span className="text-slate-500 text-sm font-medium">/50</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Points</span>
            </div>
          </div>
        </section>

        {/* Upcoming List */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-bold tracking-tight">Upcoming</h2>
            <button className="text-primary text-sm font-semibold" onClick={() => navigate('/schedule')}>See All</button>
          </div>
          <div className="flex flex-col gap-3">
            {MOCK_QUIZZES.slice(3).map(quiz => (
              <div key={quiz.id} className="flex items-center bg-card-light dark:bg-card-dark p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer">
                <div className="flex flex-col items-center justify-center size-12 bg-slate-100 dark:bg-[#151921] rounded-xl mr-4 shrink-0 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-500">{quiz.month}</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">{quiz.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate">{quiz.name}</h4>
                  <p className="text-slate-500 text-sm truncate">{quiz.venue} • {quiz.time}</p>
                </div>
                <div className="shrink-0 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Pending
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
