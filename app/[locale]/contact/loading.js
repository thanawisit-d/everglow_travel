export default function ContactLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
      <div className="space-y-6">
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="h-32 bg-gray-200 rounded-lg" />
        <div className="h-10 bg-gray-200 rounded-lg w-40" />
      </div>
    </div>
  );
}
