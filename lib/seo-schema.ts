export function organizationSchema(input: {
  name: string;
  url: string;
  logo?: string;
  phone?: string;
  address?: string;
  socialProfiles?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: input.name,
    url: input.url,
    logo: input.logo || undefined,
    telephone: input.phone || undefined,
    address: input.address || undefined,
    sameAs: input.socialProfiles?.filter(Boolean),
  };
}

export function websiteSchema(input: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input.name,
    url: input.url,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
