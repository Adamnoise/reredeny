import React, { useState } from 'react';
import { COMPONENT_REGISTRY } from './registry/registryData';
import {
  RegisteredComponent,
  StudioState,
  ViewMode,
  ViewportDevice,
} from './types/studio';
import Header from './components/studio/Header';
import Sidebar from './components/studio/Sidebar';
import CanvasWorkspace from './components/studio/CanvasWorkspace';
import InspectorPanel from './components/studio/InspectorPanel';
import Footer from './components/studio/Footer';
import ComponentCreatorModal from './components/studio/ComponentCreatorModal';

export default function App() {
  const [registry, setRegistry] = useState<RegisteredComponent[]>(COMPONENT_REGISTRY);
  const [selectedSlug, setSelectedSlug] = useState<string>(COMPONENT_REGISTRY[0].slug);

  const selectedComponent =
    registry.find((c) => c.slug === selectedSlug) || registry[0];

  const [activeProps, setActiveProps] = useState<Record<string, any>>(
    selectedComponent.defaultProps
  );

  const [state, setState] = useState<StudioState>({
    selectedSlug: selectedComponent.slug,
    activeView: 'preview',
    viewportDevice: 'fluid',
    customViewportWidth: 1024,
    canvasBgMode: 'dots',
    canvasTheme: 'dark',
    zoomLevel: 100,
    searchQuery: '',
    selectedCategory: 'All',
    statusFilter: 'All',
    activeCodeFileIndex: 0,
    isCreatorModalOpen: false,
    activeProps: selectedComponent.defaultProps,
    forcedState: 'default',
  });

  // Handle component selection change
  const handleSelectComponent = (slug: string) => {
    const comp = registry.find((c) => c.slug === slug);
    if (comp) {
      setSelectedSlug(slug);
      setActiveProps({ ...comp.defaultProps });
      setState((prev) => ({
        ...prev,
        selectedSlug: slug,
        activeProps: { ...comp.defaultProps },
      }));
    }
  };

  // Handle prop changes in inspector
  const handlePropChange = (propName: string, value: any) => {
    setActiveProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const handleResetProps = () => {
    setActiveProps({ ...selectedComponent.defaultProps });
  };

  const handleRegisterNewComponent = (newComp: RegisteredComponent) => {
    setRegistry((prev) => [newComp, ...prev]);
    setSelectedSlug(newComp.slug);
    setActiveProps({ ...newComp.defaultProps });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Navigation Bar */}
      <Header
        state={state}
        onViewChange={(view: ViewMode) =>
          setState((prev) => ({ ...prev, activeView: view }))
        }
        onOpenCreator={() =>
          setState((prev) => ({ ...prev, isCreatorModalOpen: true }))
        }
        componentCount={registry.length}
      />

      {/* Main 3-Column Split-Pane Studio Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Component Discovery & Registry */}
        <Sidebar
          components={registry}
          selectedSlug={selectedSlug}
          onSelectComponent={handleSelectComponent}
          searchQuery={state.searchQuery}
          onSearchChange={(q) => setState((prev) => ({ ...prev, searchQuery: q }))}
          selectedCategory={state.selectedCategory}
          onCategoryChange={(cat) =>
            setState((prev) => ({ ...prev, selectedCategory: cat }))
          }
          statusFilter={state.statusFilter}
          onStatusFilterChange={(st) =>
            setState((prev) => ({ ...prev, statusFilter: st }))
          }
          onOpenCreator={() =>
            setState((prev) => ({ ...prev, isCreatorModalOpen: true }))
          }
        />

        {/* Central Workspace: Interactive Canvas, Device Scales, Code & Specs */}
        <CanvasWorkspace
          component={selectedComponent}
          state={{ ...state, activeProps }}
          onViewportChange={(device: ViewportDevice) =>
            setState((prev) => ({ ...prev, viewportDevice: device }))
          }
          onBgModeChange={(bg) =>
            setState((prev) => ({ ...prev, canvasBgMode: bg }))
          }
          onThemeToggle={() =>
            setState((prev) => ({
              ...prev,
              canvasTheme: prev.canvasTheme === 'dark' ? 'light' : 'dark',
            }))
          }
          onZoomChange={(zoom) =>
            setState((prev) => ({ ...prev, zoomLevel: zoom }))
          }
          onResetState={handleResetProps}
          onTriggerError={() => {
            // Intentionally pass an invalid state to trigger ErrorBoundary
            setActiveProps((prev) => ({ ...prev, __triggerError: true }));
          }}
        />

        {/* Right Sidebar: Dynamic Inspector & Prop Mutation Panel */}
        <InspectorPanel
          component={selectedComponent}
          activeProps={activeProps}
          onPropChange={handlePropChange}
          onResetProps={handleResetProps}
          forcedState={state.forcedState}
          onForcedStateChange={(st) =>
            setState((prev) => ({ ...prev, forcedState: st }))
          }
        />
      </div>

      {/* System Footer */}
      <Footer component={selectedComponent} state={state} />

      {/* Custom Component Creation Wizard Modal */}
      <ComponentCreatorModal
        isOpen={state.isCreatorModalOpen}
        onClose={() =>
          setState((prev) => ({ ...prev, isCreatorModalOpen: false }))
        }
        onRegisterComponent={handleRegisterNewComponent}
      />
    </div>
  );
}
