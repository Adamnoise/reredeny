import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Terminal,
  Activity,
  Keyboard,
  Box,
} from 'lucide-react';
import { RegisteredComponent, StudioState } from '../../types/studio';

interface FooterProps {
  component: RegisteredComponent;
  state: StudioState;
}

export const Footer: React.FC<FooterProps> = ({ component, state }) => {
  return (
    <footer className="h-8 bg-slate-950 border-t border-slate-800/90 px-4 flex items-center justify-between font-mono text-[11px] text-slate-500 select-none shrink-0 z-30">
      {/* Left: Build Health & Active Component */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Vite 8.0 Engine Active
        </span>

        <span className="hidden sm:inline">|</span>

        <span className="flex items-center gap-1.5 text-slate-300">
          <Box className="w-3.5 h-3.5 text-blue-400" />
          <span>Active: {component.title}</span>
          <span className="text-slate-500 text-[10px]">({component.slug})</span>
        </span>
      </div>

      {/* Right: Accessibility Score & Viewport Dimensions */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          A11y {component.metadata.accessibilityScore}%
        </span>

        <span className="hidden sm:inline">|</span>

        <span className="text-slate-400">
          Viewport: {state.viewportDevice.toUpperCase()} ({state.zoomLevel}%)
        </span>

        <span className="hidden md:inline text-slate-600">
          shortcuts: ⌘K (Search)
        </span>
      </div>
    </footer>
  );
};

export default Footer;
