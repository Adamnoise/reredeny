import React, { useState, useRef } from 'react';
import { Cpu, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';

export interface InteractiveHoverCardProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  glowColor?: 'blue' | 'violet' | 'emerald' | 'amber';
  interactive3d?: boolean;
  showIcon?: boolean;
}

export const InteractiveHoverCard: React.FC<InteractiveHoverCardProps> = ({
  title = 'High-Precision Compiler',
  subtitle = 'Zero-latency dynamic compilation with WebAssembly and AST-driven module isolation.',
  badgeText = 'v2.4 Ready',
  glowColor = 'blue',
  interactive3d = true,
  showIcon = true,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive3d || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const glowGradients = {
    blue: 'from-blue-600/30 via-indigo-500/10 to-transparent',
    violet: 'from-violet-600/30 via-purple-500/10 to-transparent',
    emerald: 'from-emerald-600/30 via-teal-500/10 to-transparent',
    amber: 'from-amber-600/30 via-orange-500/10 to-transparent',
  };

  return (
    <div
      className="perspective-1000 w-full max-w-md"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: interactive3d
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
            : 'none',
          transition: 'transform 150ms ease-out',
        }}
        className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl group transition-all duration-300 hover:border-blue-500/40"
      >
        {/* Specular Glare light overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
          }}
        />

        {/* Ambient background glow */}
        <div className={`absolute -inset-1 bg-gradient-to-br ${glowGradients[glowColor]} opacity-60 rounded-2xl blur-xl group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {showIcon && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-6 h-6" />
              </div>
            )}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {badgeText}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
              {title}
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{subtitle}</p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 100% Type-Safe
            </span>
            <span>0.8ms Render</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHoverCard;
