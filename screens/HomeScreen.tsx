
import React from 'react';
import { Bell, Menu, ChevronRight, Zap } from 'lucide-react';
import { Screen } from '../types';
import { MENU_TILES } from '../constants';

interface Props {
  userName: string;
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<Props> = ({ userName, onNavigate }) => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#4A90E2] to-[#E0F7FA] overflow-y-auto pb-8">
      {/* Top Navbar */}
      <div className="p-6 flex items-center justify-between sticky top-0 z-20 bg-transparent">
        <button className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-white">
          <Menu size={24} />
        </button>
        <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center font-bold text-[#4A90E2] text-xl">
          A
        </div>
        <button className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-white relative">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>

      {/* Welcome Section */}
      <div className="px-6 mb-8">
        <h2 className="text-white font-bengali text-2xl font-bold mb-1">
          স্বাগতম, {userName}!
        </h2>
        <p className="text-white/80 text-sm">Ready for some math challenges today?</p>
      </div>

      {/* Streak / Goal Card */}
      <div className="mx-6 mb-8 bg-white/95 rounded-3xl p-5 shadow-lg flex items-center justify-between relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center text-[#F39C12] font-bold text-sm mb-1">
            <Zap size={18} className="mr-1 fill-[#F39C12]" />
            5 DAY STREAK
          </div>
          <h3 className="text-[#2C3E50] font-bold text-lg mb-1">Today's Goal</h3>
          <p className="font-bengali text-sm text-gray-500">আজ ৫টি প্রশ্নের সমাধান করো</p>
        </div>
        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175" strokeDashoffset="52.5" className="text-[#50E3C2]" />
          </svg>
          <span className="absolute text-xs font-bold text-[#2C3E50]">70%</span>
        </div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#50E3C2]/10 to-transparent"></div>
      </div>

      {/* Menu Grid */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {MENU_TILES.map((tile) => (
          <button
            key={tile.id}
            onClick={() => onNavigate(tile.id as Screen)}
            className={`bg-gradient-to-br ${tile.color} p-4 rounded-3xl shadow-lg transform active:scale-95 transition-all text-left flex flex-col items-start h-36`}
          >
            <div className="bg-white/20 p-2 rounded-xl text-white mb-auto">
              {React.cloneElement(tile.icon as React.ReactElement, { size: 24 })}
            </div>
            <div className="text-white">
              <p className="font-bengali text-lg font-bold leading-tight">{tile.titleBn}</p>
              <p className="text-xs opacity-80 font-medium uppercase tracking-wider">{tile.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10 px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#2C3E50] font-bold text-lg">Continue Learning</h3>
          <button className="text-[#4A90E2] text-xs font-bold uppercase tracking-wider">See All</button>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-4 border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#4A90E2]">
            <Zap size={24} />
          </div>
          <div className="flex-grow">
            <h4 className="font-bengali font-bold text-gray-800">বীজগাণিতিক রাশি</h4>
            <div className="mt-1 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#4A90E2]" style={{ width: '40%' }}></div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
