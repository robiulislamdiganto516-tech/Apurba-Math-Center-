
import React, { useState } from 'react';
import { ArrowLeft, Book, Search, Star, ChevronRight, PlayCircle } from 'lucide-react';
import { CHAPTERS } from '../constants';
import { Chapter } from '../types';

interface Props {
  onBack: () => void;
}

const ChapterScreen: React.FC<Props> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const filteredChapters = CHAPTERS.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.titleBn.includes(searchTerm)
  );

  if (selectedChapter) {
    return <ChapterDetailScreen chapter={selectedChapter} onBack={() => setSelectedChapter(null)} />;
  }

  return (
    <div className="h-full w-full bg-[#E0F7FA] flex flex-col">
      {/* App Bar */}
      <div className="bg-[#4A90E2] p-6 pt-10 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-white">All Chapters</h1>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Star size={20} />
          </button>
        </div>

        <div className="bg-white rounded-2xl px-4 py-2 flex items-center shadow-sm">
          <Search size={20} className="text-gray-300 mr-3" />
          <input 
            type="text" 
            placeholder="Search chapters..."
            className="w-full bg-transparent outline-none py-2 text-gray-600 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {filteredChapters.map((chapter) => (
          <button 
            key={chapter.id}
            onClick={() => setSelectedChapter(chapter)}
            className="w-full bg-white rounded-3xl p-5 shadow-md flex items-center space-x-4 border border-transparent hover:border-[#4A90E2] transition-all transform active:scale-98"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${chapter.completion === 100 ? 'from-green-400 to-green-600' : 'from-[#4A90E2] to-[#50E3C2]'}`}>
              {chapter.number}
            </div>
            <div className="flex-grow text-left">
              <h3 className="font-bengali text-lg font-bold text-[#2C3E50]">{chapter.titleBn}</h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{chapter.title}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-[#4A90E2] mb-1">{chapter.completion}%</div>
              <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4A90E2]" style={{ width: `${chapter.completion}%` }}></div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

const ChapterDetailScreen: React.FC<{ chapter: Chapter; onBack: () => void }> = ({ chapter, onBack }) => {
  const [activeTab, setActiveTab] = useState('Intro');
  const tabs = ['Intro', 'Formulas', 'Examples', 'Quiz'];

  return (
    <div className="h-full w-full bg-white flex flex-col">
       <div className="bg-gradient-to-b from-[#4A90E2] to-[#50E3C2] p-6 pt-10 text-white">
          <button onClick={onBack} className="mb-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#4A90E2] font-bold text-2xl shadow-lg">
              {chapter.number}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-bengali">{chapter.titleBn}</h2>
              <p className="text-sm opacity-80 uppercase tracking-widest font-medium">{chapter.title}</p>
            </div>
          </div>
       </div>

       {/* Horizontal Tabs */}
       <div className="bg-white sticky top-0 flex items-center px-4 border-b border-gray-100 z-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 text-sm font-bold tracking-wider relative transition-colors ${activeTab === tab ? 'text-[#4A90E2]' : 'text-gray-400'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-4 right-4 h-1 bg-[#4A90E2] rounded-t-full"></div>}
            </button>
          ))}
       </div>

       {/* Content */}
       <div className="flex-grow overflow-y-auto p-6">
          {activeTab === 'Intro' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <h3 className="font-bold text-[#4A90E2] mb-3 text-lg">About this Chapter</h3>
                <p className="font-bengali text-gray-700 leading-relaxed">
                  এই অধ্যায়ে আমরা {chapter.titleBn} এর মৌলিক ধারণা থেকে শুরু করে জটিল গাণিতিক সমস্যার সমাধান শিখব। এটি পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ।
                </p>
              </div>
              <div className="flex flex-col items-center p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <PlayCircle size={48} className="text-[#4A90E2] mb-4" />
                <p className="font-bold text-gray-500">Watch Intro Video</p>
              </div>
            </div>
          )}
          
          {activeTab === 'Formulas' && (
             <div className="space-y-4 animate-fadeIn">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Formula 1</h4>
                    <p className="text-[#9B59B6] font-mono text-lg font-bold">a² + 2ab + b² = (a+b)²</p>
                  </div>
                  <button className="text-gray-300 hover:text-yellow-400 transition-colors"><Star size={20} /></button>
                </div>
                {/* Repeat or map actual formulas here */}
             </div>
          )}

          {activeTab === 'Examples' && (
             <div className="space-y-4 animate-fadeIn">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center text-blue-500 font-bold mb-3">
                      <Zap size={18} className="mr-2" />
                      Example {i}
                    </div>
                    <p className="font-bengali text-gray-800 mb-4">গাণিতিক সমস্যার উদাহরণ ও সমাধান এখানে দেওয়া থাকবে।</p>
                    <button className="w-full py-3 bg-gray-50 rounded-2xl text-[#4A90E2] font-bold text-sm">View Step-by-Step Solution</button>
                  </div>
                ))}
             </div>
          )}

          {activeTab === 'Quiz' && (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fadeIn">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
                  <PlayCircle size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Chapter Quiz Ready!</h3>
                <p className="text-sm text-gray-500 max-w-[200px]">Test your knowledge of {chapter.title} with 10 quick questions.</p>
                <button className="px-8 py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-100 transform active:scale-95 transition-all">Start Quiz</button>
             </div>
          )}
       </div>

       <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
       `}</style>
    </div>
  );
};

const Zap: React.FC<{className?: string, size?: number}> = ({className, size=24}) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default ChapterScreen;
