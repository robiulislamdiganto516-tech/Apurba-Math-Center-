
import React, { useState } from 'react';
import { Eye, EyeOff, Smartphone, Lock } from 'lucide-react';

interface Props {
  onLogin: (name: string) => void;
  onGuest: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin, onGuest }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 11) {
      onLogin(mobile);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#4A90E2] to-[#E0F7FA] animate-gradient flex flex-col p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center mt-8 mb-12">
        <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#50E3C2] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Apurba Math Center</h1>
      </div>

      {/* Login Card */}
      <div className={`bg-white rounded-3xl p-6 shadow-xl transition-transform ${error ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        <h2 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center">
          Student Login <span className="ml-2 font-bengali text-sm font-normal text-gray-400">(ছাত্র লগইন)</span>
        </h2>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Mobile Number</label>
            <div className={`flex items-center border-2 rounded-2xl px-4 py-3 transition-colors ${error ? 'border-red-400' : 'border-gray-100 focus-within:border-[#4A90E2] focus-within:ring-4 focus-within:ring-[#4A90E2]/10'}`}>
              <Smartphone size={20} className="text-[#4A90E2] mr-3" />
              <input 
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full bg-transparent outline-none text-[#2C3E50] font-medium"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Password (Optional)</label>
            <div className="flex items-center border-2 border-gray-100 rounded-2xl px-4 py-3 focus-within:border-[#4A90E2] focus-within:ring-4 focus-within:ring-[#4A90E2]/10 transition-colors">
              <Lock size={20} className="text-[#4A90E2] mr-3" />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-[#2C3E50] font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-semibold text-[#4A90E2] opacity-70 hover:opacity-100">
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#4A90E2] to-[#50E3C2] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all"
          >
            Login to Study
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-gray-100 flex-grow"></div>
          <span className="px-4 text-xs font-bold text-gray-400 uppercase">Or</span>
          <div className="h-px bg-gray-100 flex-grow"></div>
        </div>

        <button 
          onClick={onGuest}
          className="w-full border-2 border-[#4A90E2] text-[#4A90E2] py-4 rounded-2xl font-bold text-lg hover:bg-[#4A90E2]/5 transition-colors"
        >
          Try as Guest
        </button>
      </div>

      <div className="mt-auto py-8 text-center">
        <button className="text-white/30 text-xs font-medium uppercase tracking-widest hover:text-white/50 transition-colors">
          Teacher / Admin Login
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;
