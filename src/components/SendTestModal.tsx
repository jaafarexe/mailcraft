import React, { useState } from 'react';
import { EmailTemplate } from '../types/newsletter';
import { X, Send, CheckCircle2, Mail, Clock, ShieldCheck } from 'lucide-react';

interface SendTestModalProps {
  template: EmailTemplate;
  isOpen: boolean;
  onClose: () => void;
}

export const SendTestModal: React.FC<SendTestModalProps> = ({
  template,
  isOpen,
  onClose,
}) => {
  const [recipient, setRecipient] = useState('jaafar.exe@gmail.com');
  const [senderName, setSenderName] = useState('MailCraft Dispatch');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setSentSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950/60 text-emerald-400 rounded-lg border border-emerald-800/40">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-100">Send Test Dispatch</h2>
              <p className="text-xs text-neutral-400">Verify rendering across actual email inboxes</p>
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

        {sentSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-100">Test Dispatch Delivered!</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                A rendering test of <span className="text-neutral-200 font-medium">"{template.subject}"</span> was simulated to <span className="text-indigo-400 font-mono">{recipient}</span>.
              </p>
            </div>

            {/* Inbox snippet preview */}
            <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg text-left text-xs space-y-1">
              <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                <span className="font-semibold text-neutral-200">{senderName}</span>
                <span className="flex items-center gap-1 font-mono-nums"><Clock className="w-3 h-3" /> Just now</span>
              </div>
              <div className="font-bold text-neutral-100 truncate">{template.subject}</div>
              <div className="text-neutral-400 text-[11px] truncate">{template.preheader}</div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors"
              >
                Send Another Test
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Recipient Email Address
              </label>
              <input
                type="email"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-400">
                <span>Quick fill:</span>
                <button
                  type="button"
                  onClick={() => setRecipient('jaafar.exe@gmail.com')}
                  className="text-indigo-400 hover:underline"
                >
                  jaafar.exe@gmail.com
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setRecipient('team-qa@mailcraft.io')}
                  className="text-indigo-400 hover:underline"
                >
                  team-qa@mailcraft.io
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                From Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3.5 py-2 text-neutral-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Campaign Summary */}
            <div className="p-3.5 bg-neutral-950/60 rounded-lg border border-neutral-800 space-y-2 text-neutral-400 text-[11px]">
              <div className="flex justify-between">
                <span>Subject:</span>
                <span className="text-neutral-200 font-medium truncate max-w-[240px]">{template.subject}</span>
              </div>
              <div className="flex justify-between">
                <span>Sections:</span>
                <span className="text-neutral-200 font-mono-nums">{template.sections.length} blocks compiled</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DKIM / SPF simulation checks pass</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 bg-transparent rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
              >
                {isSending ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
