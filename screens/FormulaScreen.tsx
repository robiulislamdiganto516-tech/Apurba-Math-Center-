
import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Filter, ChevronRight, Bookmark } from 'lucide-react';
import { FORMULAS } from '../constants';

interface Props {
  onBack: () => void;
}

const FormulaScreen: React.FC<Props> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Algebra', 'Geometry', 'Trigonometry', 'Coordinate'];

  const filteredFormulas = FORMULAS.filter(f => 
    (activeCategory === 'All' || f.category === activeCategory) &&
    (f.title.toLowerCase().includes(searchTerm.toLowerCase()) || f.expression.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full w-full bg-[#F8FAFB] flex flex-col">
      {/* App Bar */}
      <div className="bg-[#9B59B6] p-6 pt-10 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-white">Formula Bank</h1>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Filter size={20} />
          </button>
        </div>

        <div className="bg-white rounded-2xl px-4 py-2 flex items-center shadow-sm">
          <Search size={20} className="text-gray-300 mr-3" />
          <input 
            type="text" 
            placeholder="Search equations..."
            className="w-full bg-transparent outline-none py-2 text-gray-600 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-4 flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#9B59B6] text-white shadow-md' : 'bg-white text-gray-400 border border-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-grow overflow-y-auto px-6 space-y-4 pb-10">
        {filteredFormulas.map((formula) => (
          <div key={formula.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#9B59B6] uppercase tracking-[0.2em]">{formula.category}</span>
                <h3 className="text-lg font-bold text-[#2C3E50]">{formula.title}</h3>
              </div>
              <button className={`${formula.bookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'} transition-colors`}>
                <Bookmark size={24} />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-4 flex items-center justify-center border border-gray-100 font-mono text-lg font-bold text-[#2C3E50]">
              {formula.expression}
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{formula.description}</p>
            
            <button className="w-full py-3 bg-gradient-to-r from-[#F39C12] to-[#F1C40F] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-100">
              View Example
            </button>
          </div>
        ))}

        {filteredFormulas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">No formulas found matching your search.</p>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FormulaScreen;
