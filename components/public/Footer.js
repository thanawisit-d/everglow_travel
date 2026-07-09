import Link from 'next/link';

export default function Footer({ locale }) {
  const t = (th, en) => locale === 'th' ? th : en;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Everglow Travel</h3>
            <p className="text-sm text-gray-400">
              {t('เปิดประสบการณ์การเดินทางที่ไม่เคยสัมผัสที่ไหนมาก่อน', 'Experience travel like never before')}
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t('ลิงก์', 'Links')}
            </h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}`, label: t('หน้าแรก', 'Home') },
                { href: `/${locale}/domestic`, label: t('ทัวร์ในประเทศ', 'Domestic Tours') },
                { href: `/${locale}/outbound`, label: t('ทัวร์ต่างประเทศ', 'Outbound Tours') },
                { href: `/${locale}/about`, label: t('เกี่ยวกับเรา', 'About Us') },
                { href: `/${locale}/contact`, label: t('ติดต่อเรา', 'Contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t('ติดต่อ', 'Contact')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>contact@everglowtravel.com</li>
              <li>+66 2 123 4567</li>
              <li>{t('กรุงเทพฯ, ประเทศไทย', 'Bangkok, Thailand')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Everglow Travel. {t('สงวนลิขสิทธิ์', 'All rights reserved.')}
        </div>
      </div>
    </footer>
  );
}
