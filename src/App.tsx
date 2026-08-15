import React, { useState, useEffect, useCallback } from 'react';
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
import CommandPalette from './components/studio/CommandPalette';
import { fetchCustomComponents, deleteCustomComponent } from './lib/componentStore';
import { compileTsxCode } from './lib/codeCompiler';

export default function App() {
  const [registry, setRegistry] = useState<RegisteredComponent[]>(COMPONENT_REGISTRY);
  const [selectedSlug, setSelectedSlug] = useState<string>(COMPONENT_REGISTRY[0].slug);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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

  // Load custom components from database on mount
  useEffect(() => {
    const loadCustomComponents = async () => {
      const records = await fetchCustomComponents();
      const customComps: RegisteredComponent[] = records
        .map((record) => {
          const compiled = compileTsxCode(record.tsx_code);
          if (!compiled.Component) return null;
          return {
            slug: record.slug,
            title: record.title,
            category: record.category as any,
            description: record.description,
            tags: record.tags,
            version: record.version,
            status: record.status as any,
            component: compiled.Component,
            defaultProps: record.default_props,
            propSchema: record.prop_schema,
            files: record.files,
            documentation: record.documentation,
            metadata: record.metadata,
          } as RegisteredComponent;
        })
        .filter((c): c is RegisteredComponent => c !== null);

      if (customComps.length > 0) {
        setRegistry((prev) => [...customComps, ...prev]);
      }
      setIsLoading(false);
    };

    loadCustomComponents();
  }, []);

  // ⌘K command palette shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectComponent = (slug: string) => {
    const comp = registry.find((c) => c.slug === slug);
    if (comp) {
      setSelectedSlug(slug);
      setActiveProps({ ...comp.defaultProps });
      setState((prev) => ({
        ...prev,
        selectedSlug: slug,
        activeProps: { ...comp.defaultProps },
        forcedState: 'default',
      }));
    }
  };

  const handlePropChange = (propName: string, value: any) => {
    setActiveProps((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const handleResetProps = () => {
    setActiveProps({ ...selectedComponent.defaultProps });
    setState((prev) => ({ ...prev, forcedState: 'default' }));
  };

  const handleRegisterNewComponent = (newComp: RegisteredComponent) => {
    setRegistry((prev) => [newComp, ...prev]);
    setSelectedSlug(newComp.slug);
    setActiveProps({ ...newComp.defaultProps });
  };

  const handleDeleteComponent = useCallback(async (slug: string) => {
    const isCustom = !COMPONENT_REGISTRY.some((c) => c.slug === slug);
    if (isCustom) {
      await deleteCustomComponent(slug);
      setRegistry((prev) => {
        const next = prev.filter((c) => c.slug !== slug);
        if (selectedSlug === slug && next.length > 0) {
          setSelectedSlug(next[0].slug);
          setActiveProps({ ...next[0].defaultProps });
        }
        return next;
      });
    }
  }, [selectedSlug]);

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
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
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
          onDeleteComponent={handleDeleteComponent}
        />

        {/* Central Workspace: Interactive Canvas, Device Scales, Code & Specs */}
        <CanvasWorkspace
          component={selectedComponent}
          state={{ ...state, activeProps }}
          allComponents={registry}
          onNavigateComponent={handleSelectComponent}
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

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        components={registry}
        onSelectComponent={handleSelectComponent}
        onViewChange={(view: ViewMode) =>
          setState((prev) => ({ ...prev, activeView: view }))
        }
      />
    </div>
  );
}
