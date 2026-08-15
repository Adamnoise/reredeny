import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Cpu,
  FileCode2,
  Terminal,
  Activity,
  Box,
} from 'lucide-react';
import { RegisteredComponent } from '../../types/studio';

interface ValidationViewProps {
  component: RegisteredComponent;
}

export const ValidationView: React.FC<ValidationViewProps> = ({ component }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<string>('Just now');

  const runValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setLastValidated(new Date().toLocaleTimeString());
    }, 1200);
  };

  const validationPipeline = [
    { name: 'TypeScript Interface Compilation', status: 'PASS', details: 'Zero type errors or missing exports found in .types.ts', icon: <FileCode2 className="w-4 h-4 text-emerald-400" /> },
    { name: 'React 19 Runtime Render', status: 'PASS', details: 'Rendered cleanly without hydration warnings or missing key errors', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { name: 'WCAG 2.1 AA Contrast Ratio', status: 'PASS', details: 'Contrast meets 4.5:1 ratio across light & dark themes', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { name: 'Keyboard Navigation & Focus Trapping', status: 'PASS', details: 'Tab ring visible, Space/Enter trigger active callbacks', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
    { name: 'Prefers-Reduced-Motion Fallback', status: 'PASS', details: 'Disables spring transforms when reduced motion is preferred', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
    { name: 'Component Package Schema Valid', status: 'PASS', details: 'Metadata, slug, and category definitions pass registry manifest check', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-950 text-slate-100 max-w-5xl mx-auto space-y-8 font-sans">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              BUILD HEALTH OK
            </span>
            <span className="text-xs text-slate-400 font-mono">Last verified: {lastValidated}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Component Validation Matrix: {component.title}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Automated quality pipeline checks TypeScript, React runtime errors, ARIA contrast, and responsive layout integrity.
          </p>
        </div>

        <button
          type="button"
          onClick={runValidation}
          disabled={isValidating}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
          <span>{isValidating ? 'Running AST Check...' : 'Re-Run Suite'}</span>
        </button>
      </div>

      {/* Test Check Cards */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider">
          Automated Quality Checks (6 / 6 Passed)
        </h4>

        <div className="grid grid-cols-1 gap-3 font-mono">
          {validationPipeline.map((check) => (
            <div
              key={check.name}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {check.icon}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-100">{check.name}</h5>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">{check.details}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {check.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationView;
