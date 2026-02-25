
import React, { useState } from 'react';
import { Level, LevelType, Category } from '../types';
import { EMOJI_SETS, RULES } from '../constants';

interface LevelEditorProps {
  level: Level;
  onSave: (updated: Level) => void;
  onCancel: () => void;
}

const LevelEditor: React.FC<LevelEditorProps> = ({ level, onSave, onCancel }) => {
  const [edited, setEdited] = useState<Level>({ ...level });

  const handlePatternChange = (idx: number, val: string) => {
    const newPattern = [...edited.pattern];
    newPattern[idx] = val;
    setEdited({ ...edited, pattern: newPattern });
  };

  const handleTypeChange = (type: LevelType) => {
    setEdited({ ...edited, type });
  };

  const handleCategoryChange = (cat: Category) => {
    setEdited({ ...edited, category: cat as Category });
  };

  const validateAndSave = () => {
    if (!edited.title || !edited.instruction) {
      alert('Vul de titel en instructie in.');
      return;
    }
    onSave(edited);
  };

  return (
    <div className="min-h-screen bg-summa-light p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border-t-8 border-summa-fuchsia">
        <h2 className="text-3xl font-bold mb-8">Level {edited.id} Bewerken</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block font-bold mb-2">Titel (A1)</label>
            <input
              type="text"
              value={edited.title}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Instructie (A1)</label>
            <input
              type="text"
              value={edited.instruction}
              onChange={(e) => setEdited({ ...edited, instruction: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Opdracht Type</label>
            <select
              value={edited.type}
              onChange={(e) => handleTypeChange(e.target.value as LevelType)}
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="NEXT">Wat komt nu?</option>
              <option value="FILL">Vakjes vullen</option>
              <option value="ODD">Zoek de fout</option>
              <option value="RULE">Regel kiezen</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Categorie</label>
            <select
              value={edited.category}
              onChange={(e) => handleCategoryChange(e.target.value as Category)}
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="smiley">Smileys</option>
              <option value="vehicle">Voertuigen</option>
              <option value="heart">Hartjes</option>
              <option value="mix">Mix</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="block font-bold mb-4">Patroon (Rollen)</label>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border">
            {edited.pattern.map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-1">{i + 1}</span>
                <select
                  value={p}
                  onChange={(e) => handlePatternChange(i, e.target.value)}
                  className="w-12 h-12 text-xl border rounded-lg bg-white appearance-none text-center"
                >
                  <option value="?">?</option>
                  {[...EMOJI_SETS.smiley, ...EMOJI_SETS.vehicle, ...EMOJI_SETS.heart].map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <label className="block font-bold mb-2">Keuzes (Options)</label>
            <p className="text-sm text-gray-400 mb-2">Kies de emoji's die de leerling ziet.</p>
            <div className="flex flex-wrap gap-2">
              {edited.type === 'RULE' ? (
                RULES.map(rule => (
                  <button
                    key={rule}
                    onClick={() => {
                      const opts = edited.options.includes(rule)
                        ? edited.options.filter(o => o !== rule)
                        : [...edited.options, rule];
                      setEdited({ ...edited, options: opts });
                    }}
                    className={`px-3 py-1 rounded border ${edited.options.includes(rule) ? 'bg-summa-fuchsia text-white' : 'bg-white'}`}
                  >
                    {rule}
                  </button>
                ))
              ) : (
                [...EMOJI_SETS.smiley, ...EMOJI_SETS.vehicle, ...EMOJI_SETS.heart].map(e => (
                  <button
                    key={e}
                    onClick={() => {
                      const opts = edited.options.includes(e)
                        ? edited.options.filter(o => o !== e)
                        : [...edited.options, e];
                      setEdited({ ...edited, options: opts });
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded border ${edited.options.includes(e) ? 'bg-summa-fuchsia' : 'bg-white'}`}
                  >
                    {e}
                  </button>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">Het juiste antwoord</label>
            {edited.type === 'NEXT' || edited.type === 'RULE' ? (
              <input
                type="text"
                value={edited.correct}
                onChange={(e) => setEdited({ ...edited, correct: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Correcte emoji of regel..."
              />
            ) : edited.type === 'ODD' ? (
              <input
                type="number"
                value={edited.correct}
                onChange={(e) => setEdited({ ...edited, correct: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border rounded-xl"
                placeholder="Index (0-9)..."
              />
            ) : (
              <p className="text-gray-400">Bij FILL moet de array handmatig kloppen met de ? posities.</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={validateAndSave}
            className="flex-1 bg-summa-fuchsia text-white py-4 rounded-2xl font-bold text-xl hover:bg-opacity-90 transition shadow-lg"
          >
            Opslaan
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-summa-dark py-4 rounded-2xl font-bold text-xl hover:bg-gray-300 transition"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelEditor;
