const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

const locales = ['th', 'en'];

const staticPages = [
  '', '/domestic', '/outbound', '/reviews', '/about', '/contact',
];

export default async function sitemap() {
  const entries = [];

  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  return entries;
}
