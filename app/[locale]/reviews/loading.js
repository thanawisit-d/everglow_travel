export default function ReviewsLoading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-3 bg-gray-200 rounded w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
