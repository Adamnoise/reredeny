import React from 'react';
import { Activity, TrendingUp, Zap, ArrowUpRight } from 'lucide-react';

export interface StatMetricWidgetProps {
  label?: string;
  value?: string;
  change?: string;
  isPositive?: boolean;
  timeframe?: string;
  chartColor?: 'blue' | 'emerald' | 'violet' | 'amber';
}

export const StatMetricWidget: React.FC<StatMetricWidgetProps> = ({
  label = 'Interactive Frame Rate',
  value = '120 FPS',
  change = '+14.2%',
  isPositive = true,
  timeframe = 'vs last build',
  chartColor = 'emerald',
}) => {
  const chartColors = {
    emerald: { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.15)' },
    blue: { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.15)' },
    violet: { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.15)' },
    amber: { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.15)' },
  };

  const selectedChart = chartColors[chartColor];

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between gap-4 group hover:border-slate-700 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 font-mono flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          {label}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
          LIVE
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-extrabold text-slate-100 tracking-tight">{value}</div>
        <div className={`flex items-center text-xs font-mono font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          {change}
          <span className="text-[10px] text-slate-500 font-normal ml-1">{timeframe}</span>
        </div>
      </div>

      {/* SVG Sparkline Micro Chart */}
      <div className="relative h-12 w-full pt-1">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
          <defs>
            <linearGradient id={`grad-${chartColor}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={selectedChart.stroke} stopOpacity="0.4" />
              <stop offset="100%" stopColor={selectedChart.stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 30 Q 30 10, 60 25 T 120 15 T 180 5 L 200 12 L 200 40 L 0 40 Z"
            fill={`url(#grad-${chartColor})`}
          />
          <path
            d="M0 30 Q 30 10, 60 25 T 120 15 T 180 5 L 200 12"
            fill="none"
            stroke={selectedChart.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="12" r="3.5" fill={selectedChart.stroke} className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
};

export default StatMetricWidget;
