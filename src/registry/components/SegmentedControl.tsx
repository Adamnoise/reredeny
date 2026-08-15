import React, { useState } from 'react';

export interface SegmentedControlProps {
  options?: string[];
  selectedIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onChange?: (index: number, value: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options = ['Interactive', 'Source Code', 'AST Matrix', 'Docs'],
  selectedIndex: controlledIndex,
  size = 'md',
  fullWidth = true,
  disabled = false,
  onChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(controlledIndex ?? 0);
  const selected = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const handleSelect = (idx: number, opt: string) => {
    if (disabled) return;
    setInternalIndex(idx);
    onChange?.(idx, opt);
  };

  const sizes = {
    sm: 'p-1 text-xs gap-1',
    md: 'p-1.5 text-sm gap-1.5',
    lg: 'p-2 text-base gap-2',
  };

  const itemSizes = {
    sm: 'px-2.5 py-1 rounded-md',
    md: 'px-3.5 py-1.5 rounded-lg font-medium',
    lg: 'px-4 py-2 rounded-xl font-semibold',
  };

  return (
    <div
      className={`inline-flex items-center bg-slate-900/90 border border-slate-800 rounded-2xl shadow-inner ${
        sizes[size]
      } ${fullWidth ? 'w-full' : ''}`}
    >
      {options.map((opt, idx) => {
        const isSelected = selected === idx;
        return (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => handleSelect(idx, opt)}
            className={`relative flex-1 inline-flex items-center justify-center transition-all duration-200 select-none ${
              itemSizes[size]
            } ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
