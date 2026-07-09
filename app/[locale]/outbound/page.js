import { createClient } from "@/lib/supabase/server";
import OutboundClient from "./OutboundClient";

export default async function OutboundPage({ params, searchParams }) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page, 10) || 1;
  const limit = 9;
  const supabase = await createClient();

  const [{ data: countriesData }, { data: toursData, count }] = await Promise.all([
    supabase
      .from("tours")
      .select("country")
      .eq("type", "outbound")
      .eq("status", "active")
      .not("country", "is", null),
    supabase
      .from("tours")
      .select("*", { count: "exact", head: false })
      .eq("type", "outbound")
      .eq("status", "active")
      .order("sort_order", { ascending: true })
      .range((page - 1) * limit, page * limit - 1),
  ]);

  const countries = [...new Set((countriesData || []).map((p) => p.country).filter(Boolean))];
  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <OutboundClient
      initialTours={toursData || []}
      totalCount={count || 0}
      totalPages={totalPages}
      countries={countries}
      locale={locale}
    />
  );
}
