export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="h-8 w-48 skeleton-shimmer rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-border/50 overflow-hidden"
          >
            <div className="aspect-square skeleton-shimmer" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 skeleton-shimmer rounded" />
              <div className="h-4 w-1/3 skeleton-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
