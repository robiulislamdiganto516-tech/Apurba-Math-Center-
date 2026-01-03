
import React, { useState, useRef } from 'react';
import { ArrowLeft, Send, Camera, Mic, Sparkles, Loader2, Info, Share2, Bookmark } from 'lucide-react';
import { mathAi } from '../geminiService';

interface Props {
  onBack: () => void;
}

const AISolverScreen: React.FC<Props> = ({ onBack }) => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [hints, setHints] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSolve = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setError(null);
    setSolution(null);
    setHints(null);
    
    try {
      const result = await mathAi.solveProblem(problem);
      setSolution(result || "No solution generated.");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetHints = async () => {
    if (!problem.trim()) return;
    const h = await mathAi.getHints(problem);
    setHints(h);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#1A237E] to-[#E0F7FA] overflow-y-auto flex flex-col relative">
      {/* App Bar */}
      <div className="p-6 flex items-center justify-between sticky top-0 z-20 bg-[#1A237E]">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white">Apurba AI Solver</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
          <Info size={20} />
        </button>
      </div>

      <div className="p-6 flex-grow pb-32">
        {/* Welcome Text */}
        <div className="mb-8">
          <div className="flex items-center text-blue-300 font-bold mb-2 space-x-2">
            <Sparkles size={20} className="text-yellow-400" />
            <span className="tracking-widest uppercase text-xs">Next Gen AI Engine</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-tight">
            Solve any math <br />
            <span className="text-[#50E3C2]">Instantly</span>
          </h2>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl relative">
          <textarea
            placeholder="Type, Paste or Upload your math problem..."
            className="w-full h-40 bg-transparent text-[#2C3E50] font-medium resize-none outline-none text-lg placeholder:text-gray-300"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          ></textarea>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#4A90E2] hover:bg-gray-100 transition-colors">
                <Camera size={22} />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#9B59B6] hover:bg-gray-100 transition-colors">
                <Mic size={22} />
              </button>
            </div>
            
            <button
              onClick={handleSolve}
              disabled={loading || !problem.trim()}
              className="px-8 h-12 rounded-2xl bg-gradient-to-r from-[#F39C12] to-[#F1C40F] text-white font-bold shadow-lg shadow-orange-200 transform active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              <span>{loading ? 'Solving...' : 'Solve Now'}</span>
            </button>
          </div>
        </div>

        {/* Hints and Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Results Area */}
        <div ref={resultsRef} className="mt-8 space-y-6">
          {solution && (
            <div className="bg-white rounded-3xl p-6 shadow-xl border-l-8 border-[#4A90E2] animate-[slide-up_0.5s_ease-out]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#2C3E50] font-bold text-xl">AI Solution</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-500"><Bookmark size={20} /></button>
                  <button className="text-gray-400 hover:text-blue-500"><Share2 size={20} /></button>
                </div>
              </div>
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed overflow-x-auto whitespace-pre-wrap font-bengali">
                {solution}
              </div>
            </div>
          )}

          {!solution && problem && !loading && (
             <button 
                onClick={handleGetHints}
                className="w-full py-4 border-2 border-dashed border-white/30 rounded-3xl text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center space-x-2"
             >
                <Info size={20} />
                <span>Need a Hint instead?</span>
             </button>
          )}

          {hints && (
            <div className="bg-[#50E3C2]/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 animate-[fade-in_0.5s_ease-out]">
              <h4 className="text-white font-bold mb-3 flex items-center">
                <Zap className="mr-2 text-yellow-300 fill-yellow-300" size={18} />
                Strategic Hints
              </h4>
              <p className="text-white/90 text-sm italic font-bengali leading-relaxed">{hints}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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

export default AISolverScreen;
