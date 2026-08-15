import React, { useState } from 'react';
import { Zap, Play, RotateCcw, Copy, Check, Sparkles, Activity } from 'lucide-react';

export const MotionTokensView: React.FC = () => {
  const [activeDuration, setActiveDuration] = useState('250ms');
  const [activeEasing, setActiveEasing] = useState('cubic-bezier(0.34, 1.56, 0.64, 1)');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const durations = [
    { name: '--duration-fast', val: '150ms', desc: 'Micro-interactions, icons, ripples' },
    { name: '--duration-normal', val: '250ms', desc: 'Default UI switches, tabs, cards' },
    { name: '--duration-slow', val: '400ms', desc: 'Modal overlays, drawers, full section reveals' },
  ];

  const easings = [
    { name: '--ease-standard', val: 'cubic-bezier(0.2, 0, 0, 1)', desc: 'Smooth linear deceleration' },
    { name: '--ease-emphasized', val: 'cubic-bezier(0.2, 0, 0, 1.25)', desc: 'Slight overshoot for tactile response' },
    { name: '--ease-spring', val: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Playful spring rebound' },
  ];

  const handlePlayAnimation = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const copyCSSRule = () => {
    const css = `transition: all ${activeDuration} ${activeEasing};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-950 text-slate-100 max-w-5xl mx-auto space-y-8 font-sans">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-slate-950 border border-violet-500/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Studio Motion Tokens & Physics</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Interactive motion lab. Test easing curves, durations, and spring physics for high-fidelity component transitions.
        </p>
      </div>

      {/* Interactive Ball / Card Physics Previewer */}
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-mono text-slate-200">Interactive Motion Test Canvas</h4>
            <p className="text-xs text-slate-400">Current Token Rule: <code className="text-blue-400 font-mono">transition: transform {activeDuration} {activeEasing}</code></p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlayAnimation}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/25 transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Trigger Physics</span>
            </button>
            <button
              type="button"
              onClick={copyCSSRule}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-2 border border-slate-700 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy CSS'}</span>
            </button>
          </div>
        </div>

        {/* Live Motion Physics Track */}
        <div className="relative h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden flex items-center">
          <div className="absolute inset-0 canvas-grid-dots opacity-40 pointer-events-none" />
          <div
            className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 border border-blue-400/40 shadow-2xl flex items-center justify-center text-white text-xs font-mono font-bold transition-all ${
              isPlaying ? 'translate-x-[500px] rotate-180 scale-110 shadow-blue-500/50' : 'translate-x-0 rotate-0 scale-100'
            }`}
            style={{
              transitionDuration: activeDuration,
              transitionTimingFunction: activeEasing,
            }}
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Motion Token Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Durations */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            Duration Tokens
          </h4>
          <div className="space-y-2">
            {durations.map((d) => (
              <button
                key={d.name}
                type="button"
                onClick={() => setActiveDuration(d.val)}
                className={`w-full p-3 rounded-xl text-left border transition font-mono text-xs flex items-center justify-between ${
                  activeDuration === d.val
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold">{d.name}</div>
                  <div className="text-[10px] text-slate-500 font-sans mt-0.5">{d.desc}</div>
                </div>
                <span className="font-bold text-amber-400">{d.val}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Easing Curves */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
            Easing Curves
          </h4>
          <div className="space-y-2">
            {easings.map((e) => (
              <button
                key={e.name}
                type="button"
                onClick={() => setActiveEasing(e.val)}
                className={`w-full p-3 rounded-xl text-left border transition font-mono text-xs flex items-center justify-between ${
                  activeEasing === e.val
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold">{e.name}</div>
                  <div className="text-[10px] text-slate-500 font-sans mt-0.5">{e.desc}</div>
                </div>
                <span className="font-bold text-emerald-400 text-[10px] truncate max-w-[120px]">{e.val}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionTokensView;
