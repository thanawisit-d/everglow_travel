export default function AboutLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/3 mb-8" />
      <div className="h-72 bg-gray-200 rounded-xl mb-10" />
      <div className="space-y-4 mb-12">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
