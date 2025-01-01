import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolbarButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function ToolbarButton({ icon: Icon, label, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors group"
      title={label}
    >
      <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
    </button>
  );
}