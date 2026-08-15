export type ComponentCategory = 
  | 'Controls'
  | 'Cards & Containers'
  | 'Buttons & Triggers'
  | 'Inputs & Forms'
  | 'Motion & Physics'
  | 'Feedback & Data';

export type LifecycleStatus = 'Draft' | 'Development' | 'Preview' | 'Review' | 'Stable' | 'Deprecated';

export interface PropSchemaItem {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color';
  label: string;
  defaultValue: any;
  options?: string[];
  description: string;
  category: 'Appearance' | 'Behavior' | 'State' | 'Content';
}

export interface ComponentMetadata {
  accessibilityScore: number; // 0-100
  responsive: boolean;
  keyboardSupported: boolean;
  reducedMotionSupported: boolean;
  darkModeSupported: boolean;
  dependencies: string[];
  author: string;
  updatedAt: string;
  kbShortcuts?: string[];
}

export interface ComponentSourceFile {
  filename: string;
  language: 'tsx' | 'typescript' | 'css' | 'json';
  code: string;
}

export interface RegisteredComponent {
  slug: string;
  title: string;
  category: ComponentCategory;
  description: string;
  tags: string[];
  version: string;
  status: LifecycleStatus;
  
  // React Component rendering
  component: React.ComponentType<any>;
  
  // Default props object for live inspection
  defaultProps: Record<string, any>;
  
  // Property schema definitions for inspector controls
  propSchema: PropSchemaItem[];
  
  // Multi-file source code
  files: ComponentSourceFile[];
  
  // Documentation spec content
  documentation: {
    overview: string;
    usageSnippet: string;
    accessibilityNotes: string[];
    cssTokens: string[];
  };
  
  metadata: ComponentMetadata;
}

export type ViewMode = 'preview' | 'code' | 'docs' | 'motion' | 'validation';

export type ViewportDevice = 'desktop' | 'tablet' | 'mobile' | 'fluid';

export interface StudioState {
  selectedSlug: string;
  activeView: ViewMode;
  viewportDevice: ViewportDevice;
  customViewportWidth: number;
  canvasBgMode: 'dots' | 'lines' | 'solid' | 'mesh';
  canvasTheme: 'dark' | 'light';
  zoomLevel: number; // 50, 75, 100, 125, 150
  searchQuery: string;
  selectedCategory: string | 'All';
  statusFilter: string | 'All';
  activeCodeFileIndex: number;
  isCreatorModalOpen: boolean;
  activeProps: Record<string, any>;
  forcedState: 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'error';
}
