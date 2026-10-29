export type SectionType = 
  | 'header'
  | 'hero'
  | 'text'
  | 'image'
  | 'button'
  | 'columns'
  | 'quote'
  | 'divider'
  | 'footer';

export interface HeaderSectionData {
  brandName: string;
  tagline?: string;
  issueDate?: string;
  category?: string;
  showBrowserLink?: boolean;
  align: 'left' | 'center' | 'split';
  logoType: 'text' | 'icon';
  iconName?: string;
}

export interface HeroSectionData {
  kicker?: string;
  title: string;
  subtitle: string;
  hasCta?: boolean;
  ctaText?: string;
  ctaUrl?: string;
  bgTint: 'none' | 'subtle' | 'accent' | 'dark';
  align: 'left' | 'center';
}

export interface TextSectionData {
  headline?: string;
  content: string;
  fontStyle: 'sans' | 'serif';
  align: 'left' | 'center' | 'justify';
  isCallout?: boolean;
}

export interface ImageSectionData {
  imageUrl: string;
  alt: string;
  caption?: string;
  linkUrl?: string;
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  aspectRatio: '16:9' | '4:3' | '1:1' | 'auto';
  presetStyle?: 'tech' | 'product' | 'editorial' | 'minimal' | 'gradient';
}

export interface ButtonSectionData {
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline' | 'minimal';
  size: 'sm' | 'md' | 'lg';
  shape: 'rounded' | 'pill' | 'square';
  align: 'left' | 'center' | 'right';
  secondaryText?: string;
}

export interface ColumnItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ColumnsSectionData {
  headline?: string;
  columnCount: 2 | 3;
  items: ColumnItem[];
}

export interface QuoteSectionData {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarInitials?: string;
}

export interface DividerSectionData {
  style: 'solid' | 'dashed' | 'dots' | 'spacer';
  spacing: 'sm' | 'md' | 'lg';
}

export interface FooterSectionData {
  companyName: string;
  address: string;
  unsubscribeNotice: string;
  copyrightYear: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export type Section =
  | { id: string; type: 'header'; data: HeaderSectionData }
  | { id: string; type: 'hero'; data: HeroSectionData }
  | { id: string; type: 'text'; data: TextSectionData }
  | { id: string; type: 'image'; data: ImageSectionData }
  | { id: string; type: 'button'; data: ButtonSectionData }
  | { id: string; type: 'columns'; data: ColumnsSectionData }
  | { id: string; type: 'quote'; data: QuoteSectionData }
  | { id: string; type: 'divider'; data: DividerSectionData }
  | { id: string; type: 'footer'; data: FooterSectionData };

export interface ThemeStyle {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string; // Outer wrapper bg
  canvasColor: string;     // Inner email card bg
  textColor: string;
  mutedColor: string;
  borderColor: string;
  fontFamily: 'sans' | 'serif';
  radius: 'rounded-none' | 'rounded-md' | 'rounded-xl' | 'rounded-2xl';
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader: string;
  themeId: string;
  sections: Section[];
  updatedAt: string;
}

export interface CampaignRecord {
  id: string;
  title: string;
  subject: string;
  sentDate: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  recipients: number;
  openRate: number;
  clickRate: number;
  unsubscribes: number;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  name: string;
  status: 'Active' | 'Pending' | 'Bounced' | 'Unsubscribed';
  joinedDate: string;
  openCount: number;
  location: string;
}

export interface SubscriberMetrics {
  totalSubscribers: number;
  growthMonthPercent: number;
  averageOpenRate: number;
  openRateChange: number;
  averageClickRate: number;
  clickRateChange: number;
  unsubscribeRate: number;
  activeCampaignsCount: number;
}
