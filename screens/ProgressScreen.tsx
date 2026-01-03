
import React from 'react';
import { ArrowLeft, Calendar, TrendingUp, Target, Award, Share2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { CHAPTERS } from '../constants';

interface Props {
  onBack: () => void;
}

const data = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 30 },
  { name: 'Wed', score: 65 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 70 },
  { name: 'Sat', score: 95 },
  { name: 'Sun', score: 80 },
];

const ProgressScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#4A90E2] to-[#E0F7FA] overflow-y-auto pb-10">
      {/* Header */}
      <div className="p-6 pt-10 flex items-center justify-between sticky top-0 z-20 bg-[#4A90E2]">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white">Progress Report</h1>
        <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
          <Calendar size={20} />
        </button>
      </div>

      <div className="p-6">
        {/* Top Summary Cards */}
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar">
          <SummaryCard icon={<Award className="text-orange-500" />} label="Streak" value="5 Days" color="bg-orange-50" />
          <SummaryCard icon={<Target className="text-green-500" />} label="Accuracy" value="84%" color="bg-green-50" />
          <SummaryCard icon={<TrendingUp className="text-blue-500" />} label="Level" value="Gold" color="bg-blue-50" />
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl mb-8 mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#2C3E50] text-lg">Weekly Performance</h3>
            <span className="text-xs font-bold text-[#4A90E2] uppercase tracking-widest">Avg. 72%</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4A90E2" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chapter Progress */}
        <h3 className="font-bold text-[#2C3E50] text-lg mb-4 px-2">Chapter Progress</h3>
        <div className="space-y-4 mb-8">
          {CHAPTERS.slice(0, 4).map(chapter => (
            <div key={chapter.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bengali font-bold text-gray-800">{chapter.titleBn}</span>
                <span className="text-xs font-bold text-[#4A90E2]">{chapter.completion}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] transition-all duration-1000`} 
                  style={{ width: `${chapter.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full py-4 bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] text-white rounded-2xl font-bold shadow-lg shadow-purple-200 flex items-center justify-center space-x-2 transform active:scale-95 transition-all">
          <Share2 size={20} />
          <span>Export Full Report</span>
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const SummaryCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className={`min-w-[120px] p-4 rounded-3xl ${color} shadow-sm border border-white flex flex-col items-center space-y-2`}>
    <div className="p-2 bg-white rounded-xl shadow-sm">
      {icon}
    </div>
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default ProgressScreen;
