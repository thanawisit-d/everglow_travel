'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import StatsCard from '@/components/admin/StatsCard';
import { MapPin, Star, FileText, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, reviews: 0, articles: 0, messages: 0 });
  const [recentTours, setRecentTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from('tours').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('reviews').select('id', { count: 'exact', head: true }),
      supabase.from('articles').select('id', { count: 'exact', head: true }).eq('published', true),
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('tours').select('id, title_th, title_en, created_at').order('created_at', { ascending: false }).limit(5),
    ]).then(([tours, reviews, articles, messages, recent]) => {
      setStats({
        tours: tours.count ?? 0,
        reviews: reviews.count ?? 0,
        articles: articles.count ?? 0,
        messages: messages.count ?? 0,
      });
      setRecentTours(recent.data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">แดชบอร์ด</h2>
        <p className="text-sm text-gray-500">Dashboard</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Active Tours" value={stats.tours} icon={MapPin} />
        <StatsCard label="Reviews" value={stats.reviews} icon={Star} />
        <StatsCard label="Published Articles" value={stats.articles} icon={FileText} />
        <StatsCard label="Contact Messages" value={stats.messages} icon={MessageSquare} />
      </div>
      {recentTours.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Tours</h3>
          <ul className="divide-y divide-gray-200">
            {recentTours.map((tour) => (
              <li key={tour.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-900">{tour.title_th || tour.title_en}</span>
                <span className="text-xs text-gray-500">
                  {new Date(tour.created_at).toLocaleDateString('th-TH')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
