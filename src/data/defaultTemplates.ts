import { EmailTemplate, ThemeStyle, Section } from '../types/newsletter';

export const THEMES: ThemeStyle[] = [
  {
    id: 'modern-indigo',
    name: 'Modern Studio',
    description: 'Clean crisp SaaS aesthetic with deep slate and vibrant indigo accents',
    primaryColor: '#4f46e5', // indigo-600
    accentColor: '#6366f1',
    backgroundColor: '#f1f5f9', // slate-100
    canvasColor: '#ffffff',
    textColor: '#0f172a',
    mutedColor: '#64748b',
    borderColor: '#e2e8f0',
    fontFamily: 'sans',
    radius: 'rounded-xl',
  },
  {
    id: 'editorial-serif',
    name: 'Literary Editorial',
    description: 'Warm cream canvas, sophisticated Source Serif typography and rich charcoal',
    primaryColor: '#1c1917', // stone-900
    accentColor: '#b45309', // amber-700
    backgroundColor: '#f5f5f4', // stone-100
    canvasColor: '#fafaf9', // stone-50
    textColor: '#1c1917',
    mutedColor: '#78716c',
    borderColor: '#e7e5e4',
    fontFamily: 'serif',
    radius: 'rounded-none',
  },
  {
    id: 'monochrome-noir',
    name: 'Swiss Monochrome',
    description: 'Pure high-contrast minimalist black & white with precise grid alignment',
    primaryColor: '#000000',
    accentColor: '#262626',
    backgroundColor: '#f4f4f5', // zinc-100
    canvasColor: '#ffffff',
    textColor: '#09090b',
    mutedColor: '#71717a',
    borderColor: '#e4e4e7',
    fontFamily: 'sans',
    radius: 'rounded-md',
  },
  {
    id: 'nordic-forest',
    name: 'Nordic Sage',
    description: 'Refined deep pine green with soft moss neutrals and clean airy typography',
    primaryColor: '#065f46', // emerald-800
    accentColor: '#059669', // emerald-600
    backgroundColor: '#ecfdf5',
    canvasColor: '#ffffff',
    textColor: '#064e3b',
    mutedColor: '#6ee7b7',
    borderColor: '#a7f3d0',
    fontFamily: 'sans',
    radius: 'rounded-xl',
  },
  {
    id: 'dark-terminal',
    name: 'Obsidian Night',
    description: 'Deep space charcoal background with luminous cyan and violet highlights',
    primaryColor: '#6366f1',
    accentColor: '#38bdf8',
    backgroundColor: '#090d16',
    canvasColor: '#131b2e',
    textColor: '#f8fafc',
    mutedColor: '#94a3b8',
    borderColor: '#1e293b',
    fontFamily: 'sans',
    radius: 'rounded-xl',
  },
];

