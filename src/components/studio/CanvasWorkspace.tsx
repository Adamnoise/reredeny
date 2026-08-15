import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, ZoomIn, ZoomOut, Sun, Moon, RotateCcw, Sparkles, TriangleAlert as AlertTriangle } from 'lucide-react';
import {
  RegisteredComponent,
  StudioState,
  ViewportDevice,
} from '../../types/studio';
import CodeEditorView from './CodeEditorView';
import AutomatedDocsView from './AutomatedDocsView';
import MotionTokensView from './MotionTokensView';
import ValidationView from './ValidationView';
import ErrorBoundary from './ErrorBoundary';

interface CanvasWorkspaceProps {
  component: RegisteredComponent;
  state: StudioState;
  allComponents: RegisteredComponent[];
  onViewportChange: (device: ViewportDevice) => void;
  onBgModeChange: (bg: any) => void;
  onThemeToggle: () => void;
  onZoomChange: (zoom: number) => void;
  onResetState: () => void;
  onTriggerError: () => void;
  onNavigateComponent: (slug: string) => void;
}

export const CanvasWorkspace: React.FC<CanvasWorkspaceProps> = ({
  component,
  state,
  allComponents,
  onViewportChange,
  onBgModeChange,
  onThemeToggle,
  onZoomChange,
  onResetState,
  onTriggerError,
  onNavigateComponent,
}) => {
  const ComponentToRender = component.component;

  const getViewportWidthClass = () => {
    switch (state.viewportDevice) {
      case 'desktop':
        return 'w-[1024px] max-w-full';
      case 'tablet':
        return 'w-[768px] max-w-full';
      case 'mobile':
        return 'w-[375px] max-w-full';
      case 'fluid':
      default:
        return 'w-full max-w-4xl';
    }
  };

  const isLight = state.canvasTheme === 'light';

  const getCanvasBgClass = () => {
    const base = isLight ? 'bg-slate-100' : 'bg-slate-950';
    switch (state.canvasBgMode) {
      case 'dots':
        return `${base} ${isLight ? 'canvas-grid-dots-light' : 'canvas-grid-dots'}`;
      case 'lines':
        return `${base} ${isLight ? 'canvas-grid-lines-light' : 'canvas-grid-lines'}`;
      case 'mesh':
        return `${base} ${isLight ? 'canvas-mesh-light' : 'canvas-mesh'}`;
      case 'solid':
      default:
        return base;
    }
  };

  const getCanvasCardClass = () => {
    return isLight
      ? 'bg-white/90 border-slate-200 text-slate-900'
      : 'bg-slate-900/90 border-slate-800 text-slate-100';
  };

  const getWatermarkClass = () => {
    return isLight ? 'text-slate-400' : 'text-slate-500';
  };

  return (
    <main className="flex-1 bg-slate-950 flex flex-col h-full overflow-hidden relative">
      {/* Workspace Sub-Toolbar */}
      <div className="h-10 bg-slate-900/90 border-b border-slate-800/80 px-4 flex items-center justify-between gap-4 select-none shrink-0 font-mono text-xs text-slate-400">
        {/* Viewport Scale Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            { id: 'desktop', label: 'Desktop (1024px)', icon: <Monitor className="w-3.5 h-3.5" /> },
            { id: 'tablet', label: 'Tablet (768px)', icon: <Tablet className="w-3.5 h-3.5" /> },
            { id: 'mobile', label: 'Mobile (375px)', icon: <Smartphone className="w-3.5 h-3.5" /> },
            { id: 'fluid', label: 'Fluid', icon: <Maximize2 className="w-3.5 h-3.5" /> },
          ].map((dev) => (
            <button
              key={dev.id}
              type="button"
              onClick={() => onViewportChange(dev.id as ViewportDevice)}
              title={dev.label}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition ${
                state.viewportDevice === dev.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {dev.icon}
              <span className="hidden lg:inline">{dev.id}</span>
            </button>
          ))}
        </div>

        {/* Canvas Display Settings */}
        <div className="flex items-center gap-3">
          {/* Canvas Background Pattern */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {['dots', 'lines', 'mesh', 'solid'].map((bg) => (
              <button
                key={bg}
                type="button"
                onClick={() => onBgModeChange(bg)}
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition ${
                  state.canvasBgMode === bg
                    ? 'bg-slate-800 text-blue-400 border border-slate-700'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onThemeToggle}
            title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-blue-400 transition"
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Zoom Level Scale */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => onZoomChange(Math.max(50, state.zoomLevel - 25))}
              className="hover:text-slate-200"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-blue-400 font-bold">{state.zoomLevel}%</span>
            <button
              type="button"
              onClick={() => onZoomChange(Math.min(150, state.zoomLevel + 25))}
              className="hover:text-slate-200"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset / Error Simulation */}
          <button
            type="button"
            onClick={onTriggerError}
            title="Simulate Error Isolation"
            className="p-1 rounded-lg bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-500/10 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Display Area */}
      <div className={`flex-1 overflow-auto p-8 flex items-center justify-center transition-all ${getCanvasBgClass()}`}>
        {state.activeView === 'preview' && (
          <div
            className={`transition-all duration-300 ${getViewportWidthClass()}`}
            style={{
              transform: `scale(${state.zoomLevel / 100})`,
              transformOrigin: 'center center',
            }}
          >
            <div className={`p-8 rounded-2xl border shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden ${getCanvasCardClass()}`}>
              {/* Studio Canvas Watermark Badge */}
              <div className={`absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono pointer-events-none ${getWatermarkClass()}`}>
                <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-blue-400' : 'bg-blue-500'} animate-ping`} />
                ISOLATED REACT CANVAS • {component.title} • {state.canvasTheme.toUpperCase()}
              </div>

              <ErrorBoundary key={`${component.slug}-${JSON.stringify(state.activeProps)}`} componentTitle={component.title}>
                <ComponentToRender {...state.activeProps} forcedState={state.forcedState} />
              </ErrorBoundary>
            </div>
          </div>
        )}

        {state.activeView === 'code' && <CodeEditorView component={component} />}

        {state.activeView === 'docs' && <AutomatedDocsView component={component} allComponents={allComponents} onNavigateComponent={onNavigateComponent} />}

        {state.activeView === 'motion' && <MotionTokensView />}

        {state.activeView === 'validation' && <ValidationView component={component} />}
      </div>
    </main>
  );
};

export default CanvasWorkspace;
