const SkeletonCard = () => (
  <div className="bg-white/5 rounded-xl overflow-hidden">
    <div className="w-full aspect-[2/3] shimmer" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 bg-white/10 rounded shimmer" />
      <div className="h-3 w-1/2 bg-white/10 rounded shimmer" />
    </div>
  </div>
);

export default SkeletonCard;