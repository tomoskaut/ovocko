
import React, { useEffect } from 'react';
import { WinResult } from '../types';

interface WinModalProps {
  results: WinResult;
  onClose: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ results, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isBigWin = results.money >= 30;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className={`
          max-w-md w-full p-8 rounded-3xl text-center relative overflow-hidden transform scale-110
          ${isBigWin ? 'bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 shadow-[0_0_50px_rgba(234,179,8,0.6)]' : 'bg-gray-900 border-2 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4)]'}
        `}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>

        {isBigWin && (
          <div className="absolute inset-0 opacity-20 flex justify-center items-center pointer-events-none">
            <i className="fa-solid fa-star text-9xl text-white animate-spin-slow"></i>
          </div>
        )}

        <h2 className="orbitron text-4xl font-black mb-4 text-white drop-shadow-md">
          {results.money > 0 ? 'WINNER!' : 'DRINK!'}
        </h2>

        <div className="space-y-4 mb-6">
          {results.messages.map((msg, idx) => (
            <p key={idx} className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
              {msg}
            </p>
          ))}
        </div>

        {results.money > 0 && (
          <div className="text-5xl font-black orbitron text-white mb-6 drop-shadow-lg">
            +${results.money}
          </div>
        )}

        <button 
          onClick={onClose}
          className="bg-white text-black font-black orbitron px-8 py-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          SWEET!
        </button>
      </div>
    </div>
  );
};

export default WinModal;
