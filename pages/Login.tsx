
import React, { useState } from 'react';
import { User } from '../types';
import { playSound } from '../utils/sounds';

interface LoginProps {
  onLogin: (user: User) => void;
  onGoAdmin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoAdmin }) => {
  const [name, setName] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    playSound('click');
    if (!name.trim() || !classGroup.trim()) {
      setError('Vul alles in.');
      playSound('wrong');
      return;
    }
    onLogin({ name, classGroup });
  };

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-summa-light p-4 overflow-hidden">
      <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-2xl max-w-md w-full border-t-[12px] border-summa-indigo relative overflow-hidden">
        {/* Summa Corner Detail */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-summa-fuchsia rounded-full opacity-10"></div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif font-bold text-summa-indigo mb-2 leading-tight">SUMMA</h1>
          <h2 className="text-lg font-bold text-gray-400 tracking-widest uppercase">Patroon Slots</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-summa-indigo uppercase tracking-wider mb-2">Je naam</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 bg-summa-light border-2 border-transparent rounded-[12px] focus:outline-none focus:border-summa-indigo transition text-lg"
              placeholder="Typ je naam..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-summa-indigo uppercase tracking-wider mb-2">Klas</label>
            <input
              type="text"
              value={classGroup}
              onChange={(e) => setClassGroup(e.target.value)}
              className="w-full px-5 py-3 bg-summa-light border-2 border-transparent rounded-[12px] focus:outline-none focus:border-summa-indigo transition text-lg"
              placeholder="Je klas..."
            />
          </div>

          {error && <p className="text-summa-fuchsia text-center font-bold animate-pulse text-sm">{error}</p>}

          <button
            onClick={handleStart}
            className="w-full py-4 bg-summa-indigo text-white font-bold text-xl rounded-[12px] shadow-xl hover:bg-opacity-90 transition transform hover:scale-[1.02] active:scale-95"
          >
            Start Spel
          </button>
        </div>
      </div>

      <button
        onClick={() => { playSound('click'); onGoAdmin(); }}
        className="mt-6 text-gray-400 hover:text-summa-indigo transition font-medium border-b border-transparent hover:border-summa-indigo"
      >
        Docent Login
      </button>

      <div className="mt-8 text-sm text-gray-400 font-medium">
        Samen kun je meer.
      </div>
    </div>
  );
};

export default Login;
