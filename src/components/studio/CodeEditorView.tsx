import React, { useState } from 'react';
import { FileCode2, Copy, Check, Expand, Shrink, Code2 } from 'lucide-react';
import { RegisteredComponent } from '../../types/studio';

interface CodeEditorViewProps {
  component: RegisteredComponent;
}

export const CodeEditorView: React.FC<CodeEditorViewProps> = ({ component }) => {
  const [activeFileIndex, setActiveCodeFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="select-none text-right pr-4 border-r border-slate-800/80 text-slate-600 font-mono">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Lines */}
        <pre className="pl-4 font-mono text-slate-300 overflow-x-auto">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="hover:bg-slate-900/50 rounded px-1">
                {line}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditorView;
