import React from 'react';
import { ToolbarButton } from './ToolbarButton';
import { toolbarGroups } from '../config/toolbarConfig';

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
}

export function Toolbar({ onInsert }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {toolbarGroups.map((group, index) => (
        <React.Fragment key={group.name}>
          <div className="flex items-center gap-1">
            {group.items.map((item) => (
              <ToolbarButton
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => onInsert(item.before, item.after)}
              />
            ))}
          </div>
          {index < toolbarGroups.length - 1 && (
            <div className="h-6 w-px bg-slate-700/50" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}