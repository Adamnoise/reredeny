import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Eye, Code as Code2, FileText, Zap, ShieldCheck, CornerDownLeft } from 'lucide-react';
import { RegisteredComponent, ViewMode } from '../../types/studio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  components: RegisteredComponent[];
  onSelectComponent: (slug: string) => void;
  onViewChange: (view: ViewMode) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  components,
  onSelectComponent,
  onViewChange,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const viewOptions: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'preview', label: 'Interactive Preview', icon: <Eye className="w-4 h-4" /> },
    { id: 'code', label: 'Multi-File Code', icon: <Code2 className="w-4 h-4" /> },
    { id: 'docs', label: 'Automated Spec', icon: <FileText className="w-4 h-4" /> },
    { id: 'motion', label: 'Motion Tokens', icon: <Zap className="w-4 h-4" /> },
    { id: 'validation', label: 'A11y & Health', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const filteredComponents = components.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const filteredViews = viewOptions.filter((v) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return v.label.toLowerCase().includes(q);
  });

  type ResultItem =
    | { type: 'component'; slug: string; title: string; subtitle: string }
    | { type: 'view'; viewId: ViewMode; title: string; icon: React.ReactNode };

  const results: ResultItem[] = [
    ...filteredViews.map((v) => ({
      type: 'view' as const,
      viewId: v.id,
      title: v.label,
      icon: v.icon,
    })),
    ...filteredComponents.map((c) => ({
      type: 'component' as const,
      slug: c.slug,
      title: c.title,
      subtitle: c.category,
    })),
  ];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) {
        if (item.type === 'component') {
          onSelectComponent(item.slug);
        } else {
          onViewChange(item.viewId);
        }
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl opacity-20 blur-md pointer-events-none" />

        {/* Search Input */}
        <div className="relative flex items-center border-b border-slate-800 px-4 py-3">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components, views, categories..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          <kbd className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs font-mono">
              No results found for "{query}"
            </div>
          ) : (
            <>
              {filteredViews.length > 0 && (
                <div className="px-2 py-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Views
                  </span>
                </div>
              )}
              {filteredViews.map((v, idx) => {
                const isActive = activeIndex === filteredViews.indexOf(v);
                return (
                  <button
                    key={v.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(filteredViews.indexOf(v))}
                    onClick={() => {
                      onViewChange(v.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                      isActive ? 'bg-blue-600/20 border border-blue-500/30' : 'border border-transparent'
                    }`}
                  >
                    <span className="text-blue-400">{v.icon}</span>
                    <span className="text-xs font-mono text-slate-200 flex-1">{v.label}</span>
                    {isActive && <CornerDownLeft className="w-3.5 h-3.5 text-slate-500" />}
                  </button>
                );
              })}

              {filteredComponents.length > 0 && (
                <div className="px-2 py-1 mt-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Components ({filteredComponents.length})
                  </span>
                </div>
              )}
              {filteredComponents.map((c) => {
                const idx = filteredViews.length + filteredComponents.indexOf(c);
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      onSelectComponent(c.slug);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                      isActive ? 'bg-blue-600/20 border border-blue-500/30' : 'border border-transparent'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">{c.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">
                        {c.category} • {c.slug}
                      </div>
                    </div>
                    {isActive && <CornerDownLeft className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↵</kbd> Select</span>
            <span><kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">ESC</kbd> Close</span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
