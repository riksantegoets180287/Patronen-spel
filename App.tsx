
import React, { useState, useEffect } from 'react';
import { User, Level, LevelResult } from './types';
import { getLevels, saveLevels } from './storage';
import Login from './pages/Login';
import Practice from './pages/Practice';
import Game from './pages/Game';
import Results from './pages/Results';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LevelEditor from './pages/LevelEditor';

type View = 'LOGIN' | 'PRACTICE' | 'GAME' | 'RESULTS' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD' | 'ADMIN_EDITOR';

const App: React.FC = () => {
  const [view, setView] = useState<View>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [levels, setLevels] = useState<Level[]>(getLevels());
  const [results, setResults] = useState<LevelResult[]>([]);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);

  const refreshLevels = () => setLevels(getLevels());

  const handleLogin = (u: User) => {
    setUser(u);
    setView('PRACTICE');
  };

  const handlePracticeFinish = () => setView('GAME');

  const handleGameFinish = (res: LevelResult[]) => {
    setResults(res);
    setView('RESULTS');
  };

  const handleRestart = () => {
    setResults([]);
    setView('GAME');
  };

  const handleLogout = () => {
    setUser(null);
    setResults([]);
    setView('LOGIN');
  };

  const handleGoAdmin = () => setView('ADMIN_LOGIN');

  const handleAdminAuth = () => setView('ADMIN_DASHBOARD');

  const handleEditLevel = (l: Level) => {
    setEditingLevel(l);
    setView('ADMIN_EDITOR');
  };

  const handleSaveLevel = (updated: Level) => {
    const updatedLevels = levels.map(l => l.id === updated.id ? updated : l);
    saveLevels(updatedLevels);
    setLevels(updatedLevels);
    setView('ADMIN_DASHBOARD');
  };

  return (
    <>
      {view === 'LOGIN' && <Login onLogin={handleLogin} onGoAdmin={handleGoAdmin} />}
      
      {view === 'PRACTICE' && <Practice onFinish={handlePracticeFinish} />}
      
      {view === 'GAME' && user && (
        <Game 
          user={user} 
          levels={levels} 
          onFinish={handleGameFinish} 
          onLogout={handleLogout} 
        />
      )}
      
      {view === 'RESULTS' && user && (
        <Results 
          user={user} 
          results={results} 
          onRestart={handleRestart} 
        />
      )}

      {view === 'ADMIN_LOGIN' && (
        <AdminLogin 
          onLogin={handleAdminAuth} 
          onCancel={() => setView('LOGIN')} 
        />
      )}

      {view === 'ADMIN_DASHBOARD' && (
        <AdminDashboard 
          levels={levels} 
          onEdit={handleEditLevel} 
          onLogout={handleLogout} 
          onRefresh={refreshLevels}
        />
      )}

      {view === 'ADMIN_EDITOR' && editingLevel && (
        <LevelEditor 
          level={editingLevel} 
          onSave={handleSaveLevel} 
          onCancel={() => setView('ADMIN_DASHBOARD')} 
        />
      )}
    </>
  );
};

export default App;
