import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { toast } from 'react-hot-toast';
import { Copy, FileText, Download, Settings } from 'lucide-react';

interface ExportPanelProps {
  markdown: string;
}

interface ExportSettings {
  font: string;
  fontSize: string;
  lineHeight: string;
  maxWidth: string;
}

const defaultSettings: ExportSettings = {
  font: 'Inter',
  fontSize: '16px',
  lineHeight: '1.8',
  maxWidth: '65ch'
};

export function ExportPanel({ markdown }: ExportPanelProps) {
  const [settings, setSettings] = useState(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);

  const exportHtml = () => {
    const html = marked.parse(markdown);
    const exportTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <!-- Add Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Georgia&family=Arial:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: Georgia, serif;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 50em;
            margin: 2em auto;
            padding: 0 1em;
        }

        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            font-family: Arial, sans-serif;
            color: #111827;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }

        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }

        p, ul, ol {
            margin-bottom: 1em;
            color: #1f2937;
        }

        /* Code blocks */
        pre {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 1.25em;
            overflow-x: auto;
            font-family: 'Fira Code', Consolas, monospace;
            font-size: 0.9em;
            margin: 1.5em 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        code {
            font-family: 'Times New Roman', sans-serif;
            color: darkviolet;
            padding: 0.2em 0.4em;
            font-size: 1em;
            
        }

        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            font-size: 0.9em;
        }

        th, td {
            border: 1.5px solid #64748b;
            padding: 0.75em;
            text-align: left;
        }

        th {
            background-color: #f8fafc;
            font-weight: 600;
            color: #1f2937;
        }

        tr:nth-child(even) {
            background-color: #f8fafc;
        }

        /* Blockquotes */
        blockquote {
            border-left: 4px solid #64748b;
            margin: 1.5em 0;
            padding: 0.5em 1em;
            color: #4b5563;
            background-color: #f8fafc;
        }

        /* Links */
        a {
            color: #2563eb;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Images */
        img {
            max-width: 100%;
            height: auto;
            margin: 1.5em 0;
            border-radius: 4px;
        }

        /* Lists */
        ul, ol {
            padding-left: 1.5em;
        }

        li {
            margin-bottom: 0.5em;
        }

        /* Horizontal Rule */
        hr {
            border: none;
            border-top: 2px solid #000000;
            margin: 2em 0;
        }

        /* Print-specific styles */
        @media print {
            body {
                max-width: none;
                margin: 1cm;
                padding: 0;
            }

            pre, code {
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            a[href]:after {
                content: " (" attr(href) ")";
            }
        }

        /* Update checklist styles */
        input[type="checkbox"] {
            appearance: none;
            -webkit-appearance: none;
            width: 1.2em;
            height: 1.2em;
            border: 2px solid #64748b;
            border-radius: 4px;
            margin-right: 0.5em;
            position: relative;
            top: 0.2em;
            cursor: pointer;
        }

        input[type="checkbox"]:checked {
            background-color: #4338ca;
            border-color: #4338ca;
        }

        input[type="checkbox"]:checked::after {
            content: "✓";
            color: white;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <article class="content">
        ${html}
    </article>
</body>
</html>`;

    const blob = new Blob([exportTemplate], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML file exported successfully!');
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40"
        >
          <Settings className="w-4 h-4" />
        </button>
        
        {showSettings && (
          <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-4 z-20">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">Export Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Font Family</label>
                <select
                  value={settings.font}
                  onChange={(e) => setSettings({ ...settings, font: e.target.value })}
                  className="w-full bg-slate-700 rounded-md px-2 py-1 text-sm text-slate-200 border border-slate-600 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Merriweather">Merriweather</option>
                  <option value="system-ui">System UI</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Font Size</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                  className="w-full bg-slate-700 rounded-md px-2 py-1 text-sm text-slate-200 border border-slate-600 focus:outline-none focus:border-indigo-500"
                >
                  <option value="14px">Small</option>
                  <option value="16px">Medium</option>
                  <option value="18px">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Line Height</label>
                <select
                  value={settings.lineHeight}
                  onChange={(e) => setSettings({ ...settings, lineHeight: e.target.value })}
                  className="w-full bg-slate-700 rounded-md px-2 py-1 text-sm text-slate-200 border border-slate-600 focus:outline-none focus:border-indigo-500"
                >
                  <option value="1.5">Compact</option>
                  <option value="1.8">Comfortable</option>
                  <option value="2">Spacious</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={copyToClipboard}
        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40"
      >
        <Copy className="w-4 h-4" />
        Copy
      </button>
      
      <button
        onClick={exportHtml}
        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40"
      >
        <FileText className="w-4 h-4" />
        Export HTML
      </button>
    </div>
  );
}