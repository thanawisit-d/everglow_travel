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

  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data: tours } = await supabase
      .from('tours')
      .select('id, updated_at')
      .eq('status', 'active');

    if (tours) {
      tours.forEach((tour) => {
        locales.forEach((locale) => {
          entries.push({
            url: `${siteUrl}/${locale}/tours/${tour.id}`,
            lastModified: tour.updated_at ? new Date(tour.updated_at) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        });
      });
    }
  } catch {
    // sitemap works without tour URLs if DB is unavailable
  }

  return entries;
}
