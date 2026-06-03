export type PublishStatus = "draft" | "published";
export type MessageStatus = "unread" | "read" | "archived";
export type UserRole = "admin" | "editor";
export type UserStatus = "active" | "disabled";

export type Article = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  category: string;
  publishedAt: string;
  readTime?: string;
  status: PublishStatus;
};

export type NewsItem = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  publishedAt: string;
  status: PublishStatus;
};

export type Service = {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  icon?: string;
  order?: number;
  status?: PublishStatus;
};

export type SiteStat = {
  label: string;
  value: string;
  icon?: string;
  order?: number;
};

export type TrustFeature = {
  title: string;
  excerpt: string;
  icon?: string;
  order?: number;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  consultationTitle: string;
  consultationText: string;
};

export type ContactCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type HomeContentData = {
  hero: HeroContent;
  trustFeatures: TrustFeature[];
  stats: SiteStat[];
  contactCta: ContactCtaContent;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  logoText: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    telegram?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
};

export type PageContentData = {
  key: string;
  title: string;
  subtitle?: string;
  content?: string;
  metadata?: Record<string, unknown>;
};

export type MessageData = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
};

export type UserData = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
};

export type MessagePreview = {
  name: string;
  email: string;
  subject: string;
  status: string;
  date: string;
};

export type AdminContentRow = {
  title: string;
  category: string;
  date: string;
  status: string;
};
