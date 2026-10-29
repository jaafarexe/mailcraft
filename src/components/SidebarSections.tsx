import React, { useState } from 'react';
import { SectionType, Section, ThemeStyle } from '../types/newsletter';
import { THEMES, PRESET_IMAGES } from '../data/defaultTemplates';
import { 
  Plus, 
  Layers, 
  Palette, 
  Heading, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Columns, 
  Quote, 
  Minus, 
  Menu,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

interface SidebarSectionsProps {
  sections: Section[];
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
  onAddSection: (type: SectionType) => void;
  onMoveSection: (id: string, direction: 'up' | 'down') => void;
  onDuplicateSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
  activeThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const SidebarSections: React.FC<SidebarSectionsProps> = ({
  sections,
  selectedSectionId,
  onSelectSection,
  onAddSection,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
  activeThemeId,
  onSelectTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'layers' | 'themes'>('add');

  const SECTION_OPTIONS: { type: SectionType; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      type: 'header',
      title: 'Header & Brand',
      desc: 'Wordmark, issue edition & web view link',
      icon: <Heading className="w-4 h-4 text-indigo-400" />,
    },
    {
      type: 'hero',
      title: 'Hero Banner',
      desc: 'High-impact headline, kicker & lead CTA',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    },
    {
      type: 'text',
      title: 'Text & Prose',
      desc: 'Headlines, body paragraphs, callout quotes',
      icon: <Type className="w-4 h-4 text-emerald-400" />,
    },
    {
      type: 'image',
      title: 'Image / Visual',
      desc: 'Curated SVG vector or custom image URL',
      icon: <ImageIcon className="w-4 h-4 text-sky-400" />,
    },
    {
      type: 'columns',
      title: 'Multi-Column Grid',
      desc: '2 or 3-column feature cards with tags',
      icon: <Columns className="w-4 h-4 text-purple-400" />,
    },
    {
      type: 'quote',
      title: 'Testimonial & Quote',
      desc: 'Pull quote, client attribution & avatar',
      icon: <Quote className="w-4 h-4 text-rose-400" />,
    },
    {
      type: 'button',
      title: 'Action Button / CTA',
      desc: 'Primary button, secondary note & link',
      icon: <Square className="w-4 h-4 text-blue-400" />,
    },
    {
      type: 'divider',
      title: 'Divider & Spacer',
      desc: 'Solid line, dashed border or breathing gap',
      icon: <Minus className="w-4 h-4 text-neutral-400" />,
    },
    {
      type: 'footer',
      title: 'Footer & Compliance',
      desc: 'Postal address, unsubscribe & social links',
      icon: <Menu className="w-4 h-4 text-slate-400" />,
    },
  ];

  return (
    <aside className="w-72 lg:w-80 shrink-0 border-r border-neutral-800 bg-neutral-900/90 flex flex-col h-full text-neutral-200">
      {/* Sidebar Navigation Tabs */}
      <div className="flex border-b border-neutral-800 bg-neutral-950/60 p-1.5 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('add')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'add'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('layers')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'layers'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Sections ({sections.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('themes')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'themes'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Styles</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
        {/* ADD SECTIONS TAB */}
        {activeTab === 'add' && (
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-2">
              Insert Section Block
            </div>
            {SECTION_OPTIONS.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => onAddSection(item.type)}
                className="w-full text-left p-2.5 rounded-lg border border-neutral-800/80 bg-neutral-900 hover:bg-neutral-800/80 hover:border-neutral-700 transition-all group flex items-start gap-3"
              >
                <div className="p-2 rounded-md bg-neutral-800 border border-neutral-700/60 group-hover:scale-105 transition-transform shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-neutral-100 flex items-center justify-between">
                    <span>{item.title}</span>
                    <Plus className="w-3 h-3 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 truncate">
                    {item.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* LAYERS & REORDER TAB */}
        {activeTab === 'layers' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Section Hierarchy
              </span>
              <span className="text-[11px] font-mono-nums text-neutral-500">
                {sections.length} blocks
              </span>
            </div>

            {sections.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-lg">
                No sections yet. Click "Add" tab to insert blocks.
              </div>
            ) : (
              sections.map((sec, idx) => {
                const isSelected = selectedSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-neutral-800/90 border-indigo-500 shadow-sm'
                        : 'bg-neutral-900 border-neutral-800/80 hover:bg-neutral-800/50 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono-nums text-[10px] text-neutral-500 w-4 text-center">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="font-bold text-neutral-200 capitalize">
                          {sec.type}
                        </div>
                        <div className="text-[10px] text-neutral-400 truncate">
                          {sec.type === 'hero' ? (sec.data as any).title :
                           sec.type === 'text' ? ((sec.data as any).headline || 'Prose paragraph') :
                           sec.type === 'button' ? (sec.data as any).text :
                           sec.type === 'header' ? (sec.data as any).brandName :
                           sec.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => onMoveSection(sec.id, 'up')}
                        title="Move Up"
                        className="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200 disabled:opacity-20"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === sections.length - 1}
                        onClick={() => onMoveSection(sec.id, 'down')}
                        title="Move Down"
                        className="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200 disabled:opacity-20"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDuplicateSection(sec.id)}
                        title="Duplicate"
                        className="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteSection(sec.id)}
                        title="Delete"
                        className="p-1 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* THEMES TAB */}
        {activeTab === 'themes' && (
          <div className="space-y-3">
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1">
              Curated Style Systems
            </div>
            {THEMES.map((theme) => {
              const isSelected = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onSelectTheme(theme.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-neutral-800 shadow-md ring-1 ring-indigo-500/50'
                      : 'border-neutral-800 bg-neutral-900 hover:bg-neutral-800/60 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-neutral-100">
                      {theme.name}
                    </span>
                    {isSelected && (
                      <span className="text-indigo-400 text-xs flex items-center gap-1 font-medium">
                        <Check className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal mb-2.5">
                    {theme.description}
                  </p>

                  {/* Theme Color Swatches */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-neutral-800/70">
                    <div 
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: theme.primaryColor }}
                      title="Primary Color" 
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: theme.accentColor }} 
                      title="Accent Color"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-neutral-600 shrink-0" 
                      style={{ backgroundColor: theme.canvasColor }} 
                      title="Card Background"
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-neutral-600 shrink-0" 
                      style={{ backgroundColor: theme.backgroundColor }} 
                      title="Outer Canvas"
                    />
                    <span className="text-[10px] text-neutral-500 ml-auto capitalize">
                      {theme.fontFamily} font
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
