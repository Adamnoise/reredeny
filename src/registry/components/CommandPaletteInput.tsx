import React, { useState } from 'react';
import { Search, Command, ArrowRight, Terminal } from 'lucide-react';

export interface CommandPaletteInputProps {
  placeholder?: string;
  shortcutHint?: string;
  hasGlow?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

export const CommandPaletteInput: React.FC<CommandPaletteInputProps> = ({
  placeholder = 'Search components, props, hooks, AST definitions...',
  shortcutHint = '⌘ K',
  hasGlow = true,
  value: controlledValue,
  onChange,
}) => {
  const [val, setVal] = useState(controlledValue ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setVal(next);
    onChange?.(next);
  };

  return (
    <div className={`relative w-full max-w-xl group`}>
      {hasGlow && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-300 blur-md pointer-events-none" />
      )}
      <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 shadow-2xl focus-within:border-blue-500/60 transition-all duration-200">
        <Search className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors mr-3 shrink-0" />
        <input
          type="text"
          value={controlledValue !== undefined ? controlledValue : val}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
        />
        <div className="flex items-center gap-2 ml-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </span>
          <button
            type="button"
            className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandPaletteInput;
