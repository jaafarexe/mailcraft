import React, { useState } from 'react';
import { EmailTemplate } from '../types/newsletter';
import { generateEmailHtml } from '../utils/htmlGenerator';
import { X, Copy, Check, Download, Code, FileText } from 'lucide-react';

interface HtmlExportModalProps {
  template: EmailTemplate;
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({
  template,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'plaintext'>('html');

  if (!isOpen) return null;

  const htmlCode = generateEmailHtml(template);

  const plainText = `
Subject: ${template.subject}
Preheader: ${template.preheader}
----------------------------------------

${template.sections.map((s) => {
  if (s.type === 'hero') return `${(s.data as any).title.toUpperCase()}\n${(s.data as any).subtitle}`;
  if (s.type === 'text') return `${(s.data as any).headline ? (s.data as any).headline + '\n' : ''}${(s.data as any).content}`;
  if (s.type === 'button') return `[CTA] ${(s.data as any).text}: ${(s.data as any).url}`;
  if (s.type === 'quote') return `"${(s.data as any).quote}" — ${(s.data as any).author}`;
  if (s.type === 'footer') return `${(s.data as any).companyName}\n${(s.data as any).address}\n${(s.data as any).unsubscribeNotice}`;
  return '';
}).filter(Boolean).join('\n\n----------------------------------------\n\n')}
  `.trim();

  const handleCopy = () => {
    const textToCopy = activeTab === 'html' ? htmlCode : plainText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-email.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-950/60 text-indigo-400 rounded-lg border border-indigo-800/40">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-100">
                Export Production Email Code
              </h2>
              <p className="text-xs text-neutral-400">
                Bulletproof responsive HTML compatible with Mailchimp, Substack, Brevo, SendGrid & Klaviyo
              </p>
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

        {/* Action & Tab Bar */}
        <div className="px-6 py-3 border-b border-neutral-800/80 bg-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-neutral-950/60 p-1 rounded-lg border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'html'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              HTML Code
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('plaintext')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'plaintext'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Plain Text
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg border border-neutral-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .html</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-neutral-950 font-mono-nums text-xs">
          <pre className="text-neutral-300 leading-relaxed font-mono whitespace-pre-wrap select-all selection:bg-indigo-600 selection:text-white">
            {activeTab === 'html' ? htmlCode : plainText}
          </pre>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/40 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>{htmlCode.length.toLocaleString()} characters · Inlined CSS · Ready to send</span>
          <span className="text-neutral-500">MIME Type: text/html; charset=UTF-8</span>
        </div>
      </div>
    </div>
  );
};
