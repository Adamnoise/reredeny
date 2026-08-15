import React, { useState } from 'react';

export interface PremiumToggleProps {
  label?: string;
  sublabel?: string;
  checked?: boolean;
  disabled?: boolean;
  variant?: 'premium' | 'emerald' | 'amber' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  glowEffect?: boolean;
  soundTactile?: boolean;
  onChange?: (checked: boolean) => void;
}

export const PremiumToggle: React.FC<PremiumToggleProps> = ({
  label = 'Real-Time Sync',
  sublabel = 'Streams live prop mutations',
  checked: controlledChecked,
  disabled = false,
  variant = 'premium',
  size = 'md',
  glowEffect = true,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(controlledChecked ?? true);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  const variantColors = {
    premium: 'bg-gradient-to-r from-blue-600 to-violet-600 shadow-blue-500/25',
    emerald: 'bg-emerald-500 shadow-emerald-500/25',
    amber: 'bg-amber-500 shadow-amber-500/25',
    cyan: 'bg-cyan-500 shadow-cyan-500/25',
  };

  const sizeClasses = {
    sm: { track: 'w-10 h-5 p-0.5', thumb: 'w-4 h-4', translate: 'translate-x-5' },
    md: { track: 'w-14 h-7 p-1', thumb: 'w-5 h-5', translate: 'translate-x-7' },
    lg: { track: 'w-18 h-9 p-1', thumb: 'w-7 h-7', translate: 'translate-x-9' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-xl max-w-sm w-full select-none">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          {label}
          {isChecked && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              ACTIVE
            </span>
          )}
        </span>
        {sublabel && <span className="text-xs text-slate-400 mt-0.5">{sublabel}</span>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative inline-flex items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        } ${currentSize.track} ${
          isChecked
            ? `${variantColors[variant]} ${glowEffect ? 'shadow-lg' : ''}`
            : 'bg-slate-800 border border-slate-700'
        }`}
      >
        <span
          className={`pointer-events-none inline-block rounded-full bg-white shadow-md transform transition-transform duration-300 ease-spring ${
            currentSize.thumb
          } ${isChecked ? currentSize.translate : 'translate-x-0'}`}
        >
          {/* Inner core pulse dot */}
          <span
            className={`block w-full h-full rounded-full transition-colors duration-200 ${
              isChecked ? 'bg-blue-600/20 scale-75' : 'bg-slate-300/40 scale-50'
            }`}
          />
        </span>
      </button>
    </div>
  );
};

export default PremiumToggle;
