export default function LocaleLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-64 bg-gradient-to-br from-emerald-700 to-teal-500 rounded-xl animate-pulse mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
