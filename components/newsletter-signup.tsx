"use client";

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Takk for at du meldte deg på!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Noe gikk galt');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Kunne ikke melde deg på. Prøv igjen senere.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-xl font-bold mb-4">
        Meld deg på nyhetsbrevet vårt
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.no"
            required
            disabled={status === 'loading'}
            className="w-full sm:w-[300px] px-4 py-2 rounded font-['JetBrains_Mono',monospace] text-gray-900 bg-white border-2 border-[#e3160b] focus:outline-none focus:ring-2 focus:ring-[#e3160b]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-[#e3160b] text-white font-['JetBrains_Mono',monospace] rounded hover:bg-[#c41309] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Sender...' : 'Meld deg på'}
          </button>
        </div>
        {message && (
          <p className={`font-['JetBrains_Mono',monospace] text-sm ${
            status === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
