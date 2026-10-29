/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EmailTemplate, Section, SectionType } from './types/newsletter';
import { STARTER_TEMPLATES, THEMES, PRESET_IMAGES } from './data/defaultTemplates';
import { HeaderNav } from './components/HeaderNav';
import { SidebarSections } from './components/SidebarSections';
import { BuilderCanvas } from './components/BuilderCanvas';
import { SectionInspector } from './components/SectionInspector';
import { LivePreviewView } from './components/LivePreviewView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { HtmlExportModal } from './components/HtmlExportModal';
import { SendTestModal } from './components/SendTestModal';
import { TemplatesModal } from './components/TemplatesModal';

const STORAGE_KEY = 'mailcraft_current_template_v1';

export default function App() {
  const [template, setTemplate] = useState<EmailTemplate>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved newsletter template', e);
    }
    return JSON.parse(JSON.stringify(STARTER_TEMPLATES[0]));
  });

  const [currentView, setCurrentView] = useState<'builder' | 'preview' | 'stats'>('builder');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  // Modals
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSendTestOpen, setIsSendTestOpen] = useState(false);

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(template));
    } catch (e) {
      console.warn('Failed to save newsletter template', e);
    }
  }, [template]);

  // Section CRUD
  const handleAddSection = (type: SectionType) => {
    const id = `sec-${Date.now()}`;
    let newSection: Section;

    switch (type) {
      case 'header':
        newSection = {
          id,
          type: 'header',
          data: {
            brandName: 'Brand Name',
            tagline: 'Marketing Dispatch',
            issueDate: 'October 2026',
            align: 'split',
            logoType: 'text',
            showBrowserLink: true,
          },
        };
        break;

      case 'hero':
        newSection = {
          id,
          type: 'hero',
          data: {
            kicker: 'ANNOUNCEMENT',
            title: 'Your Compelling Headline Here',
            subtitle: 'Provide a crisp, engaging introduction that hooks your readers within seconds.',
            hasCta: true,
            ctaText: 'Explore Now',
            ctaUrl: 'https://example.com',
            bgTint: 'subtle',
            align: 'center',
          },
        };
        break;

      case 'text':
        newSection = {
          id,
          type: 'text',
          data: {
            headline: 'Section Subheading',
            content: 'Write your story, context, or newsletter article body here. Markdown breaks are supported between paragraphs.',
            fontStyle: 'sans',
            align: 'left',
            isCallout: false,
          },
        };
        break;

      case 'image':
        newSection = {
          id,
          type: 'image',
          data: {
            imageUrl: PRESET_IMAGES[1].svgDataUri,
            alt: 'Visual showcase',
            caption: 'Curated still life composition',
            rounded: 'lg',
            aspectRatio: '16:9',
            presetStyle: 'product',
          },
        };
        break;

      case 'button':
        newSection = {
          id,
          type: 'button',
          data: {
            text: 'Take Action Now',
            url: 'https://example.com',
            variant: 'primary',
            size: 'md',
            shape: 'rounded',
            align: 'center',
            secondaryText: 'Instant access · Cancel anytime',
          },
        };
        break;

      case 'columns':
        newSection = {
          id,
          type: 'columns',
          data: {
            headline: 'Key Benefits',
            columnCount: 2,
            items: [
              {
                id: `col-${Date.now()}-1`,
                title: 'High Deliverability',
                description: 'Optimized tables and minimal CSS to clear spam filters and render cleanly across Outlook and Apple Mail.',
                tag: 'Infrastructure',
                linkText: 'Read documentation →',
                linkUrl: '#',
              },
              {
                id: `col-${Date.now()}-2`,
                title: 'Live Responsive Engine',
                description: 'Test your copy and assets simultaneously in desktop and smartphone viewports.',
                tag: 'Design',
                linkText: 'View demo →',
                linkUrl: '#',
              },
            ],
          },
        };
        break;

      case 'quote':
        newSection = {
          id,
          type: 'quote',
          data: {
            quote: 'Simplicity is about subtracting the obvious and adding the meaningful.',
            author: 'John Maeda',
            role: 'Designer & Author',
            company: 'The Laws of Simplicity',
            avatarInitials: 'JM',
          },
        };
        break;

      case 'divider':
        newSection = {
          id,
          type: 'divider',
          data: {
            style: 'solid',
            spacing: 'md',
          },
        };
        break;

      case 'footer':
        newSection = {
          id,
          type: 'footer',
          data: {
            companyName: 'MailCraft Inc.',
            address: '100 Montgomery St, Suite 500, San Francisco, CA',
            unsubscribeNotice: 'You are receiving this email because you opted in on our site.',
            copyrightYear: '2026',
            socials: {
              website: 'https://example.com',
              twitter: 'https://x.com',
            },
          },
        };
        break;
    }

    setTemplate((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedSectionId(id);
  };

  const handleMoveSection = (id: string, direction: 'up' | 'down') => {
    setTemplate((prev) => {
      const idx = prev.sections.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.sections.length - 1) return prev;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const updated = [...prev.sections];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;

      return {
        ...prev,
        sections: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleDuplicateSection = (id: string) => {
    setTemplate((prev) => {
      const idx = prev.sections.findIndex((s) => s.id === id);
      if (idx === -1) return prev;

      const source = prev.sections[idx];
      const cloned: Section = {
        ...JSON.parse(JSON.stringify(source)),
        id: `sec-${Date.now()}`,
      };

      const updated = [...prev.sections];
      updated.splice(idx + 1, 0, cloned);

      return {
        ...prev,
        sections: updated,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleDeleteSection = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
      updatedAt: new Date().toISOString(),
    }));
    if (selectedSectionId === id) {
      setSelectedSectionId(null);
    }
  };

  const handleUpdateSection = (updated: Section) => {
    setTemplate((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === updated.id ? updated : s)),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSelectTheme = (themeId: string) => {
    setTemplate((prev) => ({
      ...prev,
      themeId,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateEmailMeta = (subject: string, preheader: string) => {
    setTemplate((prev) => ({
      ...prev,
      subject,
      preheader,
      updatedAt: new Date().toISOString(),
    }));
  };

  const selectedSection = template.sections.find((s) => s.id === selectedSectionId) || null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      {/* Top Bar Contract Navigation */}
      <HeaderNav
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenSendTest={() => setIsSendTestOpen(true)}
        activeTemplateName={template.name}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === 'builder' && (
          <>
            {/* Left Sidebar: Section Palette & Layer Hierarchy & Themes */}
            <SidebarSections
              sections={template.sections}
              selectedSectionId={selectedSectionId}
              onSelectSection={(id) => setSelectedSectionId(id)}
              onAddSection={handleAddSection}
              onMoveSection={handleMoveSection}
              onDuplicateSection={handleDuplicateSection}
              onDeleteSection={handleDeleteSection}
              activeThemeId={template.themeId}
              onSelectTheme={handleSelectTheme}
            />

            {/* Central Interactive Builder Canvas */}
            <BuilderCanvas
              template={template}
              selectedSectionId={selectedSectionId}
              onSelectSection={(id) => setSelectedSectionId(id)}
              onMoveSection={handleMoveSection}
              onDuplicateSection={handleDuplicateSection}
              onDeleteSection={handleDeleteSection}
              onAddSection={handleAddSection}
              onOpenPreview={() => setCurrentView('preview')}
            />

            {/* Right Inspector: Property Editor & Campaign Settings */}
            <SectionInspector
              section={selectedSection}
              onUpdateSection={handleUpdateSection}
              onDeleteSection={handleDeleteSection}
              onClose={() => setSelectedSectionId(null)}
              emailSubject={template.subject}
              emailPreheader={template.preheader}
              onUpdateEmailMeta={handleUpdateEmailMeta}
            />
          </>
        )}

        {currentView === 'preview' && (
          <LivePreviewView
            template={template}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenSendTest={() => setIsSendTestOpen(true)}
            onBackToBuilder={() => setCurrentView('builder')}
          />
        )}

        {currentView === 'stats' && (
          <AnalyticsDashboard />
        )}
      </div>

      {/* Export Production HTML Code Modal */}
      <HtmlExportModal
        template={template}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Send Test Dispatch Simulator Modal */}
      <SendTestModal
        template={template}
        isOpen={isSendTestOpen}
        onClose={() => setIsSendTestOpen(false)}
      />

      {/* Starter Template Gallery Modal */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={(tmpl) => {
          setTemplate(tmpl);
          setSelectedSectionId(null);
        }}
        currentTemplateId={template.id}
      />
    </div>
  );
}
