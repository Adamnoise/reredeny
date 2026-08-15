import React, { useState } from 'react';
import { Layers, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface MotionModalProps {
  title?: string;
  description?: string;
  isOpen?: boolean;
  blurBackdrop?: boolean;
  accentColor?: 'blue' | 'violet' | 'emerald';
  confirmText?: string;
  cancelText?: string;
}

export const MotionModal: React.FC<MotionModalProps> = ({
  title = 'Deploy Component Registry Update',
  description = 'You are about to publish 7 production component manifests to the studio package stream. This step verifies AST integrity.',
  isOpen: initialIsOpen = true,
  blurBackdrop = true,
  accentColor = 'blue',
  confirmText = 'Verify & Deploy',
  cancelText = 'Cancel',
}) => {
  const [open, setOpen] = useState(initialIsOpen);
  const [confirmed, setConfirmed] = useState(false);

  if (!open) {
    return (
      <div className="flex flex-col items-center justify-center p-6 gap-3 bg-slate-900 border border-slate-800 rounded-2xl text-center">
        <p className="text-xs text-slate-400 font-mono">Motion Modal Dismissed</p>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setConfirmed(false);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          Re-open Studio Modal
        </button>
      </div>
    );
  }

  const accentStyles = {
    blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    violet: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  };

  return (
    <div className={`relative w-full max-w-lg p-6 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 transform scale-100`}>
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className={`p-3 rounded-xl border ${accentStyles[accentColor]}`}>
          <Layers className="w-6 h-6" />
        </div>
        <button
          type="button"
          aria-label="Close modal"
          onClick={() => setOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      {confirmed ? (
        <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          AST validation passed. Registry deployed successfully!
        </div>
      ) : (
        <div className="mt-6 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          Package Hash: <span className="text-slate-200">0x8f3c...b291</span> (Checked)
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-300 hover:bg-slate-800 transition"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="px-5 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default MotionModal;
