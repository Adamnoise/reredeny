import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Box,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  ShieldCheck,
  FolderKanban,
  Tag,
} from 'lucide-react';
import { RegisteredComponent, LifecycleStatus } from '../../types/studio';

interface SidebarProps {
  components: RegisteredComponent[];
  selectedSlug: string;
  onSelectComponent: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  statusFilter: string;
  onStatusFilterChange: (st: string) => void;
  onOpenCreator: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  components,
  selectedSlug,
  onSelectComponent,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  statusFilter,
  onStatusFilterChange,
  onOpenCreator,
}) => {
  const categories = [
    'All',
    'Controls',
    'Cards & Containers',
    'Buttons & Triggers',
    'Inputs & Forms',
    'Feedback & Data',
  ];

  const statuses = ['All', 'Stable', 'Development', 'Preview', 'Draft'];

  const filteredComponents = components.filter((c) => {
    const matchesCategory =
      selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStatus =
      statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: LifecycleStatus) => {
    switch (status) {
      case 'Stable':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Stable
          </span>
        );
      case 'Development':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-3 h-3" /> Dev
          </span>
        );
      case 'Preview':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3 h-3" /> Preview
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800/90 flex flex-col shrink-0 select-none h-full overflow-hidden">
      {/* Search Input Bar */}
      <div className="p-3 border-b border-slate-800/80 space-y-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search registry (⌘K)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 font-mono"
          />
        </div>

        {/* Quick Filter Pill Pills */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span className="flex items-center gap-1">
            <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
            Registry Categories
          </span>
          <span className="text-slate-500 font-bold">{filteredComponents.length} items</span>
        </div>

        {/* Category Horizontal Scroll */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Component Tree List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredComponents.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs font-mono space-y-2">
            <p>No components matched filters.</p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onCategoryChange('All');
                onStatusFilterChange('All');
              }}
              className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredComponents.map((c) => {
            const isSelected = selectedSlug === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => onSelectComponent(c.slug)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-150 group border ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500/50 shadow-md shadow-blue-500/10'
                    : 'bg-slate-950 border-transparent hover:bg-slate-900/60 hover:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg transition ${
                        isSelected
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <Box className="w-4 h-4" />
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-bold transition ${
                          isSelected ? 'text-blue-400' : 'text-slate-200 group-hover:text-slate-100'
                        }`}
                      >
                        {c.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {c.category} • v{c.version}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(c.status)}
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-tight">
                  {c.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3 h-3" />
                    {c.metadata.accessibilityScore}% A11y
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-slate-300">
                    Inspect
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Sidebar Footer CTA */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/90">
        <button
          type="button"
          onClick={onOpenCreator}
          className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-semibold font-mono flex items-center justify-center gap-2 transition shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Launch Component Creator</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
