'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f9ff' }}>
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-8 shadow-xl"
        style={{ background: '#ffffff', border: '1px solid #bae6fd' }}
      >
        <div className="text-center mb-8">
          <p className="text-xl font-bold tracking-wide" style={{ color: '#0c4a6e' }}>ORION PRONOS</p>
          <p className="text-sm mt-1" style={{ color: '#0ea5e9' }}>Panel Administrateur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              color: '#0c4a6e',
              '--tw-ring-color': '#0ea5e9',
              caretColor: '#0ea5e9',
            }}
          />
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: '#0ea5e9' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
