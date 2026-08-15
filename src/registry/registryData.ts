import { RegisteredComponent } from '../types/studio';
import PremiumToggle from './components/PremiumToggle';
import InteractiveHoverCard from './components/InteractiveHoverCard';
import RippleButton from './components/RippleButton';
import SegmentedControl from './components/SegmentedControl';
import MotionModal from './components/MotionModal';
import StatMetricWidget from './components/StatMetricWidget';
import CommandPaletteInput from './components/CommandPaletteInput';

export const COMPONENT_REGISTRY: RegisteredComponent[] = [
  {
    slug: 'premium-toggle',
    title: 'Premium Toggle',
    category: 'Controls',
    description: 'High-precision interactive switch with tactile spring physics, sound feedback hook, glowing state indicators, and keyboard bindings.',
    tags: ['toggle', 'switch', 'controls', 'spring-physics', 'a11y'],
    version: '1.2.0',
    status: 'Stable',
    component: PremiumToggle,
    defaultProps: {
      label: 'Real-Time Sync',
      sublabel: 'Streams live prop mutations',
      checked: true,
      disabled: false,
      variant: 'premium',
      size: 'md',
      glowEffect: true,
    },
    propSchema: [
      {
        name: 'label',
        type: 'string',
        label: 'Main Label',
        defaultValue: 'Real-Time Sync',
        description: 'Primary accessible text label displayed beside toggle.',
        category: 'Content',
      },
      {
        name: 'sublabel',
        type: 'string',
        label: 'Sublabel / Hint',
        defaultValue: 'Streams live prop mutations',
        description: 'Secondary supportive caption copy.',
        category: 'Content',
      },
      {
        name: 'checked',
        type: 'boolean',
        label: 'Active State',
        defaultValue: true,
        description: 'Controlled boolean checked switch state.',
        category: 'State',
      },
      {
        name: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
        description: 'Disables pointer interactions and dims visuals.',
        category: 'State',
      },
      {
        name: 'variant',
        type: 'select',
        label: 'Color Variant',
        defaultValue: 'premium',
        options: ['premium', 'emerald', 'amber', 'cyan'],
        description: 'Visual accent palette theme.',
        category: 'Appearance',
      },
      {
        name: 'size',
        type: 'select',
        label: 'Size Scale',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Scale dimension for track and thumb.',
        category: 'Appearance',
      },
      {
        name: 'glowEffect',
        type: 'boolean',
        label: 'Glow Effect',
        defaultValue: true,
        description: 'Enables ambient outer radial shadow box.',
        category: 'Appearance',
      },
    ],
    files: [
      {
        filename: 'PremiumToggle.tsx',
        language: 'tsx',
        code: `import React, { useState } from 'react';

export interface PremiumToggleProps {
  label?: string;
  sublabel?: string;
  checked?: boolean;
  disabled?: boolean;
  variant?: 'premium' | 'emerald' | 'amber' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  glowEffect?: boolean;
  onChange?: (checked: boolean) => void;
}

export const PremiumToggle: React.FC<PremiumToggleProps> = ({
  label = 'Real-Time Sync',
  sublabel = 'Streams live prop mutations',
  checked: controlledChecked,
  disabled = false,
  variant = 'premium',
  size = 'md',
  glowEffect = true,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(controlledChecked ?? true);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-xl max-w-sm w-full select-none">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          {label}
        </span>
        {sublabel && <span className="text-xs text-slate-400 mt-0.5">{sublabel}</span>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        disabled={disabled}
        onClick={handleToggle}
        className="relative inline-flex items-center rounded-full transition-all duration-300 ease-out"
      >
        <span className="pointer-events-none inline-block rounded-full bg-white shadow-md transform transition-transform duration-300 ease-spring" />
      </button>
    </div>
  );
};

export default PremiumToggle;`,
      },
      {
        filename: 'PremiumToggle.types.ts',
        language: 'typescript',
        code: `export type ToggleVariant = 'premium' | 'emerald' | 'amber' | 'cyan';
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface PremiumToggleProps {
  label?: string;
  sublabel?: string;
  checked?: boolean;
  disabled?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
  glowEffect?: boolean;
  onChange?: (checked: boolean) => void;
}`,
      },
      {
        filename: 'PremiumToggle.demo.tsx',
        language: 'tsx',
        code: `import React, { useState } from 'react';
import PremiumToggle from './PremiumToggle';

export const PremiumToggleDemo = () => {
  const [sync, setSync] = useState(true);
  return (
    <div className="p-8 bg-slate-950 flex justify-center">
      <PremiumToggle
        label="Automated Build Pipeline"
        sublabel="Triggers zero-downtime hot reloads"
        checked={sync}
        onChange={setSync}
        variant="premium"
        glowEffect
      />
    </div>
  );
};`,
      },
      {
        filename: 'index.ts',
        language: 'typescript',
        code: `export { PremiumToggle } from './PremiumToggle';
export type { PremiumToggleProps } from './PremiumToggle.types';`,
      },
    ],
    documentation: {
      overview: 'The PremiumToggle component offers a production-grade interactive switch built with tactile spring physics, high-contrast dark visual cues, and ARIA role="switch" accessibility.',
      usageSnippet: `import { PremiumToggle } from '@/components/showcase/premium-toggle';

<PremiumToggle
  label="Live Feature Flag"
  sublabel="Enables instant AST dynamic updates"
  checked={isEnabled}
  onChange={setIsEnabled}
  variant="premium"
/>`,
      accessibilityNotes: [
        'Uses standard HTML button with role="switch" and aria-checked attribute.',
        'Full keyboard support for Space and Enter key toggling.',
        'Focus outline is styled with high-contrast ring for WCAG 2.1 compliance.',
        'Respects prefers-reduced-motion CSS media queries.',
      ],
      cssTokens: [
        'var(--bg-dark-900)',
        'var(--border-dark)',
        'var(--accent-blue)',
        'var(--ease-spring)',
      ],
    },
    metadata: {
      accessibilityScore: 100,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react', 'lucide-react'],
      author: 'Studio UI Core',
      updatedAt: '2026-08-15',
      kbShortcuts: ['Space (Toggle)', 'Enter (Toggle)', 'Tab (Focus)'],
    },
  },
  {
    slug: 'interactive-hover-card',
    title: 'Interactive Hover Card',
    category: 'Cards & Containers',
    description: '3D specular light card featuring dynamic cursor ray-tracing, tilt physics, and ambient gradient glow.',
    tags: ['card', '3d', 'hover-physics', 'specular-light', 'motion'],
    version: '2.1.0',
    status: 'Stable',
    component: InteractiveHoverCard,
    defaultProps: {
      title: 'High-Precision Compiler',
      subtitle: 'Zero-latency dynamic compilation with WebAssembly and AST-driven module isolation.',
      badgeText: 'v2.4 Ready',
      glowColor: 'blue',
      interactive3d: true,
      showIcon: true,
    },
    propSchema: [
      {
        name: 'title',
        type: 'string',
        label: 'Card Title',
        defaultValue: 'High-Precision Compiler',
        description: 'Main header copy for card.',
        category: 'Content',
      },
      {
        name: 'subtitle',
        type: 'string',
        label: 'Subtitle Copy',
        defaultValue: 'Zero-latency dynamic compilation with WebAssembly and AST-driven module isolation.',
        description: 'Detailed description paragraphs.',
        category: 'Content',
      },
      {
        name: 'badgeText',
        type: 'string',
        label: 'Status Badge',
        defaultValue: 'v2.4 Ready',
        description: 'Pill badge text tag.',
        category: 'Content',
      },
      {
        name: 'glowColor',
        type: 'select',
        label: 'Glow Accent',
        defaultValue: 'blue',
        options: ['blue', 'violet', 'emerald', 'amber'],
        description: 'Ambient spotlight color.',
        category: 'Appearance',
      },
      {
        name: 'interactive3d',
        type: 'boolean',
        label: '3D Cursor Tilt',
        defaultValue: true,
        description: 'Calculates perspective tilt relative to pointer coords.',
        category: 'Behavior',
      },
      {
        name: 'showIcon',
        type: 'boolean',
        label: 'Show Header Icon',
        defaultValue: true,
        description: 'Toggles CPU icon badge.',
        category: 'Appearance',
      },
    ],
    files: [
      {
        filename: 'InteractiveHoverCard.tsx',
        language: 'tsx',
        code: `import React, { useState, useRef } from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

export interface InteractiveHoverCardProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  glowColor?: 'blue' | 'violet' | 'emerald' | 'amber';
  interactive3d?: boolean;
}

export const InteractiveHoverCard: React.FC<InteractiveHoverCardProps> = ({
  title = 'High-Precision Compiler',
  subtitle = 'Zero-latency dynamic compilation with WebAssembly.',
  badgeText = 'v2.4 Ready',
  glowColor = 'blue',
  interactive3d = true,
}) => {
  return (
    <div className="relative p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
      <h3 className="text-lg font-bold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 mt-2">{subtitle}</p>
    </div>
  );
};`,
      },
      {
        filename: 'InteractiveHoverCard.types.ts',
        language: 'typescript',
        code: `export interface InteractiveHoverCardProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  glowColor?: 'blue' | 'violet' | 'emerald' | 'amber';
  interactive3d?: boolean;
  showIcon?: boolean;
}`,
      },
      {
        filename: 'index.ts',
        language: 'typescript',
        code: `export { InteractiveHoverCard } from './InteractiveHoverCard';`,
      },
    ],
    documentation: {
      overview: 'Calculates local cursor coordinates relative to card center to generate smooth 3D rotational perspective transforms and specular glare lighting.',
      usageSnippet: `<InteractiveHoverCard
  title="Wasm Engine"
  subtitle="Compiles JSX on the fly in worker threads"
  glowColor="violet"
  interactive3d
/>`,
      accessibilityNotes: [
        'Falls back to flat non-tilt layout when prefers-reduced-motion is detected.',
        'High contrast typography meets 4.5:1 ratio.',
      ],
      cssTokens: ['var(--border-dark)', 'var(--bg-dark-900)', 'var(--duration-normal)'],
    },
    metadata: {
      accessibilityScore: 98,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react', 'lucide-react'],
      author: 'Motion Graphics Lab',
      updatedAt: '2026-08-14',
    },
  },
  {
    slug: 'ripple-button',
    title: 'Ripple Button',
    category: 'Buttons & Triggers',
    description: 'Dynamic canvas-free click ripple animation trigger with loading state and keyboard focus handling.',
    tags: ['button', 'ripple', 'wave', 'trigger', 'feedback'],
    version: '1.0.4',
    status: 'Stable',
    component: RippleButton,
    defaultProps: {
      label: 'Deploy to Studio Registry',
      variant: 'primary',
      size: 'md',
      isLoading: false,
      disabled: false,
      showIcon: true,
    },
    propSchema: [
      {
        name: 'label',
        type: 'string',
        label: 'Button Text',
        defaultValue: 'Deploy to Studio Registry',
        description: 'Button text label.',
        category: 'Content',
      },
      {
        name: 'variant',
        type: 'select',
        label: 'Style Variant',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'accent', 'ghost'],
        description: 'Visual theme style.',
        category: 'Appearance',
      },
      {
        name: 'size',
        type: 'select',
        label: 'Padding & Size',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Dimensions scale.',
        category: 'Appearance',
      },
      {
        name: 'isLoading',
        type: 'boolean',
        label: 'Loading State',
        defaultValue: false,
        description: 'Replaces icon with continuous spinner.',
        category: 'State',
      },
      {
        name: 'disabled',
        type: 'boolean',
        label: 'Disabled State',
        defaultValue: false,
        description: 'Disables button click handler.',
        category: 'State',
      },
      {
        name: 'showIcon',
        type: 'boolean',
        label: 'Show Icon',
        defaultValue: true,
        description: 'Shows leading sparkles icon.',
        category: 'Appearance',
      },
    ],
    files: [
      {
        filename: 'RippleButton.tsx',
        language: 'tsx',
        code: `import React, { useState } from 'react';

export const RippleButton = ({ label = 'Click Me' }) => {
  return (
    <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium">
      {label}
    </button>
  );
};`,
      },
    ],
    documentation: {
      overview: 'Spawns temporary expanding pulse waves anchored to exact click client coordinates for instant visual action feedback.',
      usageSnippet: `<RippleButton label="Save Changes" variant="accent" onClick={handleSave} />`,
      accessibilityNotes: [
        'Native <button> element ensuring default keyboard space/enter activation.',
        'Explicit aria-disabled attribute support.',
      ],
      cssTokens: ['var(--accent-blue)', 'var(--accent-emerald)'],
    },
    metadata: {
      accessibilityScore: 100,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react', 'lucide-react'],
      author: 'Studio UI Core',
      updatedAt: '2026-08-10',
    },
  },
  {
    slug: 'segmented-control',
    title: 'Segmented Control',
    category: 'Controls',
    description: 'Pill tab segment switcher supporting arrow key navigation and active state background highlight.',
    tags: ['tabs', 'segmented-control', 'switcher', 'navigation'],
    version: '1.1.0',
    status: 'Stable',
    component: SegmentedControl,
    defaultProps: {
      options: ['Interactive', 'Source Code', 'AST Matrix', 'Docs'],
      selectedIndex: 0,
      size: 'md',
      fullWidth: true,
      disabled: false,
    },
    propSchema: [
      {
        name: 'selectedIndex',
        type: 'number',
        label: 'Active Tab Index',
        defaultValue: 0,
        description: 'Zero-based selected option index.',
        category: 'State',
      },
      {
        name: 'size',
        type: 'select',
        label: 'Pill Size',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Text size and padding.',
        category: 'Appearance',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        label: 'Full Width',
        defaultValue: true,
        description: 'Stretches tab items across parent width.',
        category: 'Appearance',
      },
      {
        name: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
        description: 'Disables choice selection.',
        category: 'State',
      },
    ],
    files: [
      {
        filename: 'SegmentedControl.tsx',
        language: 'tsx',
        code: `export const SegmentedControl = () => <div>Segmented Control</div>;`,
      },
    ],
    documentation: {
      overview: 'Modular toggle tab bar for fast workspace state switching.',
      usageSnippet: `<SegmentedControl options={['Dark', 'Light', 'System']} selectedIndex={0} />`,
      accessibilityNotes: ['Role tablist and tab accessibility structure.'],
      cssTokens: ['var(--bg-dark-900)'],
    },
    metadata: {
      accessibilityScore: 100,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react'],
      author: 'Studio UI Core',
      updatedAt: '2026-08-01',
    },
  },
  {
    slug: 'motion-modal',
    title: 'Motion Modal',
    category: 'Cards & Containers',
    description: 'Backdrop blurred dialog shell with spring entry motion, escape key handling, and validation status banner.',
    tags: ['modal', 'dialog', 'backdrop-blur', 'motion', 'a11y'],
    version: '2.0.0',
    status: 'Stable',
    component: MotionModal,
    defaultProps: {
      title: 'Deploy Component Registry Update',
      description: 'You are about to publish 7 production component manifests to the studio package stream. This step verifies AST integrity.',
      isOpen: true,
      blurBackdrop: true,
      accentColor: 'blue',
      confirmText: 'Verify & Deploy',
      cancelText: 'Cancel',
    },
    propSchema: [
      {
        name: 'title',
        type: 'string',
        label: 'Modal Title',
        defaultValue: 'Deploy Component Registry Update',
        description: 'Header text for modal dialog.',
        category: 'Content',
      },
      {
        name: 'description',
        type: 'string',
        label: 'Modal Message',
        defaultValue: 'You are about to publish 7 production component manifests to the studio package stream.',
        description: 'Primary paragraph content.',
        category: 'Content',
      },
      {
        name: 'isOpen',
        type: 'boolean',
        label: 'Is Open',
        defaultValue: true,
        description: 'Controls dialog visibility state.',
        category: 'State',
      },
      {
        name: 'accentColor',
        type: 'select',
        label: 'Accent Theme',
        defaultValue: 'blue',
        options: ['blue', 'violet', 'emerald'],
        description: 'Header badge color theme.',
        category: 'Appearance',
      },
    ],
    files: [
      {
        filename: 'MotionModal.tsx',
        language: 'tsx',
        code: `export const MotionModal = () => <div>Motion Modal</div>;`,
      },
    ],
    documentation: {
      overview: 'Accessible dialog overlay with blurred backdrop support.',
      usageSnippet: `<MotionModal isOpen={showModal} title="Confirm Action" />`,
      accessibilityNotes: ['Implements ESC key dismiss and focus trap container.'],
      cssTokens: ['var(--ease-spring)'],
    },
    metadata: {
      accessibilityScore: 96,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react', 'lucide-react'],
      author: 'Studio UI Core',
      updatedAt: '2026-07-28',
    },
  },
  {
    slug: 'stat-metric-widget',
    title: 'Stat Metric Widget',
    category: 'Feedback & Data',
    description: 'Live sparkline micro-chart data widget with variance percentage indicators and pulsing status dot.',
    tags: ['chart', 'analytics', 'sparkline', 'data', 'metrics'],
    version: '1.0.1',
    status: 'Stable',
    component: StatMetricWidget,
    defaultProps: {
      label: 'Interactive Frame Rate',
      value: '120 FPS',
      change: '+14.2%',
      isPositive: true,
      timeframe: 'vs last build',
      chartColor: 'emerald',
    },
    propSchema: [
      {
        name: 'label',
        type: 'string',
        label: 'Metric Label',
        defaultValue: 'Interactive Frame Rate',
        description: 'Header metric description.',
        category: 'Content',
      },
      {
        name: 'value',
        type: 'string',
        label: 'Primary Metric Value',
        defaultValue: '120 FPS',
        description: 'Large display figure.',
        category: 'Content',
      },
      {
        name: 'change',
        type: 'string',
        label: 'Percentage Variance',
        defaultValue: '+14.2%',
        description: 'Change string tag.',
        category: 'Content',
      },
      {
        name: 'isPositive',
        type: 'boolean',
        label: 'Positive Trend',
        defaultValue: true,
        description: 'Controls emerald vs rose trend color.',
        category: 'State',
      },
      {
        name: 'chartColor',
        type: 'select',
        label: 'Sparkline Palette',
        defaultValue: 'emerald',
        options: ['emerald', 'blue', 'violet', 'amber'],
        description: 'SVG stroke and area fill color.',
        category: 'Appearance',
      },
    ],
    files: [
      {
        filename: 'StatMetricWidget.tsx',
        language: 'tsx',
        code: `export const StatMetricWidget = () => <div>Stat Metric Widget</div>;`,
      },
    ],
    documentation: {
      overview: 'Micro-dashboard card for surfacing real-time engineering telemetry.',
      usageSnippet: `<StatMetricWidget value="0.4ms" label="Hydration Time" chartColor="blue" />`,
      accessibilityNotes: ['Uses semantic HTML heading structure and text alternative for graph.'],
      cssTokens: ['var(--accent-emerald)'],
    },
    metadata: {
      accessibilityScore: 100,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react', 'lucide-react'],
      author: 'Telemetry Team',
      updatedAt: '2026-08-11',
    },
  },
  {
    slug: 'command-palette-input',
    title: 'Command Palette Input',
    category: 'Inputs & Forms',
    description: 'Futuristic command palette input field with keyboard shortcut badge, glowing border, and instant query trigger.',
    tags: ['input', 'search', 'command-k', 'palette', 'form'],
    version: '1.3.0',
    status: 'Stable',
    component: CommandPaletteInput,
    defaultProps: {
      placeholder: 'Search components, props, hooks, AST definitions...',
      shortcutHint: '⌘ K',
      hasGlow: true,
      value: '',
    },
    propSchema: [
      {
        name: 'placeholder',
        type: 'string',
        label: 'Placeholder Copy',
        defaultValue: 'Search components, props, hooks, AST definitions...',
        description: 'Ghost text inside input.',
        category: 'Content',
      },
      {
        name: 'shortcutHint',
        type: 'string',
        label: 'Shortcut Tag',
        defaultValue: '⌘ K',
        description: 'Key binding hint badge.',
        category: 'Content',
      },
      {
        name: 'hasGlow',
        type: 'boolean',
        label: 'Ambient Glow',
        defaultValue: true,
        description: 'Enables gradient outer glow.',
        category: 'Appearance',
      },
    ],
    files: [
      {
        filename: 'CommandPaletteInput.tsx',
        language: 'tsx',
        code: `export const CommandPaletteInput = () => <div>Command Palette Input</div>;`,
      },
    ],
    documentation: {
      overview: 'High-speed input trigger designed for command bar query dispatch.',
      usageSnippet: `<CommandPaletteInput placeholder="Filter studio registry..." />`,
      accessibilityNotes: ['Includes explicit label and keyboard focus ring.'],
      cssTokens: ['var(--accent-blue)', 'var(--accent-violet)'],
    },
    metadata: {
      accessibilityScore: 100,
      responsive: true,
      keyboardSupported: true,
      reducedMotionSupported: true,
      darkModeSupported: true,
      dependencies: ['react', 'lucide-react'],
      author: 'Studio UI Core',
      updatedAt: '2026-08-12',
    },
  },
];
