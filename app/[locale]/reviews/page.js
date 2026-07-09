import { createClient } from "@/lib/supabase/server";
import { fallbackText } from "@/lib/utils";
import ReviewCard from "@/components/public/ReviewCard";

export default async function ReviewsPage({ params }) {
  const { locale } = await params;
  const supabase = await createClient();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true });

  const count = reviews?.length || 0;
  const heading = fallbackText("รีวิวจากลูกค้า", "Customer Reviews", locale);
  const subtitle = fallbackText("ทั้งหมด", "Total") + ` ${count} ` + fallbackText("รายการ", "reviews");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{heading}</h1>
      <p className="text-gray-500 mb-8">{subtitle}</p>

      {count > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-20">
          {fallbackText("ยังไม่มีรีวิว", "No reviews yet", locale)}
        </p>
      )}
    </div>
  );
}
