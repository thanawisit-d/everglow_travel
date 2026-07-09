export default function DomesticLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-9 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 space-y-6">
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
