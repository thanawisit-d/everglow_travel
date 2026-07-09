export default function TourDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-96 bg-gray-200" />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="flex items-center gap-3">
          <div className="h-9 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="flex flex-wrap gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-12" />
              <div className="h-5 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
