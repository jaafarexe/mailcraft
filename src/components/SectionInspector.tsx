import React from 'react';
import { Section, SectionType } from '../types/newsletter';
import { PRESET_IMAGES } from '../data/defaultTemplates';
import { 
  Sliders, 
  Trash2, 
  X, 
  Plus, 
  Image as ImageIcon,
  Link as LinkIcon,
  HelpCircle,
  FileText
} from 'lucide-react';

interface SectionInspectorProps {
  section: Section | null;
  onUpdateSection: (updated: Section) => void;
  onDeleteSection: (id: string) => void;
  onClose: () => void;
  emailSubject: string;
  emailPreheader: string;
  onUpdateEmailMeta: (subject: string, preheader: string) => void;
}

export const SectionInspector: React.FC<SectionInspectorProps> = ({
  section,
  onUpdateSection,
  onDeleteSection,
  onClose,
  emailSubject,
  emailPreheader,
  onUpdateEmailMeta,
}) => {
  if (!section) {
    return (
      <aside className="w-80 shrink-0 border-l border-neutral-800 bg-neutral-900/90 flex flex-col h-full text-neutral-200">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Campaign Settings
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <label className="block text-neutral-400 font-medium mb-1.5">
              Email Subject Line
            </label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => onUpdateEmailMeta(e.target.value, emailPreheader)}
              placeholder="e.g. October Product Release"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Shown in subscriber inbox list. Keep under 60 characters for best open rates.
            </span>
          </div>

          <div>
            <label className="block text-neutral-400 font-medium mb-1.5">
              Preview Preheader Text
            </label>
            <textarea
              rows={3}
              value={emailPreheader}
              onChange={(e) => onUpdateEmailMeta(emailSubject, e.target.value)}
              placeholder="e.g. A quick look at what we shipped this week..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Secondary line displayed right after the subject in modern mobile mail clients.
            </span>
          </div>

          <div className="p-4 rounded-lg bg-neutral-800/60 border border-neutral-750 text-neutral-400 space-y-2 mt-4">
            <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Section Inspector Tip</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Click any section on the canvas or in the Sections list to customize headlines, text styling, colors, and button links.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const updateData = (newData: Record<string, any>) => {
    onUpdateSection({
      ...section,
      data: {
        ...section.data,
        ...newData,
      },
    } as Section);
  };

  const renderFields = () => {
    switch (section.type) {
      case 'header': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Brand Name / Logo Text</label>
              <input
                type="text"
                value={d.brandName}
                onChange={(e) => updateData({ brandName: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Tagline or Subtitle</label>
              <input
                type="text"
                value={d.tagline || ''}
                onChange={(e) => updateData({ tagline: e.target.value })}
                placeholder="e.g. Weekly Engineering Brief"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Issue / Date Text</label>
              <input
                type="text"
                value={d.issueDate || ''}
                onChange={(e) => updateData({ issueDate: e.target.value })}
                placeholder="e.g. Issue #42 · October 2026"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Alignment</label>
              <select
                value={d.align}
                onChange={(e) => updateData({ align: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              >
                <option value="split">Split (Brand left, Issue right)</option>
                <option value="center">Centered Stack</option>
                <option value="left">Left Aligned</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="showBrowserLink"
                checked={Boolean(d.showBrowserLink)}
                onChange={(e) => updateData({ showBrowserLink: e.target.checked })}
                className="rounded bg-neutral-800 border-neutral-700 text-indigo-500"
              />
              <label htmlFor="showBrowserLink" className="text-xs text-neutral-300">
                Show "Web View" link
              </label>
            </div>
          </div>
        );
      }

      case 'hero': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Kicker / Overline</label>
              <input
                type="text"
                value={d.kicker || ''}
                onChange={(e) => updateData({ kicker: e.target.value })}
                placeholder="e.g. SPECIAL ANNOUNCEMENT"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Headline Title</label>
              <textarea
                rows={2}
                value={d.title}
                onChange={(e) => updateData({ title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Lead Subtitle</label>
              <textarea
                rows={3}
                value={d.subtitle}
                onChange={(e) => updateData({ subtitle: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Alignment</label>
                <select
                  value={d.align}
                  onChange={(e) => updateData({ align: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="center">Centered</option>
                  <option value="left">Left</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Background Tint</label>
                <select
                  value={d.bgTint}
                  onChange={(e) => updateData({ bgTint: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="none">None (Clean)</option>
                  <option value="subtle">Subtle Tint</option>
                  <option value="accent">Accent Tint</option>
                  <option value="dark">Dark Slate</option>
                </select>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasCta"
                  checked={Boolean(d.hasCta)}
                  onChange={(e) => updateData({ hasCta: e.target.checked })}
                  className="rounded bg-neutral-800 border-neutral-700 text-indigo-500"
                />
                <label htmlFor="hasCta" className="text-xs text-neutral-300 font-medium">
                  Include Call-to-Action Button
                </label>
              </div>
              {d.hasCta && (
                <div className="space-y-2 pt-1 pl-4 border-l border-neutral-800">
                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">CTA Label</label>
                    <input
                      type="text"
                      value={d.ctaText || ''}
                      onChange={(e) => updateData({ ctaText: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">CTA Target URL</label>
                    <input
                      type="text"
                      value={d.ctaUrl || ''}
                      onChange={(e) => updateData({ ctaUrl: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'text': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Section Headline (Optional)</label>
              <input
                type="text"
                value={d.headline || ''}
                onChange={(e) => updateData({ headline: e.target.value })}
                placeholder="e.g. Key Takeaways"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Body Text Content</label>
              <textarea
                rows={6}
                value={d.content}
                onChange={(e) => updateData({ content: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 text-xs focus:border-indigo-500 font-sans leading-relaxed"
                placeholder="Separate paragraphs with a blank double newline..."
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Font Style</label>
                <select
                  value={d.fontStyle}
                  onChange={(e) => updateData({ fontStyle: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="sans">Clean Sans-Serif</option>
                  <option value="serif">Editorial Serif</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Alignment</label>
                <select
                  value={d.align}
                  onChange={(e) => updateData({ align: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="left">Left Aligned</option>
                  <option value="center">Centered</option>
                  <option value="justify">Justified</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isCallout"
                checked={Boolean(d.isCallout)}
                onChange={(e) => updateData({ isCallout: e.target.checked })}
                className="rounded bg-neutral-800 border-neutral-700 text-indigo-500"
              />
              <label htmlFor="isCallout" className="text-xs text-neutral-300">
                Style as Callout Highlight Box
              </label>
            </div>
          </div>
        );
      }

      case 'image': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Preset Vector Graphics</label>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => updateData({ imageUrl: img.svgDataUri, alt: img.name })}
                    className="p-1.5 rounded border border-neutral-700 bg-neutral-800/80 hover:border-indigo-400 text-left text-[11px] truncate flex items-center gap-1.5"
                  >
                    <div className="w-4 h-4 rounded overflow-hidden shrink-0">
                      <img src={img.svgDataUri} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="truncate">{img.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Image URL / Data URI</label>
              <input
                type="text"
                value={d.imageUrl}
                onChange={(e) => updateData({ imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Caption Note</label>
              <input
                type="text"
                value={d.caption || ''}
                onChange={(e) => updateData({ caption: e.target.value })}
                placeholder="e.g. Figure 1: Product overview"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-medium mb-1">Clickthrough URL</label>
              <input
                type="text"
                value={d.linkUrl || ''}
                onChange={(e) => updateData({ linkUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Corners</label>
                <select
                  value={d.rounded}
                  onChange={(e) => updateData({ rounded: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="none">Square (0px)</option>
                  <option value="md">Medium (8px)</option>
                  <option value="lg">Large (12px)</option>
                  <option value="xl">Extra Large (16px)</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Aspect Ratio</label>
                <select
                  value={d.aspectRatio}
                  onChange={(e) => updateData({ aspectRatio: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="16:9">16:9 Banner</option>
                  <option value="4:3">4:3 Standard</option>
                  <option value="1:1">1:1 Square</option>
                </select>
              </div>
            </div>
          </div>
        );
      }

      case 'button': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Button Label</label>
              <input
                type="text"
                value={d.text}
                onChange={(e) => updateData({ text: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Destination URL</label>
              <input
                type="text"
                value={d.url}
                onChange={(e) => updateData({ url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Secondary Subtext</label>
              <input
                type="text"
                value={d.secondaryText || ''}
                onChange={(e) => updateData({ secondaryText: e.target.value })}
                placeholder="e.g. Free 14-day trial · No credit card required"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Style</label>
                <select
                  value={d.variant}
                  onChange={(e) => updateData({ variant: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="primary">Solid Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Shape</label>
                <select
                  value={d.shape}
                  onChange={(e) => updateData({ shape: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="rounded">Rounded</option>
                  <option value="pill">Pill</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Align</label>
                <select
                  value={d.align}
                  onChange={(e) => updateData({ align: e.target.value })}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1.5 text-neutral-100 text-xs"
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        );
      }

      case 'columns': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Section Heading</label>
              <input
                type="text"
                value={d.headline || ''}
                onChange={(e) => updateData({ headline: e.target.value })}
                placeholder="e.g. Features"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-neutral-400 font-medium">Column Items</label>
              {d.items.map((item: any, idx: number) => (
                <div key={item.id} className="p-3 bg-neutral-800/80 rounded-lg border border-neutral-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                    <span>Card #{idx + 1}</span>
                    <input
                      type="text"
                      value={item.tag || ''}
                      onChange={(e) => {
                        const newItems = [...d.items];
                        newItems[idx] = { ...item, tag: e.target.value };
                        updateData({ items: newItems });
                      }}
                      placeholder="Tag label"
                      className="w-24 bg-neutral-900 border border-neutral-700 rounded px-2 py-0.5 text-[11px] text-indigo-300"
                    />
                  </div>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...d.items];
                      newItems[idx] = { ...item, title: e.target.value };
                      updateData({ items: newItems });
                    }}
                    placeholder="Title"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100 font-medium"
                  />
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...d.items];
                      newItems[idx] = { ...item, description: e.target.value };
                      updateData({ items: newItems });
                    }}
                    placeholder="Description text"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'quote': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Quote Text</label>
              <textarea
                rows={4}
                value={d.quote}
                onChange={(e) => updateData({ quote: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 text-xs focus:border-indigo-500 italic"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Author Name</label>
              <input
                type="text"
                value={d.author}
                onChange={(e) => updateData({ author: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Role / Title</label>
                <input
                  type="text"
                  value={d.role || ''}
                  onChange={(e) => updateData({ role: e.target.value })}
                  placeholder="e.g. Lead Designer"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                />
              </div>
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={d.company || ''}
                  onChange={(e) => updateData({ company: e.target.value })}
                  placeholder="e.g. Aura Labs"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
                />
              </div>
            </div>
          </div>
        );
      }

      case 'divider': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Divider Style</label>
              <select
                value={d.style}
                onChange={(e) => updateData({ style: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              >
                <option value="solid">Solid Line</option>
                <option value="dashed">Dashed Line</option>
                <option value="dots">Dotted Line</option>
                <option value="spacer">Invisible Spacer Gap</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Spacing Height</label>
              <select
                value={d.spacing}
                onChange={(e) => updateData({ spacing: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              >
                <option value="sm">Small (12px)</option>
                <option value="md">Medium (24px)</option>
                <option value="lg">Large (40px)</option>
              </select>
            </div>
          </div>
        );
      }

      case 'footer': {
        const d = section.data as any;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={d.companyName}
                onChange={(e) => updateData({ companyName: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Mailing Address</label>
              <input
                type="text"
                value={d.address}
                onChange={(e) => updateData({ address: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs"
              />
            </div>
            <div>
              <label className="block text-neutral-400 font-medium mb-1">Unsubscribe Notice</label>
              <textarea
                rows={2}
                value={d.unsubscribeNotice}
                onChange={(e) => updateData({ unsubscribeNotice: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-neutral-100 text-xs resize-none"
              />
            </div>
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <label className="block text-neutral-400 font-medium">Social Links</label>
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={d.socials?.website || ''}
                  onChange={(e) => updateData({ socials: { ...d.socials, website: e.target.value } })}
                  placeholder="Website URL"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2.5 py-1 text-neutral-200"
                />
                <input
                  type="text"
                  value={d.socials?.twitter || ''}
                  onChange={(e) => updateData({ socials: { ...d.socials, twitter: e.target.value } })}
                  placeholder="Twitter / X profile URL"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2.5 py-1 text-neutral-200"
                />
                <input
                  type="text"
                  value={d.socials?.linkedin || ''}
                  onChange={(e) => updateData({ socials: { ...d.socials, linkedin: e.target.value } })}
                  placeholder="LinkedIn URL"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2.5 py-1 text-neutral-200"
                />
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <aside className="w-80 shrink-0 border-l border-neutral-800 bg-neutral-900/90 flex flex-col h-full text-neutral-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            {section.type} Properties
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onDeleteSection(section.id)}
            title="Delete Section"
            className="p-1 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-4 overflow-y-auto flex-1 text-xs">
        {renderFields()}
      </div>
    </aside>
  );
};
