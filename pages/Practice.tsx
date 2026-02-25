
import React, { useState } from 'react';
import Slot from '../components/Slot';

interface PracticeProps {
  onFinish: () => void;
}

const Practice: React.FC<PracticeProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState('');

  const exercises = [
    {
      id: 1,
      text: 'Welke emoji past hier?',
      pattern: ['🚗', '🚲', '🚗', '?'],
      options: ['🚗', '🚲'],
      correct: '🚲'
    },
    {
      id: 2,
      text: 'Welke is anders?',
      pattern: ['🍎', '🍎', '🍌', '🍎'],
      options: [],
      correct: 2 // index
    },
    {
      id: 3,
      text: 'Welke komt nu?',
      pattern: ['🤔', '🤔', '😅', '🤔', '🤔', '?'],
      options: ['🤔', '😅'],
      correct: '😅'
    }
  ];

  const current = exercises[step - 1];

  const handleChoice = (val: any) => {
    if (val === current.correct) {
      setFeedback('Goed zo!');
      setTimeout(() => {
        setFeedback('');
        if (step < 3) setStep(step + 1);
        else onFinish();
      }, 1000);
    } else {
      setFeedback('Probeer nog eens.');
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-summa-light p-6 overflow-hidden">
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl max-w-2xl w-full text-center border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-summa-indigo mb-2">Oefenen</h1>
        <p className="text-lg text-gray-500 mb-8">Kijk naar de emoji's. Zie je een patroon?</p>

        <div className="flex justify-center gap-2 mb-8 overflow-x-auto py-2">
          {current.pattern.map((emoji, i) => (
            <Slot 
              key={i} 
              emoji={emoji} 
              onClick={step === 2 ? () => handleChoice(i) : undefined} 
            />
          ))}
        </div>

        <p className="text-xl font-bold mb-6 text-summa-indigo">{current.text}</p>

        <div className="flex justify-center gap-4 flex-wrap">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoice(opt)}
              className="px-6 py-4 bg-summa-light border-2 border-gray-200 rounded-xl text-3xl hover:border-summa-indigo transition transform hover:-translate-y-1 active:scale-95 shadow-sm"
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <p className={`mt-6 text-2xl font-bold ${feedback.includes('Goed') ? 'text-summa-green' : 'text-summa-fuchsia'}`}>
            {feedback}
          </p>
        )}

        <div className="mt-10 text-gray-400 font-bold">
          Stap {step} van 3
        </div>
      </div>
    </div>
  );
};

export default Practice;
