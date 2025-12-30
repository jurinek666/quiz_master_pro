
import React from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-card-light dark:bg-[#12151c]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pb-safe shadow-[0_-5px_10px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-4 h-16">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex flex-col items-center justify-center gap-1.5 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="text-[10px] font-medium">Home</span>
          </NavLink>
          
          <NavLink 
            to="/schedule" 
            className={({ isActive }) => `flex flex-col items-center justify-center gap-1.5 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-[10px] font-medium">Schedule</span>
          </NavLink>
          
          <NavLink 
            to="/team" 
            className={({ isActive }) => `flex flex-col items-center justify-center gap-1.5 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="text-[10px] font-medium">Team</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex flex-col items-center justify-center gap-1.5 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
