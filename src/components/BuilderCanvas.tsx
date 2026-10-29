import React from 'react';
import { EmailTemplate, Section, SectionType } from '../types/newsletter';
import { EmailRenderer } from './EmailRenderer';
import { Plus, SlidersHorizontal, Eye, Undo2, Sparkles, Layers } from 'lucide-react';

interface BuilderCanvasProps {
  template: EmailTemplate;
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
  onMoveSection: (id: string, direction: 'up' | 'down') => void;
  onDuplicateSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
  onAddSection: (type: SectionType) => void;
  onOpenPreview: () => void;
}

export const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  template,
  selectedSectionId,
  onSelectSection,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
  onAddSection,
  onOpenPreview,
}) => {
  return (
    <main 
      className="flex-1 bg-neutral-950 flex flex-col h-full overflow-hidden"
      onClick={() => onSelectSection(null)}
    >
      {/* Canvas Top Bar */}
      <div 
        className="h-12 border-b border-neutral-800 bg-neutral-900/70 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 text-xs text-neutral-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-100 truncate">
            {template.name}
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-[11px] text-neutral-400 font-mono-nums">
            {template.sections.length} blocks
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg border border-neutral-700 text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Test Responsive Frame</span>
          </button>
        </div>
      </div>

      {/* Canvas Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        {/* Helper Banner */}
        <div 
          className="mb-4 text-xs text-neutral-400 flex items-center gap-2 max-w-xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Click any block to edit text, imagery, or styles in the right inspector panel.</span>
        </div>

        {/* Email Canvas Wrapper */}
        <div 
          className="w-full max-w-[660px]"
          onClick={(e) => e.stopPropagation()}
        >
          <EmailRenderer
            template={template}
            isInteractive={true}
            selectedSectionId={selectedSectionId}
            onSelectSection={onSelectSection}
            onMoveSection={onMoveSection}
            onDuplicateSection={onDuplicateSection}
            onDeleteSection={onDeleteSection}
            isMobilePreview={false}
          />
        </div>

        {/* Quick Add Section Bottom Floating Palette */}
        <div 
          className="mt-6 mb-12 p-3 bg-neutral-900/90 border border-neutral-800 rounded-xl shadow-xl flex flex-wrap items-center justify-center gap-2 max-w-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs font-semibold text-neutral-400 mr-1 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Insert:
          </span>
          <button
            type="button"
            onClick={() => onAddSection('hero')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Hero
          </button>
          <button
            type="button"
            onClick={() => onAddSection('text')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => onAddSection('image')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Image
          </button>
          <button
            type="button"
            onClick={() => onAddSection('button')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Button
          </button>
          <button
            type="button"
            onClick={() => onAddSection('columns')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Columns
          </button>
          <button
            type="button"
            onClick={() => onAddSection('quote')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Quote
          </button>
          <button
            type="button"
            onClick={() => onAddSection('divider')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            Divider
          </button>
        </div>
      </div>
    </main>
  );
};
