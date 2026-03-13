'use client';
import { useState } from 'react';

export default function RuhAI() {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('Vista ERP');
  const [videoUrl, setVideoUrl] = useState('');

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, context }),
    });
    const data = await res.json();
    setVideoUrl(data.url);
  };

  return (
    <div className="p-10 bg-slate-900 text-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">Ruh.ai | Instant Demo Engine</h1>
      <div className="space-y-4 max-w-xl">
        <input 
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          placeholder="What should the video show?"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input 
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          placeholder="ERP Context (e.g. Vista, Epic, Procore)"
          onChange={(e) => setContext(e.target.value)}
        />
        <button onClick={generate} className="bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-500">
          Generate 30s Demo
        </button>
      </div>
      {videoUrl && <video src={videoUrl} controls className="mt-10 rounded-xl shadow-2xl w-full max-w-3xl" />}
    </div>
  );
}
