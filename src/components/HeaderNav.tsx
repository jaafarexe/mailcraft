import React from 'react';
import { Mail, Code, Send, LayoutTemplate, BarChart3, Edit3, Smartphone, Monitor } from 'lucide-react';

interface HeaderNavProps {
  currentView: 'builder' | 'preview' | 'stats';
  onSelectView: (view: 'builder' | 'preview' | 'stats') => void;
  onOpenTemplates: () => void;
  onOpenExport: () => void;
  onOpenSendTest: () => void;
  activeTemplateName: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onSelectView,
  onOpenTemplates,
  onOpenExport,
  onOpenSendTest,
  activeTemplateName,
}) => {
  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-950 px-4 sm:px-6 flex items-center justify-between gap-8 shrink-0 z-30 select-none">
      {/* Zone 1: Brand title, one line */}
      <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
          <Mail className="w-4 h-4" />
        </div>
        <span className="text-sm sm:text-base font-extrabold tracking-tight text-white whitespace-nowrap">
          MailCraft
        </span>
        <span className="hidden md:inline-block text-neutral-600 text-xs">/</span>
        <span className="hidden md:inline-block text-xs text-neutral-400 font-medium truncate max-w-[180px]">
          {activeTemplateName}
        </span>
      </div>

      {/* Zone 2: 4 nav links, single-line */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => onSelectView('builder')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'builder'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Builder</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectView('preview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'preview'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>

        <button
          type="button"
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectView('stats')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'stats'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Subscriber Stats</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
        <button
          type="button"
          onClick={onOpenSendTest}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Send className="w-3.5 h-3.5 text-emerald-400" />
          <span>Send Test</span>
        </button>

        <button
          type="button"
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Export HTML</span>
        </button>
      </div>
    </header>
  );
};
