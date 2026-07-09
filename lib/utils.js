export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function fallbackText(th, en, locale) {
  if (locale === 'th') return th || en || '';
  return en || th || '';
}

export function formatDate(dateString, locale = 'th-TH') {
  return new Date(dateString).toLocaleDateString(locale === 'en' ? 'en-US' : 'th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatPrice(price) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
  }).format(price);
}

export function buildImageUrl(publicId) {
  if (!publicId) return '/images/placeholder.jpg';
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return '/images/placeholder.jpg';
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}
