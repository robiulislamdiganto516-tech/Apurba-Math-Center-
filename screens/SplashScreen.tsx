
import React from 'react';
import { FLOATING_MATH_ICONS } from '../constants';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#4A90E2] to-[#E0F7FA] animate-gradient flex flex-col items-center justify-center relative">
      {/* Floating Icons */}
      {FLOATING_MATH_ICONS.map((item, idx) => (
        <div 
          key={idx}
          className="absolute floating-icon text-white opacity-20"
          style={{ top: item.top, left: item.left, animationDelay: item.delay }}
        >
          {item.icon}
        </div>
      ))}

      {/* Logo */}
      <div className="w-32 h-32 bg-white rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center mb-8 animate-[scale-up_1.2s_ease-out]">
        <div className="w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#50E3C2] rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
          A
        </div>
      </div>

      {/* App Name */}
      <div className="text-center animate-[fade-in_1s_ease-out_0.8s_both]">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">
          Apurba Math Center
        </h1>
        <p className="font-bengali text-lg text-[#ECF0F1] drop-shadow-sm opacity-90">
          SSC Class 10 General Math
        </p>
        <p className="text-sm text-[#ECF0F1] mt-1 tracking-widest uppercase opacity-80">
          Robiul Islam Diganto
        </p>
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-3/4 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] animate-[loading_3s_ease-in-out]"></div>
      </div>

      <style>{`
        @keyframes scale-up {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
