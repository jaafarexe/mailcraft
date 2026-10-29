import React from 'react';
import { EmailTemplate, ThemeStyle, Section, SectionType } from '../types/newsletter';
import { THEMES } from '../data/defaultTemplates';
import { 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Trash2, 
  GripVertical,
  ExternalLink,
  Quote,
  Sparkles
} from 'lucide-react';

interface EmailRendererProps {
  template: EmailTemplate;
  isInteractive?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (id: string) => void;
  onMoveSection?: (id: string, direction: 'up' | 'down') => void;
  onDuplicateSection?: (id: string) => void;
  onDeleteSection?: (id: string) => void;
  isMobilePreview?: boolean;
  isDarkModePreview?: boolean;
}

export const EmailRenderer: React.FC<EmailRendererProps> = ({
  template,
  isInteractive = false,
  selectedSectionId,
  onSelectSection,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
  isMobilePreview = false,
  isDarkModePreview = false,
}) => {
  const theme = THEMES.find((t) => t.id === template.themeId) || THEMES[0];
  const isSerif = theme.fontFamily === 'serif';

  // Optical compensation for dark mode preview
  const canvasBg = isDarkModePreview ? '#111827' : theme.canvasColor;
  const outerBg = isDarkModePreview ? '#030712' : theme.backgroundColor;
  const textColor = isDarkModePreview ? '#f9fafb' : theme.textColor;
  const mutedColor = isDarkModePreview ? '#9ca3af' : theme.mutedColor;
  const borderColor = isDarkModePreview ? '#374151' : theme.borderColor;
  const cardBg = isDarkModePreview ? '#1f2937' : theme.backgroundColor;

  const renderSectionContent = (sec: Section, index: number) => {
    switch (sec.type) {
      case 'header': {
        const d = sec.data;
        return (
          <div 
            className="px-6 py-5 border-b transition-colors"
            style={{ borderColor }}
          >
            <div className={`flex flex-wrap items-center gap-3 ${
              d.align === 'center' ? 'justify-center text-center' : 
              d.align === 'split' ? 'justify-between' : 'justify-start'
            }`}>
              <div>
                <div 
                  className={`text-xl font-extrabold tracking-tight ${isSerif ? 'font-serif-editor' : ''}`}
                  style={{ color: textColor }}
                >
                  {d.brandName}
                </div>
                {d.tagline && (
                  <div className="text-xs mt-0.5" style={{ color: mutedColor }}>
                    {d.tagline}
                  </div>
                )}
              </div>

              {(d.issueDate || d.showBrowserLink) && (
                <div className="flex items-center gap-3 text-xs" style={{ color: mutedColor }}>
                  {d.issueDate && <span className="font-medium font-mono-nums">{d.issueDate}</span>}
                  {d.showBrowserLink && (
                    <span className="hover:underline cursor-pointer flex items-center gap-1">
                      Web View <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'hero': {
        const d = sec.data;
        const bgStyle = d.bgTint === 'subtle' ? `${theme.primaryColor}14` :
                        d.bgTint === 'accent' ? `${theme.accentColor}20` :
                        d.bgTint === 'dark' ? '#0f172a' : 'transparent';
        const heroTextColor = d.bgTint === 'dark' ? '#ffffff' : textColor;
        const heroMutedColor = d.bgTint === 'dark' ? '#94a3b8' : mutedColor;

        return (
          <div 
            className={`px-8 py-10 transition-colors ${d.align === 'center' ? 'text-center' : 'text-left'}`}
            style={{ backgroundColor: bgStyle }}
          >
            {d.kicker && (
              <div 
                className="text-xs font-bold uppercase tracking-wider mb-3 inline-block"
                style={{ color: theme.primaryColor }}
              >
                {d.kicker}
              </div>
            )}
            <h1 
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 leading-tight ${isSerif ? 'font-serif-editor' : ''}`}
              style={{ color: heroTextColor }}
            >
              {d.title}
            </h1>
            <p 
              className="text-base leading-relaxed mb-6 max-w-xl mx-auto"
              style={{ color: heroMutedColor }}
            >
              {d.subtitle}
            </p>
            {d.hasCta && (
              <div className={`pt-1 ${d.align === 'center' ? 'flex justify-center' : ''}`}>
                <a 
                  href={d.ctaUrl || '#'} 
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-sm hover:opacity-95 transition-opacity"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {d.ctaText || 'Learn More'}
                </a>
              </div>
            )}
          </div>
        );
      }

      case 'text': {
        const d = sec.data;
        const fontClass = d.fontStyle === 'serif' ? 'font-serif-editor' : '';
        const alignClass = d.align === 'center' ? 'text-center' : d.align === 'justify' ? 'text-justify' : 'text-left';

        if (d.isCallout) {
          return (
            <div className="px-6 py-4">
              <div 
                className="p-5 rounded-lg border transition-colors"
                style={{ backgroundColor: cardBg, borderColor }}
              >
                {d.headline && (
                  <div className="text-sm font-bold mb-2" style={{ color: theme.primaryColor }}>
                    {d.headline}
                  </div>
                )}
                <div 
                  className={`text-sm leading-relaxed italic ${fontClass}`}
                  style={{ color: textColor }}
                >
                  {d.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-2 last:mb-0">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className={`px-6 sm:px-8 py-5 ${alignClass}`}>
            {d.headline && (
              <h2 
                className={`text-xl font-bold tracking-tight mb-3 ${isSerif ? 'font-serif-editor' : ''}`}
                style={{ color: textColor }}
              >
                {d.headline}
              </h2>
            )}
            <div 
              className={`text-sm sm:text-base leading-relaxed space-y-3.5 ${fontClass}`}
              style={{ color: textColor }}
            >
              {d.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        );
      }

      case 'image': {
        const d = sec.data;
        const roundedClass = 
          d.rounded === 'xl' ? 'rounded-2xl' :
          d.rounded === 'lg' ? 'rounded-xl' :
          d.rounded === 'md' ? 'rounded-lg' :
          d.rounded === 'sm' ? 'rounded' : 'rounded-none';

        return (
          <div className="px-6 sm:px-8 py-4">
            <div className="overflow-hidden border border-black/5" style={{ borderRadius: d.rounded === 'none' ? '0' : '12px' }}>
              <img 
                src={d.imageUrl} 
                alt={d.alt || 'Newsletter image'} 
                className={`w-full object-cover ${roundedClass} block`}
                style={{ 
                  maxHeight: d.aspectRatio === '16:9' ? '320px' : d.aspectRatio === '1:1' ? '400px' : '360px' 
                }}
                referrerPolicy="no-referrer"
              />
            </div>
            {d.caption && (
              <div className="text-xs mt-2.5 text-center italic" style={{ color: mutedColor }}>
                {d.caption}
              </div>
            )}
          </div>
        );
      }

      case 'columns': {
        const d = sec.data;
        return (
          <div className="px-6 sm:px-8 py-4">
            {d.headline && (
              <h3 
                className={`text-lg font-bold tracking-tight mb-4 ${isSerif ? 'font-serif-editor' : ''}`}
                style={{ color: textColor }}
              >
                {d.headline}
              </h3>
            )}
            <div className={`grid gap-4 ${d.columnCount === 3 && !isMobilePreview ? 'grid-cols-3' : isMobilePreview ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {d.items.map((col) => (
                <div 
                  key={col.id} 
                  className="p-4 rounded-lg border transition-colors flex flex-col justify-between"
                  style={{ backgroundColor: cardBg, borderColor }}
                >
                  <div>
                    {col.tag && (
                      <div className="text-xs font-semibold mb-1" style={{ color: theme.primaryColor }}>
                        {col.tag}
                      </div>
                    )}
                    <h4 className="text-sm font-bold mb-1.5" style={{ color: textColor }}>
                      {col.title}
                    </h4>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: mutedColor }}>
                      {col.description}
                    </p>
                  </div>
                  {col.linkText && (
                    <span 
                      className="text-xs font-medium cursor-pointer hover:underline inline-flex items-center gap-1"
                      style={{ color: theme.primaryColor }}
                    >
                      {col.linkText}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'quote': {
        const d = sec.data;
        return (
          <div className="px-6 sm:px-8 py-6">
            <div 
              className="pl-5 border-l-2 flex flex-col gap-2"
              style={{ borderColor: theme.primaryColor }}
            >
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 shrink-0 mt-1 opacity-40" style={{ color: theme.primaryColor }} />
                <blockquote 
                  className={`text-base italic leading-relaxed ${isSerif ? 'font-serif-editor' : ''}`}
                  style={{ color: textColor }}
                >
                  "{d.quote}"
                </blockquote>
              </div>
              <div className="flex items-center gap-3 pt-1">
                {d.avatarInitials && (
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {d.avatarInitials}
                  </div>
                )}
                <div className="text-xs">
                  <span className="font-bold" style={{ color: textColor }}>{d.author}</span>
                  {(d.role || d.company) && (
                    <span style={{ color: mutedColor }}> · {d.role}{d.company ? `, ${d.company}` : ''}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'button': {
        const d = sec.data;
        const radiusClass = d.shape === 'pill' ? 'rounded-full' : d.shape === 'square' ? 'rounded-none' : 'rounded-lg';
        const sizeClass = d.size === 'lg' ? 'px-8 py-3.5 text-base' : d.size === 'sm' ? 'px-4 py-2 text-xs' : 'px-6 py-2.5 text-sm';
        const isPrimary = d.variant === 'primary';
        const isSecondary = d.variant === 'secondary';
        const isOutline = d.variant === 'outline';

        const btnBg = isPrimary ? theme.primaryColor : isSecondary ? cardBg : 'transparent';
        const btnTextColor = isPrimary ? '#ffffff' : textColor;
        const btnBorder = isOutline ? `1px solid ${borderColor}` : 'none';

        return (
          <div className={`px-6 sm:px-8 py-5 ${
            d.align === 'center' ? 'text-center' : d.align === 'right' ? 'text-right' : 'text-left'
          }`}>
            <a 
              href={d.url || '#'} 
              onClick={(e) => e.preventDefault()}
              className={`inline-block font-semibold transition-transform active:scale-95 ${radiusClass} ${sizeClass}`}
              style={{ 
                backgroundColor: btnBg, 
                color: btnTextColor, 
                border: btnBorder,
              }}
            >
              {d.text}
            </a>
            {d.secondaryText && (
              <div className="text-xs mt-2" style={{ color: mutedColor }}>
                {d.secondaryText}
              </div>
            )}
          </div>
        );
      }

      case 'divider': {
        const d = sec.data;
        const pyClass = d.spacing === 'lg' ? 'py-8' : d.spacing === 'sm' ? 'py-3' : 'py-5';

        if (d.style === 'spacer') {
          return <div className={`w-full ${d.spacing === 'lg' ? 'h-10' : 'h-5'}`} />;
        }

        const borderStyle = d.style === 'dashed' ? 'border-dashed' : d.style === 'dots' ? 'border-dotted' : 'border-solid';

        return (
          <div className={`px-6 sm:px-8 ${pyClass}`}>
            <div className={`w-full border-t ${borderStyle}`} style={{ borderColor }} />
          </div>
        );
      }

      case 'footer': {
        const d = sec.data;
        return (
          <div 
            className="px-6 sm:px-8 py-8 border-t text-center text-xs leading-relaxed transition-colors"
            style={{ backgroundColor: cardBg, borderColor, color: mutedColor }}
          >
            <div className="font-bold text-sm mb-1" style={{ color: textColor }}>
              {d.companyName}
            </div>
            <div className="mb-2 max-w-sm mx-auto">{d.address}</div>
            <div className="mb-3 max-w-md mx-auto">{d.unsubscribeNotice}</div>
            
            {d.socials && (
              <div className="flex items-center justify-center gap-3 mb-3">
                {Object.entries(d.socials).map(([name, url]) => (
                  url ? (
                    <span 
                      key={name}
                      className="cursor-pointer hover:underline font-medium capitalize"
                      style={{ color: theme.primaryColor }}
                    >
                      {name}
                    </span>
                  ) : null
                ))}
              </div>
            )}
            
            <div className="text-[11px] opacity-75">
              © {d.copyrightYear} {d.companyName}. All rights reserved.
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full flex justify-center py-6 px-3 transition-colors duration-200"
      style={{ backgroundColor: outerBg }}
    >
      {/* Newsletter Card Container */}
      <div 
        className={`w-full transition-all duration-300 shadow-xl overflow-hidden border ${
          isMobilePreview ? 'max-w-[375px] rounded-3xl' : 'max-w-[640px] rounded-xl'
        }`}
        style={{ 
          backgroundColor: canvasBg,
          borderColor: borderColor,
        }}
      >
        {/* Mobile Status Bar simulation if mobile preview */}
        {isMobilePreview && (
          <div className="bg-neutral-900 text-neutral-400 px-6 py-2.5 flex items-center justify-between text-[11px] font-mono-nums border-b border-neutral-800">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Client Header bar simulating Mail app */}
        <div 
          className="px-6 py-3 border-b flex items-center justify-between text-xs transition-colors"
          style={{ backgroundColor: cardBg, borderColor }}
        >
          <div className="truncate max-w-[80%]">
            <span className="font-semibold" style={{ color: textColor }}>Subject: </span>
            <span style={{ color: mutedColor }}>{template.subject}</span>
          </div>
          <div className="text-[10px] font-mono-nums px-2 py-0.5 rounded bg-black/5" style={{ color: mutedColor }}>
            {template.sections.length} sections
          </div>
        </div>

        {/* Email Content Blocks */}
        <div className="divide-y divide-transparent">
          {template.sections.map((section, idx) => {
            const isSelected = isInteractive && selectedSectionId === section.id;
            
            return (
              <div 
                key={section.id}
                onClick={() => isInteractive && onSelectSection?.(section.id)}
                className={`relative group transition-all duration-150 ${
                  isInteractive ? 'cursor-pointer hover:ring-2 hover:ring-indigo-400/60' : ''
                } ${
                  isSelected ? 'ring-2 ring-indigo-600 z-10' : ''
                }`}
              >
                {/* Floating Quick Action Toolbar for Selected Section */}
                {isInteractive && isSelected && (
                  <div className="absolute -top-3.5 right-4 z-20 flex items-center gap-1 bg-neutral-900 text-white px-2 py-1 rounded-md shadow-lg text-xs font-sans">
                    <span className="text-[10px] font-semibold text-neutral-300 mr-1 uppercase">
                      {section.type}
                    </span>
                    <button
                      type="button"
                      title="Move Up"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveSection?.(section.id, 'up');
                      }}
                      className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Move Down"
                      disabled={idx === template.sections.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveSection?.(section.id, 'down');
                      }}
                      className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Duplicate Section"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateSection?.(section.id);
                      }}
                      className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Delete Section"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSection?.(section.id);
                      }}
                      className="p-1 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Section Content */}
                {renderSectionContent(section, idx)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
