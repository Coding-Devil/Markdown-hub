import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import { Toolbar } from './Toolbar';
import { Preview } from './Preview';
import { ExportPanel } from './ExportPanel';
import { useMarkdown } from '../hooks/useMarkdown';
import { toast } from 'react-hot-toast';
import { Maximize2, Minimize2, PanelLeft, PanelRight, Columns } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Editor() {
  const { markdown, setMarkdown, insertText } = useMarkdown();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) {
      setViewMode('editor');
    }
  }, [isMobile]);

  const renderContent = () => {
    if (viewMode === 'editor') {
      return (
        <div className="h-full overflow-auto editor-container">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-slate-100 font-mono resize-none focus:outline-none selection:bg-indigo-500/30"
            placeholder="Enter your markdown here..."
          />
        </div>
      );
    }

    if (viewMode === 'preview') {
      return <Preview markdown={markdown} />;
    }

    return (
      <Split
        sizes={[50, 50]}
        minSize={isMobile ? 200 : 300}
        gutterSize={isMobile ? 0 : 10}
        className="split h-full"
        direction={isMobile ? 'vertical' : 'horizontal'}
      >
        <div className="h-full overflow-auto editor-container">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-slate-100 font-mono resize-none focus:outline-none selection:bg-indigo-500/30"
            placeholder="Enter your markdown here..."
          />
        </div>
        <Preview markdown={markdown} />
      </Split>
    );
  };

  return (
    <div className={`h-screen ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="toolbar p-2 flex items-center gap-2 sticky top-0 z-10">
        <Toolbar onInsert={insertText} />
        
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('editor')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'editor' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700/50 text-slate-400'
              }`}
              title="Editor only"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'split' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700/50 text-slate-400'
              }`}
              title="Split view"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700/50 text-slate-400'
              }`}
              title="Preview only"
            >
              <PanelRight className="w-4 h-4" />
            </button>
          </div>

          <ExportPanel markdown={markdown} />
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="h-[calc(100vh-56px)]">
        {renderContent()}
      </div>
    </div>
  );
}
