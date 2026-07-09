'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import TourCard from '@/components/public/TourCard';
import Pagination from '@/components/public/Pagination';
import FilterSidebar from '@/components/public/FilterSidebar';

export default function DomesticClient({
  initialTours,
  totalCount,
  totalPages: initialTotalPages,
  provinces,
  locale,
}) {
  const t = (th, en) => locale === 'th' ? th : en;
  const supabase = createClient();
  const limit = 9;

  const [tours, setTours] = useState(initialTours);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [count, setCount] = useState(totalCount);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    locations: [],
    priceMin: null,
    priceMax: null,
    duration: null,
    sort: null,
  });

  const fetchTours = useCallback(async (page, f) => {
    setLoading(true);
    let query = supabase
      .from('tours')
      .select('*', { count: 'exact', head: false })
      .eq('type', 'domestic')
      .eq('status', 'active');

    if (f.locations && f.locations.length > 0) {
      query = query.in('province', f.locations);
    }
    if (f.priceMin != null) {
      query = query.gte('price', f.priceMin);
    }
    if (f.priceMax != null) {
      query = query.lte('price', f.priceMax);
    }
    if (f.duration) {
      if (f.duration === '15+') {
        query = query.gte('duration_numeric', 15);
      } else {
        const [min, max] = f.duration.split('-').map(Number);
        if (min) query = query.gte('duration_numeric', min);
        if (max) query = query.lte('duration_numeric', max);
      }
    }

    if (f.sort === 'price_asc') query = query.order('price', { ascending: true });
    else if (f.sort === 'price_desc') query = query.order('price', { ascending: false });
    else if (f.sort === 'duration_asc') query = query.order('duration_numeric', { ascending: true });
    else if (f.sort === 'duration_desc') query = query.order('duration_numeric', { ascending: false });
    else query = query.order('sort_order', { ascending: true });

    const from = (page - 1) * limit;
    const to = page * limit - 1;
    const { data, count: total, error } = await query.range(from, to);

    if (!error) {
      setTours(data || []);
      setCount(total || 0);
      setTotalPages(Math.ceil((total || 0) / limit));
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchTours(currentPage, filters);
  }, [currentPage, filters, fetchTours]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ locations: [], priceMin: null, priceMax: null, duration: null, sort: null });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {t('ทัวร์ในประเทศ', 'Domestic Tours')}
      </h1>
      <p className="text-gray-500 mb-8">
        {t('พบกับ', 'Found')} {count} {t('รายการ', 'tours')}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            provinces={provinces}
            locale={locale}
          />
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
            </div>
          ) : tours.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} locale={locale} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-gray-500 text-center py-20">
              {t('ไม่พบรายการทัวร์', 'No tours found')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
