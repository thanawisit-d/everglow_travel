import { createClient } from "@/lib/supabase/server";
import { fallbackText, buildImageUrl } from "@/lib/utils";
import Hero from "@/components/public/Hero";
import TourCard from "@/components/public/TourCard";
import ReviewCard from "@/components/public/ReviewCard";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const supabase = await createClient();

  const [{ data: hotTours }, { data: monthlyTours }, { data: reviews }, { data: gallery }] =
    await Promise.all([
      supabase
        .from("tours")
        .select("*")
        .eq("badge", "hot")
        .eq("status", "active")
        .order("sort_order", { ascending: true })
        .limit(4),
      supabase
        .from("tours")
        .select("*")
        .eq("badge", "monthly")
        .eq("status", "active")
        .order("sort_order", { ascending: true })
        .limit(4),
      supabase
        .from("reviews")
        .select("*")
        .order("sort_order", { ascending: true })
        .limit(6),
      supabase
        .from("gallery")
        .select("*")
        .order("sort_order", { ascending: true })
        .limit(6),
    ]);

  const t = (th, en) => fallbackText(th, en, locale);

  const SectionHeading = ({ th, en }) => (
    <h2 className="text-3xl font-bold text-gray-900 mb-8">{t(th, en)}</h2>
  );

  const TourSection = ({ heading, tours }) => (
    <section className="container mx-auto px-4 py-12">
      <SectionHeading th={heading.th} en={heading.en} />
      {tours && tours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          {t("กำลังเตรียมพร้อม...", "Coming soon...")}
        </p>
      )}
    </section>
  );

  return (
    <>
      <Hero locale={locale} />

      <TourSection
        heading={{ th: "ทัวร์ยอดนิยม", en: "Popular Tours" }}
        tours={hotTours}
      />

      <TourSection
        heading={{ th: "ทัวร์ประจำเดือน", en: "Monthly Tours" }}
        tours={monthlyTours}
      />

      <section className="container mx-auto px-4 py-12">
        <SectionHeading th="รีวิวจากลูกค้า" en="Customer Reviews" />
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            {t("กำลังเตรียมพร้อม...", "Coming soon...")}
          </p>
        )}
      </section>

      {gallery && gallery.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <SectionHeading th="แกลเลอรี่" en="Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={buildImageUrl(item.image)}
                  alt={fallbackText(item.caption_th, item.caption_en, locale)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
