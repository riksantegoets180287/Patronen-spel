
import React, { useEffect } from 'react';
import { User, LevelResult } from '../types';
import { startConfetti } from '../utils/confetti';
import { exportResultsToPdf } from '../utils/pdfExport';
import { playSound } from '../utils/sounds';

interface ResultsProps {
  user: User;
  results: LevelResult[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ user, results, onRestart }) => {
  useEffect(() => {
    startConfetti();
    playSound('correct');
  }, []);

  const totalStars = results.reduce((sum, r) => sum + r.stars, 0);

  return (
    <div className="h-[100dvh] bg-summa-light p-2 md:p-4 flex flex-col items-center overflow-hidden">
      <div className="max-w-4xl w-full bg-white rounded-[24px] p-4 md:p-6 shadow-2xl border-t-[12px] border-summa-indigo flex flex-col min-h-0">
        <div className="text-center mb-4 shrink-0">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-summa-indigo mb-1">KLAAR!</h1>
          <p className="text-lg md:text-2xl text-gray-600">Super gedaan, <span className="text-summa-indigo font-bold">{user.name}</span>!</p>
          <div className="mt-2 flex justify-center gap-3">
            {[1, 2, 3].map(i => (
              <span key={i} className="text-3xl md:text-6xl animate-bounce drop-shadow-lg" style={{ animationDelay: `${i * 0.15}s` }}>⭐</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 shrink-0">
          <div className="bg-summa-indigo text-white p-4 rounded-[20px] shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold mb-1 opacity-80">Jouw score</h3>
            <div className="text-4xl md:text-6xl font-serif font-bold mb-0.5">{totalStars}</div>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Sterren totaal</p>
          </div>
          
          <div className="flex flex-col gap-2 justify-center">
            <button
              onClick={() => { playSound('click'); exportResultsToPdf(user, results); }}
              className="bg-summa-fuchsia text-white py-3 rounded-[16px] font-bold text-lg md:text-xl hover:bg-opacity-90 transition shadow-xl transform hover:-translate-y-1 active:scale-95"
            >
              Download PDF 📄
            </button>
            <button
              onClick={() => { playSound('click'); onRestart(); }}
              className="bg-summa-light text-summa-indigo py-2 rounded-[16px] font-bold text-base md:text-lg hover:bg-gray-200 transition border-2 border-summa-indigo/10"
            >
              Nog een keer
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 border border-gray-100 rounded-[20px] shadow-sm flex flex-col overflow-hidden">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-summa-indigo text-white">
              <tr>
                <th className="p-2 md:p-3 font-serif">Lvl</th>
                <th className="p-2 md:p-3 font-serif">Type</th>
                <th className="p-2 md:p-3 font-serif">Pog.</th>
                <th className="p-2 md:p-3 font-serif">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {results.map((res, i) => (
                <tr key={i} className="hover:bg-summa-light transition">
                  <td className="p-2 md:p-3 font-bold text-summa-indigo">{res.levelId}</td>
                  <td className="p-2 md:p-3 text-gray-500">{res.type}</td>
                  <td className="p-2 md:p-3 text-gray-500">{res.attempts}</td>
                  <td className="p-2 md:p-3 text-summa-yellow">{'⭐'.repeat(res.stars)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 text-summa-indigo font-serif font-bold text-lg shrink-0">
        SUMMA COLLEGE
      </div>
    </div>
  );
};

export default Results;
