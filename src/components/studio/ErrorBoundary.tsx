import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Code2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  componentTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Studio Error Isolation:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-2xl bg-slate-900 border border-rose-500/30 shadow-2xl max-w-lg w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <AlertOctagon className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Component Error Isolated
            </h3>
            <p className="text-xs text-slate-400">
              The preview for <span className="text-rose-400 font-mono">{this.props.componentTitle || 'custom component'}</span> threw a runtime exception.
            </p>
          </div>

          {this.state.error && (
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-rose-300 text-left overflow-x-auto max-h-32">
              {this.state.error.message || String(this.state.error)}
            </pre>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs font-mono flex items-center gap-2 shadow-lg shadow-rose-600/25 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Live Canvas</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
