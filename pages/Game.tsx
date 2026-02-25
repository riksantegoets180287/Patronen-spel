
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Level, User, LevelResult } from '../types';
import Slot from '../components/Slot';
import HelpOverlay from '../components/HelpOverlay';
import { playSound } from '../utils/sounds';
import { startConfetti } from '../utils/confetti';

interface GameProps {
  user: User;
  levels: Level[];
  onFinish: (results: LevelResult[]) => void;
  onLogout: () => void;
}

const Game: React.FC<GameProps> = ({ user, levels, onFinish, onLogout }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [results, setResults] = useState<LevelResult[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [rolling, setRolling] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [fillProgress, setFillProgress] = useState<string[]>([]);
  const [showImprovement, setShowImprovement] = useState(false);
  
  const cheatCounter = useRef(0);
  const level = levels[currentLevelIdx];

  const calculateStars = (pogingen: number) => {
    if (pogingen === 1) return 3;
    if (pogingen === 2) return 2;
    return 1;
  };

  const handleCorrect = useCallback(() => {
    playSound('correct');
    startConfetti();
    const stars = calculateStars(attempts);
    const newResult: LevelResult = {
      levelId: level.id,
      attempts,
      stars,
      type: level.type
    };
    
    setFeedback('Goed gedaan!');
    setShowImprovement(true);
    setResults(prev => [...prev, newResult]);
  }, [attempts, level.id, level.type]);

  const handleWrong = () => {
    playSound('wrong');
    setFeedback('Niet goed. Probeer nog eens.');
    setAttempts(prev => prev + 1);
    if (attempts >= 2) {
      if (level.type === 'ODD') setHighlightIdx(level.correct);
      else setHighlightIdx(0);
    }
  };

  const nextLevel = useCallback(() => {
    playSound('click');
    if (currentLevelIdx < levels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setAttempts(1);
    } else {
      onFinish(results);
    }
  }, [currentLevelIdx, levels.length, onFinish, results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '9') {
        cheatCounter.current += 1;
        if (cheatCounter.current >= 5) {
          cheatCounter.current = 0;
          if (!showImprovement && !rolling) {
            handleCorrect();
          } else if (showImprovement) {
            nextLevel();
          }
        }
      } else {
        cheatCounter.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCorrect, nextLevel, showImprovement, rolling]);

  useEffect(() => {
    setRolling(true);
    setFeedback(null);
    setHighlightIdx(null);
    setShowImprovement(false);
    setFillProgress([]);
    const timer = setTimeout(() => {
      setRolling(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [currentLevelIdx]);

  const checkAnswer = (answer: any) => {
    if (level.type === 'FILL') {
      const nextProgress = [...fillProgress, answer];
      setFillProgress(nextProgress);
      const questionCount = level.pattern.filter(p => p === '?').length;
      if (nextProgress.length === questionCount) {
        const isAllCorrect = nextProgress.every((val, i) => val === level.correct[i]);
        if (isAllCorrect) handleCorrect();
        else {
          handleWrong();
          setFillProgress([]);
        }
      } else {
        playSound('click');
      }
      return;
    }

    if (answer === level.correct) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-summa-light overflow-hidden">
      <header className="bg-summa-indigo p-2 md:p-3 flex justify-between items-center shadow-lg shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-xl md:text-2xl font-serif font-bold text-summa-white">SUMMA</div>
          <div className="h-6 w-px bg-white/30"></div>
          <div className="text-summa-white font-medium opacity-90 hidden sm:block text-sm">
            {user.name} • {user.classGroup}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { playSound('click'); setHelpOpen(true); }}
            className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-lg font-bold hover:bg-white/20 transition text-sm"
          >
            Hulp
          </button>
          <button 
            onClick={() => { playSound('click'); onLogout(); }}
            className="bg-summa-fuchsia text-white px-3 py-1 rounded-lg font-bold hover:bg-opacity-90 transition shadow-md text-sm"
          >
            Afmelden
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 min-h-0 overflow-hidden">
        <div className="w-full max-w-5xl bg-white rounded-[16px] p-3 md:p-4 shadow-2xl relative overflow-hidden flex flex-col max-h-full">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-summa-indigo shrink-0"></div>

          <div className="text-center mb-2 shrink-0">
            <h2 className="text-lg md:text-xl font-serif font-bold text-summa-indigo">Level {level.id}: {level.title}</h2>
            <p className="text-sm md:text-base text-gray-500 font-medium">{level.instruction}</p>
          </div>

          <div className="bg-summa-light p-3 md:p-4 rounded-[12px] flex justify-center gap-2 mb-3 overflow-x-auto shadow-inner border border-gray-200 shrink-0 min-h-[80px] md:min-h-[120px] items-center">
            {level.pattern.map((emoji, i) => {
              let displayEmoji = emoji;
              if (emoji === '?') {
                const questionIdx = level.pattern.slice(0, i).filter(p => p === '?').length;
                displayEmoji = fillProgress[questionIdx] || '?';
              }

              return (
                <Slot
                  key={i}
                  emoji={displayEmoji}
                  rolling={rolling}
                  highlight={highlightIdx === i || (highlightIdx === 0 && i < 4)}
                  isCorrect={showImprovement && level.type === 'ODD' && i === level.correct}
                  onClick={level.type === 'ODD' && !showImprovement ? () => checkAnswer(i) : undefined}
                />
              );
            })}
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden px-2">
            <div className="h-full flex flex-col justify-center">
              {!showImprovement && !rolling && (
                <div className="flex flex-col items-center gap-4 animate-fade-in py-1">
                  {level.type === 'FILL' && fillProgress.length > 0 && (
                    <div className="text-base font-bold text-summa-fuchsia bg-red-50 px-4 py-1 rounded-full border border-red-100">
                      Gekozen: {fillProgress.join(' ')}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap justify-center gap-3 max-h-[200px] overflow-y-auto custom-scrollbar p-2">
                    {level.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => checkAnswer(opt)}
                        className="w-14 h-14 md:w-16 md:h-16 bg-white border-2 border-gray-200 rounded-[10px] text-2xl md:text-3xl hover:border-summa-indigo hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center shrink-0"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showImprovement && (
                <div className="bg-summa-aqua/5 border-2 border-summa-aqua/30 p-3 md:p-4 rounded-[16px] text-center animate-bounce-in flex flex-col items-center">
                  <p className="text-xl md:text-2xl font-serif font-bold text-summa-green mb-2">{feedback}</p>
                  
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm border border-gray-100 w-full max-w-xl mb-3">
                    <p className="text-xs font-bold text-summa-indigo uppercase tracking-wider mb-0.5 text-left">Uitleg:</p>
                    <p className="text-sm md:text-base text-gray-700 text-left">
                      {level.ruleLabel ? `Dit is een ${level.ruleLabel} patroon.` : ''}
                      {level.type === 'ODD' ? 'Dit plaatje was anders dan de rest.' : ''}
                      {!level.ruleLabel && level.type !== 'ODD' ? 'Goed gekeken naar de rij!' : ''}
                    </p>
                  </div>
                  
                  <button
                    onClick={nextLevel}
                    className="px-6 py-2 bg-summa-indigo text-white text-base md:text-lg font-bold rounded-xl shadow-xl hover:bg-opacity-90 transition transform hover:scale-105 active:scale-95 shrink-0"
                  >
                    Volgende Level
                  </button>
                </div>
              )}

              {feedback && !showImprovement && (
                <div className="text-center py-1 absolute bottom-4 left-0 right-0 pointer-events-none">
                  <p className="text-xl font-bold text-summa-fuchsia animate-pulse">{feedback}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-4 shrink-0">
          <div className="bg-white px-4 py-1.5 rounded-full shadow-md text-xs font-bold border-l-4 border-summa-blue">
            POGING: <span className="text-summa-blue">{attempts}</span>
          </div>
          <div className="bg-summa-indigo text-white px-4 py-1.5 rounded-full shadow-md text-xs font-bold">
            LEVEL {currentLevelIdx + 1} / 20
          </div>
        </div>
      </main>

      <HelpOverlay isOpen={helpOpen} onClose={() => { playSound('click'); setHelpOpen(false); }} />
      
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        
        @keyframes bounce-in {
          0% { transform: scale(0.95); opacity: 0; }
          70% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
};

export default Game;