export const PRESET_IMAGES = [
  {
    id: 'tech-workspace',
    name: 'Modern Workspace',
    category: 'Architecture & Tech',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e1b4b"/><stop offset="50%" stop-color="%23312e81"/><stop offset="100%" stop-color="%234338ca"/></linearGradient><linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%236366f1" stop-opacity="0.3"/><stop offset="100%" stop-color="%2338bdf8" stop-opacity="0.5"/></linearGradient></defs><rect width="800" height="450" fill="url(%23g1)"/><circle cx="680" cy="90" r="140" fill="url(%23g2)"/><rect x="120" y="160" width="560" height="200" rx="12" fill="%23ffffff" fill-opacity="0.07" stroke="%23ffffff" stroke-opacity="0.15"/><circle cx="160" cy="195" r="6" fill="%23ef4444"/><circle cx="180" cy="195" r="6" fill="%23f59e0b"/><circle cx="200" cy="195" r="6" fill="%2310b981"/><rect x="160" y="230" width="240" height="14" rx="4" fill="%23ffffff" fill-opacity="0.8"/><rect x="160" y="260" width="400" height="10" rx="3" fill="%23ffffff" fill-opacity="0.3"/><rect x="160" y="280" width="340" height="10" rx="3" fill="%23ffffff" fill-opacity="0.3"/><rect x="160" y="300" width="220" height="10" rx="3" fill="%23ffffff" fill-opacity="0.3"/><text x="400" y="90" fill="%23ffffff" font-family="system-ui" font-size="22" font-weight="700" text-anchor="middle" letter-spacing="1">NEXT-GEN BUILD PIPELINE</text></svg>`,
  },
  {
    id: 'product-showcase',
    name: 'Minimalist Still Life',
    category: 'Product & Design',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23f8fafc"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient><linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%23334155"/></linearGradient></defs><rect width="800" height="500" fill="url(%23bg)"/><ellipse cx="400" cy="380" rx="220" ry="24" fill="%23cbd5e1" opacity="0.6"/><rect x="300" y="140" width="200" height="230" rx="16" fill="url(%23acc)"/><rect x="330" y="170" width="140" height="80" rx="8" fill="%23ffffff" opacity="0.15"/><circle cx="400" cy="310" r="24" fill="%236366f1"/><text x="400" y="440" fill="%23475569" font-family="system-ui" font-size="14" font-weight="600" text-anchor="middle" letter-spacing="2">CRAFTED FOR PEAK PERFORMANCE</text></svg>`,
  },
  {
    id: 'editorial-book',
    name: 'Editorial Journal',
    category: 'Editorial & Reading',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231c1917"/><rect x="80" y="60" width="640" height="380" rx="6" fill="%23292524" stroke="%2344403c"/><line x1="400" y1="80" x2="400" y2="420" stroke="%2357534e" stroke-width="2" stroke-dasharray="6 4"/><rect x="140" y="120" width="180" height="14" fill="%23d6d3d1"/><rect x="140" y="150" width="200" height="8" fill="%2378716c"/><rect x="140" y="170" width="190" height="8" fill="%2378716c"/><rect x="140" y="190" width="160" height="8" fill="%2378716c"/><rect x="460" y="120" width="190" height="160" rx="4" fill="%2344403c"/><text x="400" y="470" fill="%23a8a29e" font-family="serif" font-size="13" font-style="italic" text-anchor="middle">Edition No. 42 — The Architecture of Focus</text></svg>`,
  },
  {
    id: 'growth-chart',
    name: 'Metric Analytics',
    category: 'Data & Growth',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%2310b981" stop-opacity="0.3"/><stop offset="100%" stop-color="%2310b981" stop-opacity="0"/></linearGradient></defs><rect width="800" height="450" fill="%23064e3b"/><path d="M 100 320 Q 250 310 350 220 T 550 180 T 700 80 L 700 380 L 100 380 Z" fill="url(%23grad)"/><path d="M 100 320 Q 250 310 350 220 T 550 180 T 700 80" fill="none" stroke="%2334d399" stroke-width="4"/><circle cx="700" cy="80" r="7" fill="%236ee7b7" stroke="%23ffffff" stroke-width="2"/><text x="680" y="60" fill="%23a7f3d0" font-family="monospace" font-size="18" font-weight="700">+284% ARR</text><text x="400" y="420" fill="%236ee7b7" font-family="system-ui" font-size="13" text-anchor="middle">Annual Retention & Customer Acquisition Velocity</text></svg>`,
  }
];

