import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Layers,
  ShieldCheck,
  Code2,
  Copy,
  Check,
  Eye,
  RefreshCw,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { RegisteredComponent, PropSchemaItem } from '../../types/studio';

interface InspectorPanelProps {
  component: RegisteredComponent;
  activeProps: Record<string, any>;
  onPropChange: (propName: string, value: any) => void;
  onResetProps: () => void;
  forcedState: string;
  onForcedStateChange: (st: any) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  component,
  activeProps,
  onPropChange,
  onResetProps,
  forcedState,
  onForcedStateChange,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'props' | 'state' | 'a11y' | 'tokens'>('props');

  // Group props by category
  const categories: ('Appearance' | 'Behavior' | 'State' | 'Content')[] = [
    'Appearance',
    'Behavior',
    'State',
    'Content',
  ];

  const generateJSXSnippet = () => {
    const propLines = Object.entries(activeProps)
      .map(([key, val]) => {
        if (typeof val === 'string') return `  ${key}="${val}"`;
        if (typeof val === 'boolean') return val ? `  ${key}` : `  ${key}={false}`;
        return `  ${key}={${JSON.stringify(val)}}`;
      })
      .join('\n');

    return `<${component.title.replace(/\s+/g, '')}\n${propLines}\n/>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateJSXSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderControl = (item: PropSchemaItem) => {
    const val = activeProps[item.name] ?? item.defaultValue;

    switch (item.type) {
      case 'boolean':
        return (
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={Boolean(val)}
              onChange={(e) => onPropChange(item.name, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
          </label>
        );

      case 'select':
        return (
          <select
            value={val}
            onChange={(e) => onPropChange(item.name, e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
          >
            {item.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={val}
            onChange={(e) => onPropChange(item.name, Number(e.target.value))}
            className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
          />
        );

      case 'string':
      default:
        return (
          <input
            type="text"
            value={val}
            onChange={(e) => onPropChange(item.name, e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
          />
        );
    }
  };

  return (
    <aside className="w-80 bg-slate-950 border-l border-slate-800/90 flex flex-col shrink-0 select-none h-full overflow-hidden">
      {/* Inspector Header */}
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-xs text-slate-200 font-mono">DYNAMIC INSPECTOR</span>
        </div>
        <button
          type="button"
          onClick={onResetProps}
          title="Reset Props to Default"
          className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-800/80 bg-slate-950 px-2 py-1 font-mono text-[11px]">
        {[
          { id: 'props', label: 'Props' },
          { id: 'state', label: 'State' },
          { id: 'a11y', label: 'A11y' },
          { id: 'tokens', label: 'Tokens' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-1 text-center rounded-md transition ${
              activeTab === t.id
                ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {activeTab === 'props' && (
          <div className="space-y-4">
            {categories.map((cat) => {
              const categoryItems = component.propSchema.filter((p) => p.category === cat);
              if (categoryItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-2">
                  <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between border-b border-slate-800/60 pb-1">
                    <span>{cat}</span>
                    <span className="text-slate-500">{categoryItems.length}</span>
                  </h5>

                  <div className="space-y-2.5">
                    {categoryItems.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-mono font-medium">
                            {item.label || item.name}
                          </span>
                          {renderControl(item)}
                        </div>
                        {item.description && (
                          <p className="text-[10px] text-slate-500 leading-tight">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'state' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                Forced Interactive States
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test how the component visually responds across interactive state matrix.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {[
                'default',
                'hover',
                'focus',
                'active',
                'disabled',
                'loading',
                'error',
              ].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onForcedStateChange(st)}
                  className={`p-2 rounded-xl capitalize text-left border transition ${
                    forcedState === st
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs">{st}</div>
                  <div className="text-[10px] opacity-75">
                    {st === 'default' ? 'Normal render' : `Simulate ${st}`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'a11y' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-mono">A11y Audit Score</span>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">
                  {component.metadata.accessibilityScore}% PASS
                </div>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                WCAG 2.1 AA Checklist
              </h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Semantic HTML element bindings</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Keyboard navigation (Tab / Space / Enter)</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4.5:1 Minimum WCAG contrast ratio</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>@media prefers-reduced-motion supported</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="space-y-3">
            <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              Design Tokens Consumed
            </h5>
            <div className="space-y-1.5 font-mono text-xs">
              {component.documentation.cssTokens.map((token) => (
                <div
                  key={token}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300"
                >
                  <span className="text-blue-400">{token}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(token)}
                    className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Snippet Output Box */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
          <span>React JSX Output</span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-blue-400 transition"
          >
            {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
          </button>
        </div>
        <pre className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-28">
          {generateJSXSnippet()}
        </pre>
      </div>
    </aside>
  );
};

export default InspectorPanel;
