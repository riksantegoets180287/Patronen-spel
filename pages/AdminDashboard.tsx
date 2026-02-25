
import React from 'react';
import { Level } from '../types';
import { resetLevels } from '../storage';

interface AdminDashboardProps {
  levels: Level[];
  onEdit: (level: Level) => void;
  onLogout: () => void;
  onRefresh: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ levels, onEdit, onLogout, onRefresh }) => {
  const handleReset = () => {
    if (confirm('Weet je het zeker? Alle aanpassingen gaan weg.')) {
      resetLevels();
      onRefresh();
    }
  };

  return (
    <div className="min-h-screen bg-summa-light p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-summa-dark">Docent Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="bg-gray-200 text-summa-dark px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
            >
              Reset alles
            </button>
            <button
              onClick={onLogout}
              className="bg-summa-fuchsia text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Log uit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div key={level.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-summa-light px-3 py-1 rounded-full text-sm font-bold">Level {level.id}</span>
                <span className="text-summa-fuchsia font-bold text-xs uppercase">{level.type}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{level.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{level.instruction}</p>
              
              <div className="mt-auto pt-4 border-t flex justify-between items-center">
                <div className="text-2xl">{level.pattern.slice(0, 3).join('')}...</div>
                <button
                  onClick={() => onEdit(level)}
                  className="bg-summa-dark text-white px-4 py-2 rounded-lg font-bold hover:bg-black transition"
                >
                  Bewerken
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
