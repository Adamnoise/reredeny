import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export interface RippleButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
  onClick?: () => void;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  label = 'Deploy to Studio Registry',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  showIcon = true,
  onClick,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30 hover:shadow-blue-500/40',
    secondary: 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-750 hover:border-slate-600',
    accent: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35',
    ghost: 'bg-transparent text-slate-300 border border-slate-800 hover:bg-slate-800/60 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 font-medium',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 font-semibold',
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`relative overflow-hidden inline-flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
        variants[variant]
      } ${sizes[size]} ${disabled ? 'opacity-40 cursor-not-allowed active:scale-100' : 'cursor-pointer'}`}
    >
      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            animationDuration: '600ms',
          }}
        />
      ))}

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : showIcon ? (
        <Sparkles className="w-4 h-4 text-current" />
      ) : null}

      <span>{label}</span>
    </button>
  );
};

export default RippleButton;
