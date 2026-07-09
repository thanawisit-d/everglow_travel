import Card from '@/components/ui/Card';
import { fallbackText, formatDate } from '@/lib/utils';

export default function ReviewCard({ review, locale }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">
          {review.name?.charAt(0) || '?'}
        </div>
        <div>
          <p className="font-medium text-gray-900">{review.name}</p>
          <div className="flex">
            {Array.from({ length: Math.min(review.rating || 5, 5) }, (_, i) => (
              <span key={i} className="text-yellow-400 text-sm">&#9733;</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {fallbackText(review.text_th, review.text_en, locale)}
      </p>
      {review.created_at && (
        <p className="text-xs text-gray-400 mt-3">{formatDate(review.created_at)}</p>
      )}
    </Card>
  );
}
