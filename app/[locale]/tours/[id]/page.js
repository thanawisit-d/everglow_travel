import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fallbackText, formatPrice, buildImageUrl, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const supabase = await createClient();
  const { data: tour } = await supabase.from("tours").select("*").eq("id", id).maybeSingle();

  if (!tour) return { title: "Not Found" };

  const title = fallbackText(tour.title_th, tour.title_en, locale);
  const description = fallbackText(tour.description_th, tour.description_en, locale);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: tour.image ? [buildImageUrl(tour.image)] : [],
    },
  };
}

export default async function TourDetailPage({ params }) {
  const { locale, id } = await params;
  const supabase = await createClient();
  const { data: tour } = await supabase.from("tours").select("*").eq("id", id).maybeSingle();

  if (!tour) notFound();

  const t = (th, en) => fallbackText(th, en, locale);
  const title = fallbackText(tour.title_th, tour.title_en, locale);
  const description = fallbackText(tour.description_th, tour.description_en, locale);

  let transport = [];
  if (tour.transport_info) {
    try {
      transport = typeof tour.transport_info === "string"
        ? JSON.parse(tour.transport_info)
        : tour.transport_info;
    } catch {
      transport = [];
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: description,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {tour.image && (
        <div className="w-full h-96 bg-gray-100 relative">
          <img
            src={buildImageUrl(tour.image)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href={`/${locale}/domestic`}
          className="text-sm text-emerald-600 hover:text-emerald-700 mb-4 inline-block"
        >
          &larr; {t("กลับไปหน้ารายการทัวร์", "Back to tours")}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {tour.badge && (
            <Badge variant={tour.badge === "hot" ? "danger" : "warning"}>
              {locale === "th"
                ? tour.badge === "hot" ? "มาแรง" : "ประจำเดือน"
                : tour.badge === "hot" ? "Hot" : "Monthly"}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
          {tour.price && (
            <div>
              <span className="font-semibold text-gray-900">{t("ราคา", "Price")}:</span>{" "}
              <span className="text-xl font-bold text-emerald-700">{formatPrice(tour.price)}</span>
            </div>
          )}
          {tour.duration && (
            <div>
              <span className="font-semibold text-gray-900">{t("ระยะเวลา", "Duration")}:</span>{" "}
              {tour.duration} {t("วัน", "days")}
            </div>
          )}
          {tour.country && (
            <div>
              <span className="font-semibold text-gray-900">{t("ประเทศ", "Country")}:</span>{" "}
              {tour.country}
            </div>
          )}
          {tour.province && (
            <div>
              <span className="font-semibold text-gray-900">{t("จังหวัด", "Province")}:</span>{" "}
              {tour.province}
            </div>
          )}
          {tour.status && (
            <div>
              <span className="font-semibold text-gray-900">{t("สถานะ", "Status")}:</span>{" "}
              <Badge variant={tour.status === "active" ? "success" : "info"}>
                {tour.status === "active"
                  ? t("เปิดให้บริการ", "Active")
                  : t("ปิดให้บริการ", "Inactive")}
              </Badge>
            </div>
          )}
        </div>

        {description && (
          <div className="prose prose-gray max-w-none mb-8">
            <p>{description}</p>
          </div>
        )}

        {transport.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t("ข้อมูลการเดินทาง", "Transport Information")}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {transport.map((item, i) => (
                <li key={i}>{typeof item === "string" ? item : item.label || JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>
        )}

        {tour.created_at && (
          <p className="text-xs text-gray-400 mt-8">
            {t("เผยแพร่เมื่อ", "Published")}: {formatDate(tour.created_at)}
          </p>
        )}
      </div>
    </>
  );
}
