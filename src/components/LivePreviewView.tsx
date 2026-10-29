import React, { useState } from 'react';
import { EmailTemplate } from '../types/newsletter';
import { EmailRenderer } from './EmailRenderer';
import { Monitor, Smartphone, Moon, Sun, ZoomIn, ZoomOut, RotateCcw, Send, Code, Sparkles } from 'lucide-react';

interface LivePreviewViewProps {
  template: EmailTemplate;
  onOpenExport: () => void;
  onOpenSendTest: () => void;
  onBackToBuilder: () => void;
}

export const LivePreviewView: React.FC<LivePreviewViewProps> = ({
  template,
  onOpenExport,
  onOpenSendTest,
  onBackToBuilder,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(150, Math.max(75, prev + delta)));
  };

  return (
    <div className="flex-1 bg-neutral-950 flex flex-col h-full overflow-hidden">
      {/* Preview Control Bar */}
      <div className="h-12 border-b border-neutral-800 bg-neutral-900/90 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              deviceMode === 'desktop'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (640px)</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              deviceMode === 'mobile'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (375px)</span>
          </button>
        </div>

        {/* Viewport Adjustments */}
        <div className="flex items-center gap-3">
          {/* Dark mode simulation toggle */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors ${
              isDarkMode
                ? 'bg-neutral-800 text-amber-300 border-neutral-700'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200'
            }`}
            title="Simulate how your email looks in dark mode clients"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Dark Mode: ON' : 'Dark Mode Simulation'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-lg p-0.5 text-xs text-neutral-400">
            <button
              type="button"
              onClick={() => handleZoom(-10)}
              className="p-1 hover:text-white"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono-nums px-1 text-[11px] text-neutral-300 w-10 text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => handleZoom(10)}
              className="p-1 hover:text-white"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToBuilder}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium px-2 py-1"
          >
            ← Back to Editor
          </button>
        </div>
      </div>

      {/* Inbox Details Simulation Bar */}
      <div className="bg-neutral-900/60 border-b border-neutral-800/80 px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-4 text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-300">From:</span>
          <span className="text-neutral-200">MailCraft Dispatch &lt;hello@mailcraft.io&gt;</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span className="font-semibold text-neutral-300">Preheader:</span>
          <span className="truncate max-w-sm text-neutral-400">{template.preheader}</span>
        </div>
        <div className="text-[11px] text-neutral-500 font-mono-nums">
          Rendering Engine: WebKit 17.4 Email Core
        </div>
      </div>

      {/* Render Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-neutral-950">
        <div 
          className="transition-transform duration-200 origin-top flex justify-center w-full"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <EmailRenderer
            template={template}
            isInteractive={false}
            isMobilePreview={deviceMode === 'mobile'}
            isDarkModePreview={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};
