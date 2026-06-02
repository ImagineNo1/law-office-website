export type PublishStatus = "draft" | "published";
export type MessageStatus = "unread" | "read" | "archived";

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  status: PublishStatus;
};

export type NewsItem = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  status: PublishStatus;
};

export type Service = {
  title: string;
  excerpt: string;
};

export type SiteStat = {
  label: string;
  value: string;
};

export type AdminContentRow = {
  title: string;
  category: string;
  date: string;
  status: string;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    telegram?: string;
  };
  seo: {
    title?: string;
    description?: string;
  };
};
