import React, { useState } from 'react';
import { FileText, ShieldCheck, Code as Code2, Box, FileSliders as Sliders, CircleCheck as CheckCircle2, Layers, Sparkles, ArrowRight, Terminal, ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor, Copy, Check, Calendar, User, Package } from 'lucide-react';
import { RegisteredComponent } from '../../types/studio';

interface AutomatedDocsViewProps {
  component: RegisteredComponent;
  allComponents?: RegisteredComponent[];
  onNavigateComponent?: (slug: string) => void;
}

export const AutomatedDocsView: React.FC<AutomatedDocsViewProps> = ({ component, allComponents = [], onNavigateComponent }) => {
  const [copiedFile, setCopiedFile] = useState(false);

  const currentIndex = allComponents.findIndex((c) => c.slug === component.slug);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent = currentIndex >= 0 && currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  // Find related components: same category or shared tags, excluding self
  const relatedComponents = allComponents
    .filter((c) => c.slug !== component.slug)
    .filter((c) => {
      const sameCategory = c.category === component.category;
      const sharedTags = c.tags.some((t) => component.tags.includes(t));
      return sameCategory || sharedTags;
    })
    .slice(0, 4);

  const handleCopyFile = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-950 text-slate-100 max-w-5xl mx-auto space-y-8 font-sans">
      {/* Component Header */}
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

      {/* Metadata Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Author</div>
            <div className="text-xs text-slate-200 font-mono">{component.metadata.author}</div>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Updated</div>
            <div className="text-xs text-slate-200 font-mono">{component.metadata.updatedAt}</div>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
          <Package className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Dependencies</div>
            <div className="text-xs text-slate-200 font-mono">{component.metadata.dependencies.join(', ')}</div>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">A11y Score</div>
            <div className="text-xs text-emerald-400 font-mono font-bold">{component.metadata.accessibilityScore}%</div>
          </div>
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            Quick Start Usage
          </h3>
          <button
            type="button"
            onClick={() => handleCopyFile(component.documentation.usageSnippet)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-blue-400 hover:bg-slate-700 transition"
          >
            {copiedFile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedFile ? 'Copied' : 'Copy'}
          </button>
        </div>
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

      {/* Responsive Behavior */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          Responsive Behavior
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            <div className="text-xs font-mono font-bold text-slate-200">Desktop</div>
            <p className="text-[11px] text-slate-400">Full-width layout with all features visible. Optimized for 1024px+ viewports.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <Tablet className="w-5 h-5 text-amber-400" />
            <div className="text-xs font-mono font-bold text-slate-200">Tablet</div>
            <p className="text-[11px] text-slate-400">Adaptive layout for 768px viewports. Touch-friendly interaction targets.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <div className="text-xs font-mono font-bold text-slate-200">Mobile</div>
            <p className="text-[11px] text-slate-400">Compact layout for 375px viewports. Minimum 44px touch targets maintained.</p>
          </div>
        </div>
      </section>

      {/* Related Components */}
      {relatedComponents.length > 0 && (
        <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            Related Components
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedComponents.map((rc) => (
              <button
                key={rc.slug}
                type="button"
                onClick={() => onNavigateComponent?.(rc.slug)}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition">{rc.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{rc.description}</p>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{rc.category}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4">
        {prevComponent ? (
          <button
            type="button"
            onClick={() => onNavigateComponent?.(prevComponent.slug)}
            className="flex-1 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition text-left group"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition mt-1">{prevComponent.title}</div>
          </button>
        ) : <div className="flex-1" />}

        {nextComponent ? (
          <button
            type="button"
            onClick={() => onNavigateComponent?.(nextComponent.slug)}
            className="flex-1 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition text-right group"
          >
            <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-slate-500 uppercase">
              Next <ChevronRight className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition mt-1">{nextComponent.title}</div>
          </button>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
};

export default AutomatedDocsView;
