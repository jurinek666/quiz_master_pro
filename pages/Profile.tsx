
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 pt-6 pb-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-base font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Cancel
        </button>
        <h2 className="text-lg font-bold">Edit Profile</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-base font-bold text-primary hover:text-primary/80 transition-colors"
        >
          Save
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pt-8 pb-12 overflow-y-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 mb-10 w-full">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-4 ring-white dark:ring-background-dark shadow-2xl">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" 
                src="https://i.pravatar.cc/150?u=sarahlee" 
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">photo_camera</span>
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2 shadow-xl border-4 border-white dark:border-background-dark flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </div>
          </div>
          <button className="text-primary font-bold text-sm uppercase tracking-wider hover:underline">
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="Alex Rivera" 
                className="w-full h-14 px-5 rounded-2xl bg-white dark:bg-card-dark border-none focus:ring-2 focus:ring-primary shadow-sm font-semibold"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                defaultValue="alex.rivera@example.com" 
                className="w-full h-14 px-5 rounded-2xl bg-white dark:bg-card-dark border-none focus:ring-2 focus:ring-primary shadow-sm font-semibold"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-accent-green material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                defaultValue="password123" 
                className="w-full h-14 px-5 pr-14 rounded-2xl bg-white dark:bg-card-dark border-none focus:ring-2 focus:ring-primary shadow-sm font-semibold"
              />
              <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
            <p className="text-[10px] font-medium text-slate-500 italic ml-1 mt-1">Leave blank to keep current password.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Bio</label>
            <textarea 
              rows={3}
              placeholder="Tell your team about yourself..."
              className="w-full p-5 rounded-2xl bg-white dark:bg-card-dark border-none focus:ring-2 focus:ring-primary shadow-sm font-medium resize-none"
              defaultValue="Ready to crush trivia night! 🧠✨"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="w-full mt-10 space-y-4">
          <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
          <button className="flex items-center justify-center w-full h-14 rounded-2xl bg-slate-100 dark:bg-card-dark text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors gap-3">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
          <button className="flex items-center justify-center w-full h-14 rounded-2xl bg-red-50 dark:bg-red-900/10 text-accent-red font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-transparent dark:border-red-900/20">
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
