
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RenderDatabase } from '../services/db';
import { TeamMember } from '../types';

const SPECIALIZATIONS = [
  { id: 'geo', label: 'Geografie', icon: 'public' },
  { id: 'hist', label: 'Historie', icon: 'history_edu' },
  { id: 'music', label: 'Hudba', icon: 'music_note' },
  { id: 'sci', label: 'Věda', icon: 'science' },
  { id: 'pop', label: 'Popkultura', icon: 'movie' },
  { id: 'sport', label: 'Sport', icon: 'sports_soccer' },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<TeamMember | null>(null);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const load = async () => {
      const team = await RenderDatabase.getTeam();
      const me = team.find(m => m.isMe);
      if (me) {
        setUser(me);
        setName(me.name);
        // Poznámka: Specializace by normálně byly součástí modelu TeamMember, 
        // zde je simulujeme jako extra stav uložený v localStorage pro tento profil.
        const savedSpecs = localStorage.getItem('qm_user_specs');
        if (savedSpecs) setSelectedSpecs(JSON.parse(savedSpecs));
      }
      setLoading(false);
    };
    load();
  }, []);

  const toggleSpec = (id: string) => {
    if (selectedSpecs.includes(id)) {
      setSelectedSpecs(selectedSpecs.filter(s => s !== id));
    } else if (selectedSpecs.length < 2) {
      setSelectedSpecs([...selectedSpecs, id]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await RenderDatabase.updateUserProfile({ name });
    localStorage.setItem('qm_user_specs', JSON.stringify(selectedSpecs));
    setSaving(false);
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 pt-6 pb-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-base font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Zrušit
        </button>
        <h2 className="text-lg font-bold">Upravit profil</h2>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="text-base font-bold text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
        >
          {saving ? 'Ukládání...' : 'Uložit'}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pt-8 pb-12 overflow-y-auto">
        <div className="flex flex-col items-center gap-4 mb-10 w-full">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-4 ring-white dark:ring-background-dark shadow-2xl">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" 
                src={user?.avatar || "https://i.pravatar.cc/150?u=sarahlee"} 
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">photo_camera</span>
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2 shadow-xl border-4 border-white dark:border-background-dark flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </div>
          </div>
        </div>

        <div className="w-full space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Celé jméno</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl bg-white dark:bg-card-dark border-none focus:ring-2 focus:ring-primary shadow-sm font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Specializace (max 2)</label>
              <div className="grid grid-cols-2 gap-3">
                {SPECIALIZATIONS.map((spec) => {
                  const isSelected = selectedSpecs.includes(spec.id);
                  const isMaxed = selectedSpecs.length >= 2 && !isSelected;
                  
                  return (
                    <button
                      key={spec.id}
                      onClick={() => toggleSpec(spec.id)}
                      disabled={isMaxed}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                        isSelected 
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                          : 'bg-white dark:bg-card-dark border-transparent text-slate-600 dark:text-slate-400 opacity-100'
                      } ${isMaxed ? 'opacity-40 grayscale cursor-not-allowed' : ''}`}
                    >
                      <span className="material-symbols-outlined text-[20px] shrink-0">
                        {spec.icon}
                      </span>
                      <span className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                        {spec.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Bio</label>
              <textarea 
                rows={3}
                placeholder="Řekni týmu něco o sobě..."
                className="w-full p-5 rounded-2xl bg-white dark:bg-card-dark border-none focus:ring-2 focus:ring-primary shadow-sm font-medium resize-none"
                defaultValue="Vždy připravená na hudební a filmové kolo! 🧠✨"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
