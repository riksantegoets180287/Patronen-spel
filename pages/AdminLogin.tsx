
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (pass === 'SARKSARK') {
      onLogin();
    } else {
      setError('Verkeerd wachtwoord.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-summa-dark p-6">
      <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Docent Inloggen</h2>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-summa-red outline-none"
          placeholder="Wachtwoord..."
        />
        {error && <p className="text-summa-red text-center mb-4 font-bold">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-summa-red text-white py-3 rounded-xl font-bold hover:bg-red-700 transition mb-4"
        >
          Inloggen
        </button>
        <button
          onClick={onCancel}
          className="w-full text-gray-500 hover:text-summa-dark"
        >
          Terug naar spel
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
