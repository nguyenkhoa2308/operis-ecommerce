export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="flex-1">
          <div className="aspect-square skeleton-shimmer rounded-lg" />
        </div>
        <div className="flex-1 space-y-3 md:space-y-4">
          <div className="h-6 md:h-7 w-3/4 skeleton-shimmer rounded" />
          <div className="h-4 w-20 skeleton-shimmer rounded" />
          <div className="h-7 md:h-8 w-1/3 skeleton-shimmer rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full skeleton-shimmer rounded" />
            <div className="h-3 w-5/6 skeleton-shimmer rounded" />
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 md:h-20 skeleton-shimmer rounded-lg"
              />
            ))}
          </div>
          <div className="h-4 w-32 skeleton-shimmer rounded" />
          <div className="space-y-2 pt-2">
            <div className="h-11 w-full md:w-48 skeleton-shimmer rounded-lg" />
            <div className="h-11 w-full md:w-40 skeleton-shimmer rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
