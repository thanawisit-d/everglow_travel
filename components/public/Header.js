import Link from 'next/link';

export default function Header({ locale }) {
  const t = (th, en) => locale === 'th' ? th : en;
  const otherLocale = locale === 'th' ? 'en' : 'th';

  const links = [
    { href: `/${locale}`, label: t('หน้าแรก', 'Home') },
    { href: `/${locale}/domestic`, label: t('ทัวร์ในประเทศ', 'Domestic') },
    { href: `/${locale}/outbound`, label: t('ทัวร์ต่างประเทศ', 'Outbound') },
    { href: `/${locale}/reviews`, label: t('รีวิว', 'Reviews') },
    { href: `/${locale}/about`, label: t('เกี่ยวกับเรา', 'About Us') },
    { href: `/${locale}/contact`, label: t('ติดต่อเรา', 'Contact') },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold text-emerald-700 tracking-tight">
            Everglow Travel
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${otherLocale}`}
              className="ml-2 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
