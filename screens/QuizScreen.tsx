
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Zap, ChevronRight, CheckCircle, XCircle, Award } from 'lucide-react';
import { MOCK_QUIZ } from '../constants';

interface Props {
  onBack: () => void;
}

const QuizScreen: React.FC<Props> = ({ onBack }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (quizStarted && !quizFinished && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Time out
    }
  }, [timeLeft, quizStarted, quizFinished, isAnswered]);

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === MOCK_QUIZ[currentIndex].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < MOCK_QUIZ.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
    }
  };

  if (!quizStarted) {
    return (
      <div className="h-full w-full bg-gradient-to-b from-[#4A90E2] to-[#E0F7FA] flex flex-col p-8 items-center justify-center text-center">
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-[#E74C3C] shadow-2xl mb-8 animate-bounce">
           <Award size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Math Quiz Challenge</h2>
        <p className="text-white/80 font-bengali mb-10">আপনার গাণিতিক দক্ষতা যাচাই করার জন্য কুইজটি শুরু করুন।</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
           <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 border border-white/20 text-white">
              <Clock size={24} className="mx-auto mb-2" />
              <p className="text-[10px] uppercase font-bold opacity-60">Time</p>
              <p className="font-bold">10 Mins</p>
           </div>
           <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 border border-white/20 text-white">
              <Zap size={24} className="mx-auto mb-2" />
              <p className="text-[10px] uppercase font-bold opacity-60">Quest.</p>
              <p className="font-bold">20 items</p>
           </div>
        </div>

        <button 
          onClick={() => setQuizStarted(true)}
          className="w-full bg-white text-[#4A90E2] py-5 rounded-3xl font-bold text-xl shadow-xl hover:scale-105 transition-transform"
        >
          Start Quiz Now
        </button>
        <button onClick={onBack} className="mt-6 text-white/60 font-bold uppercase text-xs tracking-widest">Back to Dashboard</button>
      </div>
    );
  }

  if (quizFinished) {
     return (
        <div className="h-full w-full bg-[#4A90E2] flex flex-col p-8 items-center justify-center text-center">
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-8 relative">
               <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#4A90E2] text-3xl font-bold">
                  {Math.round((score / MOCK_QUIZ.length) * 100)}%
               </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
            <p className="text-white/80 font-bengali mb-10">আপনার স্কোর: {score} / {MOCK_QUIZ.length}</p>
            
            <div className="space-y-4 w-full">
              <button onClick={() => { setQuizStarted(false); setQuizFinished(false); setCurrentIndex(0); setScore(0); }} className="w-full bg-white text-[#4A90E2] py-4 rounded-2xl font-bold shadow-lg">Try Again</button>
              <button onClick={onBack} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">Back to Home</button>
            </div>
        </div>
     );
  }

  const currentQ = MOCK_QUIZ[currentIndex];

  return (
    <div className="h-full w-full bg-[#E0F7FA] flex flex-col">
       <div className="p-6 pt-10 flex items-center justify-between">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#4A90E2]/10 flex items-center justify-center text-[#4A90E2]">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
             <Clock size={16} className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-[#4A90E2]'}`} />
             <span className={`font-bold tabular-nums ${timeLeft < 10 ? 'text-red-500' : 'text-[#2C3E50]'}`}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          </div>
          <div className="text-xs font-bold text-[#4A90E2] uppercase tracking-widest">
            {currentIndex + 1} / {MOCK_QUIZ.length}
          </div>
       </div>

       <div className="px-6 flex-grow flex flex-col">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mb-8">
             <div 
               className="h-full bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] transition-all" 
               style={{ width: `${((currentIndex + 1) / MOCK_QUIZ.length) * 100}%` }}
             ></div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl mb-8 animate-slideIn">
             <span className="inline-block px-4 py-1 rounded-full bg-[#4A90E2]/10 text-[#4A90E2] text-[10px] font-bold uppercase tracking-widest mb-4">Question {currentIndex + 1}</span>
             <h3 className="text-xl font-bold text-[#2C3E50] leading-tight mb-8">
               {currentQ.text}
             </h3>

             <div className="space-y-4">
                {currentQ.options.map((opt, idx) => {
                  let style = "border-gray-100 bg-gray-50 text-[#2C3E50]";
                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) style = "bg-green-500 text-white border-green-500 shadow-lg shadow-green-100";
                    else if (idx === selectedOption) style = "bg-red-500 text-white border-red-500 shadow-lg shadow-red-100";
                  } else if (selectedOption === idx) {
                    style = "border-[#4A90E2] bg-blue-50 text-[#4A90E2]";
                  }

                  return (
                    <button 
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswered}
                      className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctIndex && <CheckCircle size={20} />}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle size={20} />}
                    </button>
                  );
                })}
             </div>
          </div>

          {isAnswered && (
            <div className="animate-fadeIn">
               {selectedOption !== currentQ.correctIndex && (
                 <div className="bg-[#E74C3C]/10 p-4 rounded-2xl border border-red-100 mb-6">
                    <p className="text-xs text-red-600 font-bold mb-1 uppercase tracking-widest">Explanation</p>
                    <p className="text-sm text-red-600/80 font-medium">{currentQ.explanation}</p>
                 </div>
               )}
               <button 
                 onClick={nextQuestion}
                 className="w-full py-5 bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] text-white rounded-3xl font-bold text-xl shadow-lg flex items-center justify-center space-x-2"
               >
                 <span>{currentIndex < MOCK_QUIZ.length - 1 ? 'Next Question' : 'See Results'}</span>
                 <ChevronRight size={20} />
               </button>
            </div>
          )}
       </div>

       <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.4s ease-out;
          }
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

export default QuizScreen;
