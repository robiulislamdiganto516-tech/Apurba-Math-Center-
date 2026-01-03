
import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Moon, Sun, Globe, LogOut, ChevronRight, Camera } from 'lucide-react';

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<Props> = ({ onBack, onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('Bangla');

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#4A90E2] to-[#E0F7FA] overflow-y-auto">
      {/* App Bar */}
      <div className="p-6 pt-10 flex items-center justify-between sticky top-0 z-20 bg-[#4A90E2]">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 flex flex-col items-center">
        {/* Profile Card */}
        <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-xl flex flex-col items-center relative mb-8">
           <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-[#E0F7FA] overflow-hidden bg-gray-100 flex items-center justify-center">
                 <User size={48} className="text-gray-300" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] border-2 border-white flex items-center justify-center text-white">
                <Camera size={14} />
              </button>
           </div>
           <h2 className="text-2xl font-bold text-[#2C3E50]">Alex Johnson</h2>
           <p className="text-gray-400 font-medium">SSC Batch 2025</p>
           
           <div className="mt-6 flex space-x-6">
              <div className="text-center">
                 <p className="text-xl font-bold text-[#4A90E2]">24</p>
                 <p className="text-[10px] uppercase font-bold text-gray-400">Chapters</p>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div className="text-center">
                 <p className="text-xl font-bold text-[#4A90E2]">128</p>
                 <p className="text-[10px] uppercase font-bold text-gray-400">Quizzes</p>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div className="text-center">
                 <p className="text-xl font-bold text-[#4A90E2]">452</p>
                 <p className="text-[10px] uppercase font-bold text-gray-400">Rank</p>
              </div>
           </div>
        </div>

        {/* Settings List */}
        <div className="w-full bg-white rounded-[2.5rem] p-4 shadow-xl mb-8">
          <div className="space-y-1">
            <SettingToggle 
               icon={<Bell size={20} className="text-blue-500" />} 
               label="Notifications" 
               active={notifications} 
               onClick={() => setNotifications(!notifications)} 
            />
            <SettingToggle 
               icon={darkMode ? <Moon size={20} className="text-purple-500" /> : <Sun size={20} className="text-yellow-500" />} 
               label="Dark Mode" 
               active={darkMode} 
               onClick={() => setDarkMode(!darkMode)} 
            />
            <SettingRow 
               icon={<Globe size={20} className="text-green-500" />} 
               label="Language" 
               value={language}
               onClick={() => setLanguage(language === 'Bangla' ? 'English' : 'Bangla')}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-red-50 text-red-600 rounded-3xl font-bold flex items-center justify-center space-x-3 transform active:scale-95 transition-all"
        >
          <LogOut size={20} />
          <span>Logout Session</span>
        </button>
      </div>
    </div>
  );
};

const SettingToggle: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer" onClick={onClick}>
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">{icon}</div>
      <span className="font-bold text-gray-700">{label}</span>
    </div>
    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${active ? 'bg-gradient-to-r from-[#4A90E2] to-[#50E3C2]' : 'bg-gray-200'}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

const SettingRow: React.FC<{ icon: React.ReactNode; label: string; value: string; onClick: () => void }> = ({ icon, label, value, onClick }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer" onClick={onClick}>
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">{icon}</div>
      <span className="font-bold text-gray-700">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xs font-bold text-[#4A90E2]">{value}</span>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  </div>
);

export default ProfileScreen;
