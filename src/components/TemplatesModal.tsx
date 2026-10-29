import React from 'react';
import { EmailTemplate } from '../types/newsletter';
import { STARTER_TEMPLATES } from '../data/defaultTemplates';
import { X, LayoutTemplate, Sparkles, Check, ArrowRight } from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: EmailTemplate) => void;
  currentTemplateId: string;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  currentTemplateId,
}) => {
  if (!isOpen) return null;

  const handleSelect = (tmpl: EmailTemplate) => {
    // Clone with fresh IDs so edits don't mutate defaults
    const cloned: EmailTemplate = JSON.parse(JSON.stringify(tmpl));
    cloned.updatedAt = new Date().toISOString();
    onSelectTemplate(cloned);
    onClose();
  };

  const handleBlank = () => {
    const blank: EmailTemplate = {
      id: `blank-${Date.now()}`,
      name: 'Blank Newsletter Canvas',
      subject: 'New Newsletter Edition',
      preheader: 'A brief summary of this edition...',
      themeId: 'modern-indigo',
      updatedAt: new Date().toISOString(),
      sections: [
        {
          id: `hdr-${Date.now()}`,
          type: 'header',
          data: {
            brandName: 'MY BRAND',
            tagline: 'Weekly Newsletter',
            issueDate: 'October 2026',
            align: 'split',
            logoType: 'text',
            showBrowserLink: true,
          },
        },
        {
          id: `hero-${Date.now()}`,
          type: 'hero',
          data: {
            kicker: 'WEEKLY BRIEFING',
            title: 'Welcome to this Edition',
            subtitle: 'Add your introductory message or main announcement here.',
            bgTint: 'subtle',
            align: 'left',
          },
        },
        {
          id: `txt-${Date.now()}`,
          type: 'text',
          data: {
            headline: 'Story Headline',
            content: 'Write your story, commentary, or news roundup paragraphs here.',
            fontStyle: 'sans',
            align: 'left',
          },
        },
        {
          id: `btn-${Date.now()}`,
          type: 'button',
          data: {
            text: 'Read More',
            url: 'https://example.com',
            variant: 'primary',
            size: 'md',
            shape: 'rounded',
            align: 'left',
          },
        },
        {
          id: `ftr-${Date.now()}`,
          type: 'footer',
          data: {
            companyName: 'My Company Inc.',
            address: '123 Market St, San Francisco, CA',
            unsubscribeNotice: 'You received this email because you subscribed on our website.',
            copyrightYear: '2026',
            socials: { website: 'https://example.com' },
          },
        },
      ],
    };
    onSelectTemplate(blank);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-950/60 text-indigo-400 rounded-lg border border-indigo-800/40">
              <LayoutTemplate className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-100">Newsletter Template Gallery</h2>
              <p className="text-xs text-neutral-400">Choose a pre-composed template to jumpstart your design</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {STARTER_TEMPLATES.map((tmpl) => {
            const isCurrent = currentTemplateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'border-indigo-500 bg-neutral-800/80 ring-1 ring-indigo-500/50'
                    : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-neutral-100">
                      {tmpl.name}
                    </span>
                    {isCurrent && (
                      <span className="text-xs text-indigo-400 flex items-center gap-1 font-medium">
                        <Check className="w-3.5 h-3.5" /> Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-400 italic mb-3">
                    "{tmpl.subject}"
                  </div>
                  <div className="text-[11px] text-neutral-400 space-y-1 mb-4 bg-neutral-950/50 p-2.5 rounded-lg border border-neutral-800">
                    <div className="flex justify-between">
                      <span>Sections:</span>
                      <span className="text-neutral-200 font-mono-nums">{tmpl.sections.length} blocks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Style Theme:</span>
                      <span className="text-neutral-200 capitalize">{tmpl.themeId.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(tmpl)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{isCurrent ? 'Reset to this Template' : 'Use this Template'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {/* Blank Slate option */}
          <div className="p-4 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/50 hover:bg-neutral-850 transition-all flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-neutral-200 mb-1">
                Blank Minimalist Starter
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Start with a clean structure: Header, Hero, Text block, Button, and Footer. Build your own layout block-by-block.
              </p>
            </div>
            <button
              type="button"
              onClick={handleBlank}
              className="w-full py-2 px-3 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
            >
              <span>Start Blank</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
