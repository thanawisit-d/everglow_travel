import { createClient } from "@/lib/supabase/server";
import DomesticClient from "./DomesticClient";

export default async function DomesticPage({ params, searchParams }) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page, 10) || 1;
  const limit = 9;
  const supabase = await createClient();

  const [{ data: provincesData }, { data: toursData, count }] = await Promise.all([
    supabase
      .from("tours")
      .select("province")
      .eq("type", "domestic")
      .eq("status", "active")
      .not("province", "is", null),
    supabase
      .from("tours")
      .select("*", { count: "exact", head: false })
      .eq("type", "domestic")
      .eq("status", "active")
      .order("sort_order", { ascending: true })
      .range((page - 1) * limit, page * limit - 1),
  ]);

  const provinces = [...new Set((provincesData || []).map((p) => p.province).filter(Boolean))];
  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <DomesticClient
      initialTours={toursData || []}
      totalCount={count || 0}
      totalPages={totalPages}
      provinces={provinces}
      locale={locale}
    />
  );
}
