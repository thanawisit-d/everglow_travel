import Link from 'next/link';

export default function Hero({ locale }) {
  const t = (th, en) => locale === 'th' ? th : en;

  return (
    <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t('ค้นพบโลกใบใหม่กับ Everglow Travel', 'Discover a New World with Everglow Travel')}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-8">
            {t(
              'ทัวร์คุณภาพดี ในราคาที่ทุกคนเข้าถึงได้ พร้อมบริการที่ใส่ใจทุกรายละเอียด',
              'Quality tours at accessible prices with attentive service in every detail'
            )}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/domestic`}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
            >
              {t('ทัวร์ในประเทศ', 'Domestic Tours')}
            </Link>
            <Link
              href={`/${locale}/outbound`}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition-colors"
            >
              {t('ทัวร์ต่างประเทศ', 'Outbound Tours')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
