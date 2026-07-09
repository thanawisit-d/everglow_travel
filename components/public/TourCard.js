import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatPrice, buildImageUrl, fallbackText } from '@/lib/utils';

export default function TourCard({ tour, locale }) {
  return (
    <Card className="overflow-hidden p-0 hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
        {tour.image && (
          <img
            src={buildImageUrl(tour.image)}
            alt={fallbackText(tour.title_th, tour.title_en, locale)}
            className="w-full h-full object-cover"
          />
        )}
        {tour.badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={tour.badge === 'hot' ? 'danger' : 'warning'}>
              {locale === 'th'
                ? tour.badge === 'hot' ? 'มาแรง' : 'ประจำเดือน'
                : tour.badge === 'hot' ? 'Hot' : 'Monthly'}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {fallbackText(tour.title_th, tour.title_en, locale)}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {tour.duration && `${tour.duration} ${locale === 'th' ? 'วัน' : 'days'}`}
          {tour.country && ` \u00B7 ${tour.country}`}
          {tour.province && ` \u00B7 ${tour.province}`}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-emerald-700">
            {formatPrice(tour.price)}
          </span>
          <Link
            href={`/${locale}/tours/${tour.id}`}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'} &rarr;
          </Link>
        </div>
      </div>
    </Card>
  );
}
