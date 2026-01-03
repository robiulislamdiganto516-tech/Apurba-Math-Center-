
import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Mail, Globe, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const HelpScreen: React.FC<Props> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "কিভাবে অ্যাপটি ব্যবহার করব?", a: "অ্যাপের হোম স্ক্রীন থেকে যেকোনো ক্যাটাগরি সিলেক্ট করে পড়াশুনা শুরু করতে পারেন। AI সলভার দিয়ে যেকোনো জটিল অংক মুহূর্তেই সমাধান করতে পারেন।" },
    { q: "AI সলভার কি সবসময় ফ্রি?", a: "হ্যাঁ, আপুরবা ম্যাথ সেন্টারের সকল স্টুডেন্টদের জন্য এই সার্ভিসটি সম্পূর্ণ ফ্রি।" },
    { q: "নতুন চ্যাপ্টার কবে আসবে?", a: "প্রতি সপ্তাহে আমরা নতুন নতুন লেসন এবং কুইজ আপডেট করি। নোটিফিকেশন চালু রাখুন নিয়মিত আপডেটের জন্য।" },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#2C3E50] to-[#E0F7FA] overflow-y-auto">
      {/* App Bar */}
      <div className="p-6 pt-10 flex items-center justify-between sticky top-0 z-20 bg-[#2C3E50]">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white">Help & About</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6">
        {/* Contact Support */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl mb-8 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-2">Need Support?</h2>
            <p className="text-gray-500 mb-6 text-sm">Our team is ready to help you with any questions.</p>
            
            <div className="space-y-4">
              <ContactButton icon={<Mail size={20} />} label="Email Developer" color="bg-blue-500" />
              <ContactButton icon={<Globe size={20} />} label="Visit Website" color="bg-purple-500" />
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
        </div>

        {/* FAQs */}
        <h3 className="text-lg font-bold text-white mb-4 px-2">Frequently Asked Questions</h3>
        <div className="space-y-4 mb-10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <span className="font-bengali font-bold text-gray-800 text-sm">{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 animate-slideDown">
                   <div className="h-px bg-gray-100 mb-4"></div>
                   <p className="font-bengali text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* About App */}
        <div className="text-center pb-10">
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Apurba Math Center v1.0.4</p>
          <p className="text-white/30 text-[10px] font-medium">Developed by Robiul Islam Diganto</p>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const ContactButton: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
  <button className="w-full flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors group">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-lg shadow-${color.split('-')[1]}-200`}>
      {icon}
    </div>
    <span className="font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{label}</span>
  </button>
);

export default HelpScreen;
