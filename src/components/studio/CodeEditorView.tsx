import React, { useState } from 'react';
import { FileCode as FileCode2, Copy, Check } from 'lucide-react';
import { RegisteredComponent } from '../../types/studio';

interface CodeEditorViewProps {
  component: RegisteredComponent;
}

const TOKEN_PATTERNS: { regex: string; className: string }[] = [
  { regex: '(\\/\\/.*$|\\/\\*[\\s\\S]*?\\*\\/)', className: 'text-slate-500 italic' },
  { regex: '\\b(import|export|from|default|const|let|var|function|return|if|else|for|while|switch|case|break|continue|interface|type|extends|implements|class|new|async|await|typeof|instanceof)\\b', className: 'text-violet-400' },
  { regex: '\\b(React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer)\\b', className: 'text-cyan-400' },
  { regex: '(\\b[A-Z][a-zA-Z0-9]*\\b)', className: 'text-amber-400' },
  { regex: '("[^"]*"|\'[^\']*\'|`[^`]*`)', className: 'text-emerald-400' },
  { regex: '\\b(\\d+\\.?\\d*)\\b', className: 'text-rose-400' },
  { regex: '(\\b(?:true|false|null|undefined)\\b)', className: 'text-orange-400' },
];

function highlightLine(line: string): React.ReactNode {
  if (!line.trim()) return '\u00A0';

  const parts: { text: string; className: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let earliestMatch: { index: number; text: string; className: string } | null = null;

    for (const pattern of TOKEN_PATTERNS) {
      const regex = new RegExp(pattern.regex, 'm');
      const match = regex.exec(remaining);
      if (match && (earliestMatch === null || match.index < earliestMatch.index)) {
        earliestMatch = { index: match.index, text: match[0], className: pattern.className };
      }
    }

    if (earliestMatch === null) {
      parts.push({ text: remaining, className: '' });
      break;
    }

    if (earliestMatch.index > 0) {
      parts.push({ text: remaining.substring(0, earliestMatch.index), className: '' });
    }

    parts.push({ text: earliestMatch.text, className: earliestMatch.className });
    remaining = remaining.substring(earliestMatch.index + earliestMatch.text.length);
  }

  return parts.map((part, i) =>
    part.className ? (
      <span key={i} className={part.className}>{part.text}</span>
    ) : (
      <React.Fragment key={i}>{part.text}</React.Fragment>
    )
  );
}

export const CodeEditorView: React.FC<CodeEditorViewProps> = ({ component }) => {
  const [activeFileIndex, setActiveCodeFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const files = component.files || [];
  const activeFile = files[activeFileIndex] || files[0] || {
    filename: 'Component.tsx',
    code: '// No source file loaded',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeFile.code.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* File Tabs Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-4 select-none shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {files.map((file, idx) => {
            const isActive = idx === activeFileIndex;
            return (
              <button
                key={file.filename}
                type="button"
                onClick={() => setActiveCodeFileIndex(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                  isActive
                    ? 'bg-slate-950 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{file.filename}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono transition border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Text Window */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200 flex">
        {/* Line Numbers */}
        <div className="select-none text-right pr-4 border-r border-slate-800/80 text-slate-600 font-mono shrink-0">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Lines */}
        <pre className="pl-4 font-mono text-slate-300 overflow-x-auto flex-1">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="hover:bg-slate-900/50 rounded px-1 min-h-[1.25rem]">
                {highlightLine(line)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditorView;
