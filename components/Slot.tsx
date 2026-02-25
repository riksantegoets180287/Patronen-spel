
import React, { useEffect, useState } from 'react';
import { playSound } from '../utils/sounds';

interface SlotProps {
  emoji: string;
  isCorrect?: boolean;
  isWrong?: boolean;
  highlight?: boolean;
  onClick?: () => void;
  rolling?: boolean;
}

const Slot: React.FC<SlotProps> = ({ emoji, isCorrect, isWrong, highlight, onClick, rolling }) => {
  const [displayEmoji, setDisplayEmoji] = useState(emoji);
  const randomEmojis = ['😀', '🚗', '❤️', '✈️', '😎', '🍎', '🚀', '🌟'];

  useEffect(() => {
    let interval: number;
    if (rolling) {
      interval = window.setInterval(() => {
        setDisplayEmoji(randomEmojis[Math.floor(Math.random() * randomEmojis.length)]);
        playSound('roll');
      }, 80);
    } else {
      setDisplayEmoji(emoji);
    }
    return () => clearInterval(interval);
  }, [rolling, emoji]);

  return (
    <div
      onClick={() => {
        if (onClick) {
          playSound('click');
          onClick();
        }
      }}
      className={`
        relative w-14 h-20 md:w-20 md:h-28 flex items-center justify-center 
        bg-white border-[3px] rounded-[8px] text-3xl md:text-5xl shadow-md transition-all duration-300 overflow-hidden
        ${isCorrect ? 'border-summa-green bg-green-50 scale-105' : ''}
        ${isWrong ? 'border-summa-fuchsia bg-red-50 animate-shake' : ''}
        ${highlight ? 'border-summa-yellow ring-4 ring-summa-yellow/30' : 'border-gray-200'}
        ${onClick ? 'cursor-pointer hover:border-summa-indigo hover:shadow-lg' : ''}
        ${rolling ? 'animate-slot-blur bg-gray-50' : ''}
      `}
    >
      <div className={`transition-transform duration-200 ${rolling ? 'translate-y-4 opacity-50' : 'translate-y-0 opacity-100'}`}>
        {displayEmoji === '?' ? (
          <span className="text-gray-300 font-bold italic font-serif">?</span>
        ) : (
          displayEmoji
        )}
      </div>
      
      {/* Glossy overlay to look like a slot machine glass */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 pointer-events-none"></div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
        
        @keyframes slot-blur {
          0% { filter: blur(0px); transform: translateY(0); }
          50% { filter: blur(1px); transform: translateY(2px); }
          100% { filter: blur(0px); transform: translateY(0); }
        }
        .animate-slot-blur { animation: slot-blur 0.1s infinite; }
      `}</style>
    </div>
  );
};

export default Slot;
