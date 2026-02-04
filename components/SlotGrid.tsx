
import React, { useState, useEffect } from 'react';
import { SymbolType } from '../types';
import { getRandomSymbol } from '../constants';

interface SlotGridProps {
  grid: SymbolType[][];
  spinning: boolean;
}

const SlotGrid: React.FC<SlotGridProps> = ({ grid, spinning }) => {
  return (
    <div className="p-4 bg-gray-900 rounded-3xl border-4 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,1)] relative">
      {/* Decorative neon lights */}
      <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_10px_#ff00ff]"></div>
      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#00ffff]"></div>
      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#00ffff]"></div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_10px_#ff00ff]"></div>

      <div className="grid grid-cols-3 gap-3 bg-black p-3 rounded-xl">
        {grid.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((symbol, colIndex) => (
              <ReelCell 
                key={`${rowIndex}-${colIndex}`} 
                finalSymbol={symbol} 
                spinning={spinning} 
                delay={colIndex * 200}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface ReelCellProps {
  finalSymbol: SymbolType;
  spinning: boolean;
  delay: number;
}

const ReelCell: React.FC<ReelCellProps> = ({ finalSymbol, spinning, delay }) => {
  const [currentSymbol, setCurrentSymbol] = useState<SymbolType>(finalSymbol);

  useEffect(() => {
    let interval: any;
    if (spinning) {
      setTimeout(() => {
        interval = setInterval(() => {
          setCurrentSymbol(getRandomSymbol());
        }, 100);
      }, delay);
    } else {
      setCurrentSymbol(finalSymbol);
    }
    return () => clearInterval(interval);
  }, [spinning, finalSymbol, delay]);

  return (
    <div className={`
      w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-4xl md:text-6xl
      bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-700
      shadow-inner overflow-hidden
      ${spinning ? 'animate-pulse opacity-80' : 'transition-transform duration-500'}
    `}>
      <span className={spinning ? 'blur-[1px]' : ''}>
        {currentSymbol}
      </span>
    </div>
  );
};

export default SlotGrid;
