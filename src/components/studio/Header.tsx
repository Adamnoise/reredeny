import React from 'react';
import {
  Box,
  Eye,
  Code2,
  FileText,
  Activity,
  Plus,
  Search,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ViewMode, StudioState } from '../../types/studio';

interface HeaderProps {
  state: StudioState;
  onViewChange: (view: ViewMode) => void;
  onOpenCreator: () => void;
  componentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onViewChange,
  onOpenCreator,
  componentCount,
}) => {
  const views: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'preview', label: 'Interactive Preview', icon: <Eye className="w-4 h-4" /> },
    { id: 'code', label: 'Multi-File Code', icon: <Code2 className="w-4 h-4" /> },
    { id: 'docs', label: 'Automated Spec', icon: <FileText className="w-4 h-4" /> },
    { id: 'motion', label: 'Motion Tokens', icon: <Zap className="w-4 h-4" /> },
    { id: 'validation', label: 'A11y & Health', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800/90 px-4 flex items-center justify-between gap-4 select-none shrink-0 z-30">
      {/* Brand & Studio Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Box className="w-4 h-4 text-blue-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-slate-100 font-mono">
              PREMIUM COMPONENT STUDIO
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              PRO IDE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.4.0 Engine
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-slate-500" />
              main (42 components)
            </span>
          </div>
        </div>
      </div>

      {/* Workspace View Mode Selector */}
      <nav className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
        {views.map((v) => {
          const isActive = state.activeView === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onViewChange(v.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {v.icon}
              <span>{v.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action CTA */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenCreator}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition hover:scale-[1.02] active:scale-95 border border-blue-400/30"
        >
          <Plus className="w-4 h-4" />
          <span>New Component</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
