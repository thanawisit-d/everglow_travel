'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher({ locale = 'th' }) {
  const pathname = usePathname();
  const otherLocale = locale === 'th' ? 'en' : 'th';
  const pathWithoutLocale = pathname.replace(/^\/(th|en)/, '') || '/';

  return (
    <Link
      href={`/${otherLocale}${pathWithoutLocale}`}
      className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