export const STARTER_TEMPLATES: EmailTemplate[] = [
  {
    id: 'product-launch',
    name: 'Product Launch & Feature Drop',
    subject: 'Introducing MailCraft 2.0: Build High-Converting Emails in Minutes',
    preheader: 'A complete redesign with live responsive preview, curated styles, and analytics.',
    themeId: 'modern-indigo',
    updatedAt: '2026-10-24T18:00:00Z',
    sections: [
      {
        id: 'sec-header-1',
        type: 'header',
        data: {
          brandName: 'MailCraft Studio',
          tagline: 'Marketing & Editorial Digest',
          issueDate: 'October 2026 · Issue #84',
          category: 'Product Update',
          showBrowserLink: true,
          align: 'split',
          logoType: 'text',
        },
      },
      {
        id: 'sec-hero-1',
        type: 'hero',
        data: {
          kicker: 'MAJOR PLATFORM RELEASE',
          title: 'The Email Builder Designed for Conversion & Speed',
          subtitle: 'We stripped away the clutter and rebuilt our template composer from the ground up. Experience pixel-perfect typography, fluid device testing, and zero bloat.',
          hasCta: true,
          ctaText: 'Explore MailCraft 2.0',
          ctaUrl: 'https://mailcraft.example.com/whats-new',
          bgTint: 'subtle',
          align: 'center',
        },
      },
      {
        id: 'sec-img-1',
        type: 'image',
        data: {
          imageUrl: PRESET_IMAGES[0].svgDataUri,
          alt: 'Modern workspace email composer',
          caption: 'Figure 1: Real-time visual canvas with zero layout jitter.',
          rounded: 'lg',
          aspectRatio: '16:9',
          presetStyle: 'tech',
        },
      },
      {
        id: 'sec-text-1',
        type: 'text',
        data: {
          headline: 'Engineered for Marketing Teams That Move Fast',
          content: 'Building emails in standard HTML is notoriously tricky with Outlook tables and archaic mobile clients. MailCraft compiles modern responsive components into bulletproof HTML that looks sharp in every inbox without compromise.\n\nWhether you are sending a weekly newsletter to 50,000 subscribers or announcing a funding round, your message deserves clean lines and high readability.',
          fontStyle: 'sans',
          align: 'left',
          isCallout: false,
        },
      },
      {
        id: 'sec-columns-1',
        type: 'columns',
        data: {
          headline: 'Key Highlights in this Release',
          columnCount: 2,
          items: [
            {
              id: 'col-1',
              title: 'Live Responsive Switcher',
              description: 'Toggle instantly between desktop viewport (640px) and handheld device frame (375px) with accurate touch proportions.',
              tag: 'Real-time',
              linkText: 'Learn more →',
              linkUrl: '#',
            },
            {
              id: 'col-2',
              title: 'Integrated Analytics Suite',
              description: 'Track open rates, click distributions, and subscriber cohort growth alongside your campaign drafts.',
              tag: 'Dashboard',
              linkText: 'View metrics →',
              linkUrl: '#',
            },
          ],
        },
      },
      {
        id: 'sec-quote-1',
        type: 'quote',
        data: {
          quote: 'Our team cut email drafting time from 4 hours to under 30 minutes. The layout fidelity on mobile is unmatched in any builder we have tested.',
          author: 'Elena Vance',
          role: 'Head of Growth',
          company: 'Aura Cloud Technologies',
          avatarInitials: 'EV',
        },
      },
      {
        id: 'sec-btn-1',
        type: 'button',
        data: {
          text: 'Get Started for Free',
          url: 'https://mailcraft.example.com/signup',
          variant: 'primary',
          size: 'lg',
          shape: 'rounded',
          align: 'center',
          secondaryText: 'No credit card required · Instant export',
        },
      },
      {
        id: 'sec-divider-1',
        type: 'divider',
        data: {
          style: 'solid',
          spacing: 'md',
        },
      },
      {
        id: 'sec-footer-1',
        type: 'footer',
        data: {
          companyName: 'MailCraft Inc.',
          address: '548 Market St, Suite 39201, San Francisco, CA 94104',
          unsubscribeNotice: 'You received this newsletter because you subscribed to product updates on mailcraft.io.',
          copyrightYear: '2026',
          socials: {
            twitter: 'https://x.com',
            linkedin: 'https://linkedin.com',
            github: 'https://github.com',
            website: 'https://mailcraft.example.com',
          },
        },
      },
    ],
  },
  {
    id: 'editorial-letter',
    name: 'The Sunday Longform Editorial',
    subject: 'Reflections on Craft, Simplicity, and Digital Noise',
    preheader: 'Issue #142: Why deliberate writing beats algorithmic feeds every time.',
    themeId: 'editorial-serif',
    updatedAt: '2026-10-23T12:00:00Z',
    sections: [
      {
        id: 'sec-ed-hdr',
        type: 'header',
        data: {
          brandName: 'THE INTENTIONAL CRAFT',
          tagline: 'Essays on Design & Modern Focus',
          issueDate: 'October 25, 2026 · Vol. XII',
          category: 'Longform Essay',
          showBrowserLink: true,
          align: 'center',
          logoType: 'text',
        },
      },
      {
        id: 'sec-ed-hero',
        type: 'hero',
        data: {
          kicker: 'LETTER FROM THE EDITOR',
          title: 'The Return to the Personal Newsletter',
          subtitle: 'In an era where social media algorithms throttle long-form thinking, the inbox remains one of the last sanctuaries for thoughtful human communication.',
          hasCta: false,
          bgTint: 'none',
          align: 'center',
        },
      },
      {
        id: 'sec-ed-img',
        type: 'image',
        data: {
          imageUrl: PRESET_IMAGES[2].svgDataUri,
          alt: 'Quiet library study',
          caption: 'Photographed in Stockholm, Autumn 2026. A space designed solely for reading.',
          rounded: 'none',
          aspectRatio: '16:9',
          presetStyle: 'editorial',
        },
      },
      {
        id: 'sec-ed-body',
        type: 'text',
        data: {
          headline: '1. The Sanctuary of the Direct Dispatch',
          content: 'When you hit send on an email, it travels directly from your mind to an individual subscriber without algorithmic gatekeeping. No trending audio, no rage-bait recommendations, no arbitrary down-ranking.\n\nThis intimacy demands higher respect for the reader’s attention. Every paragraph must justify its presence. If an idea can be stated in three sentences rather than five, the editor’s duty is to trim without hesitation.',
          fontStyle: 'serif',
          align: 'left',
          isCallout: false,
        },
      },
      {
        id: 'sec-ed-callout',
        type: 'text',
        data: {
          headline: 'Curator’s Note',
          content: '“Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.” — Antoine de Saint-Exupéry',
          fontStyle: 'serif',
          align: 'left',
          isCallout: true,
        },
      },
      {
        id: 'sec-ed-btn',
        type: 'button',
        data: {
          text: 'Read the Complete Essay Online',
          url: 'https://mailcraft.example.com/essay-142',
          variant: 'primary',
          size: 'md',
          shape: 'square',
          align: 'center',
        },
      },
      {
        id: 'sec-ed-ftr',
        type: 'footer',
        data: {
          companyName: 'The Intentional Craft Press',
          address: 'Götgatan 48, 118 26 Stockholm, Sweden',
          unsubscribeNotice: 'Delivered each Sunday morning. You may unsubscribe or update your preferences at any time.',
          copyrightYear: '2026',
          socials: {
            website: 'https://example.com',
            twitter: 'https://x.com',
          },
        },
      },
    ],
  },
  {
    id: 'weekly-digest',
    name: 'Weekly Tech & Innovation Digest',
    subject: 'Week in Review: Quantum Chips, Autonomous Grids, and Next-Gen Dev Tools',
    preheader: 'Top 5 breakthroughs curated by our research fellows this week.',
    themeId: 'nordic-forest',
    updatedAt: '2026-10-22T09:00:00Z',
    sections: [
      {
        id: 'sec-dg-hdr',
        type: 'header',
        data: {
          brandName: 'FRONTIER DISPATCH',
          tagline: 'Deep Tech & Applied Science',
          issueDate: 'Week 43, 2026',
          category: 'Curated Brief',
          showBrowserLink: true,
          align: 'split',
          logoType: 'text',
        },
      },
      {
        id: 'sec-dg-hero',
        type: 'hero',
        data: {
          kicker: 'WEEKLY BRIEFING',
          title: 'Breakthroughs in Clean Compute & Distributed Systems',
          subtitle: 'A 5-minute distillation of papers, commercial launches, and open-source releases you cannot afford to miss.',
          hasCta: false,
          bgTint: 'subtle',
          align: 'left',
        },
      },
      {
        id: 'sec-dg-img',
        type: 'image',
        data: {
          imageUrl: PRESET_IMAGES[3].svgDataUri,
          alt: 'Clean tech energy graph',
          caption: 'Telemetry analysis: Grid stabilization models achieved 99.98% efficiency.',
          rounded: 'lg',
          aspectRatio: '16:9',
          presetStyle: 'tech',
        },
      },
      {
        id: 'sec-dg-cols',
        type: 'columns',
        data: {
          headline: 'Top Stories of the Week',
          columnCount: 2,
          items: [
            {
              id: 'dg-col-1',
              title: 'Sub-Kelvin Cryo-Logic',
              description: 'Researchers demonstrate a 10x reduction in cooling power for optical quantum bus interconnects.',
              tag: 'Hardware',
              linkText: 'Read Paper →',
              linkUrl: '#',
            },
            {
              id: 'dg-col-2',
              title: 'Next-Gen WASM Runtimes',
              description: 'Cold-start latencies plummet to 80 microseconds in new edge container orchestrators.',
              tag: 'Systems',
              linkText: 'Benchmark data →',
              linkUrl: '#',
            },
          ],
        },
      },
      {
        id: 'sec-dg-btn',
        type: 'button',
        data: {
          text: 'Browse Archive & Discussion',
          url: 'https://mailcraft.example.com/archive',
          variant: 'primary',
          size: 'md',
          shape: 'pill',
          align: 'center',
        },
      },
      {
        id: 'sec-dg-ftr',
        type: 'footer',
        data: {
          companyName: 'Frontier Dispatch Labs',
          address: 'One Kendall Square, Cambridge, MA 02139',
          unsubscribeNotice: 'You are receiving this because you subscribed to Frontier Dispatch research summaries.',
          copyrightYear: '2026',
          socials: {
            github: 'https://github.com',
            website: 'https://example.com',
          },
        },
      },
    ],
  },
];
