import React from 'react';
import {
  FileText,
  ShieldCheck,
  Code2,
  Box,
  Sliders,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { RegisteredComponent } from '../../types/studio';

interface AutomatedDocsViewProps {
  component: RegisteredComponent;
}

export const AutomatedDocsView: React.FC<AutomatedDocsViewProps> = ({ component }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-950 text-slate-100 max-w-5xl mx-auto space-y-8 font-sans">
      {/* Component Header Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Box className="w-48 h-48 text-blue-500" />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {component.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            v{component.version} {component.status}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
            Author: {component.metadata.author}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">{component.title}</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
          {component.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {component.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          System Overview
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed font-sans">
          {component.documentation.overview}
        </p>
      </section>

      {/* Usage Code Snippet */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          Quick Start Usage
        </h3>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-blue-300 overflow-x-auto">
          {component.documentation.usageSnippet}
        </pre>
      </section>

      {/* Props Reference Table */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          Props API Reference
        </h3>

        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Category</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {component.propSchema.map((p) => (
                <tr key={p.name} className="hover:bg-slate-850/50">
                  <td className="p-3 font-bold text-blue-400">{p.name}</td>
                  <td className="p-3 text-amber-400">{p.type}</td>
                  <td className="p-3 text-slate-400">{p.category}</td>
                  <td className="p-3 text-emerald-400">{JSON.stringify(p.defaultValue)}</td>
                  <td className="p-3 text-slate-400 font-sans text-xs">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility & Reduced Motion */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Accessibility & WCAG 2.1 Notes
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          {component.documentation.accessibilityNotes.map((note, idx) => (
            <li key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AutomatedDocsView;
