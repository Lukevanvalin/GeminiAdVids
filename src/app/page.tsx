'use client';
import { useState } from 'react';

export default function RuhAI() {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('Vista ERP');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setVideoUrl(''); // Clear old video
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, context }),
      });
      
      if (!res.ok) throw new Error("API Timeout or Key Issue");

      const data = await res.json();
      if (data.url) {
        setVideoUrl(data.url);
      } else {
        alert("Error: " + (data.error || "No video returned"));
      }
    } catch (e) {
      console.error(e);
      alert("The request timed out. Please check your Vercel Function Timeout settings.");
    }
    setLoading(false);
  };

  return (
    <div className="p-10 bg-slate-900 text-white min-h-screen font-sans">
      <h1 className="text-4xl font-black mb-2 tracking-tight text-blue-400">Ruh.ai</h1>
      <p className="text-slate-400 mb-8">Instant ERP Demo Engine</p>
      
      <div className="space-y-4 max-w-xl bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Step 1: Target ERP</label>
          <input 
            className="w-full mt-1 p-3 bg-slate-900 rounded-lg border border-slate-700 focus:border-blue-500 outline-none"
            placeholder="e.g. Vista ERP"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Step 2: Scene Description</label>
          <textarea 
            className="w-full mt-1 p-3 bg-slate-900 rounded-lg border border-slate-700 h-32 focus:border-blue-500 outline-none"
            placeholder="Describe the demo scene..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button 
          onClick={generate} 
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20'}`}
        >
          {loading ? '🎬 Gemini is filming (approx 60s)...' : 'Generate Demo'}
        </button>
      </div>

      {videoUrl && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-green-400">●</span> Your Custom Demo
          </h2>
          <video src={videoUrl} controls autoPlay className="rounded-2xl shadow-2xl w-full max-w-4xl border border-slate-700" />
        </div>
      )}
    </div>
  );
}