"use client";

const SkeletonLoader = () => {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col gap-2 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-white/20 rounded"></div>
        <div className="h-3 w-24 bg-white/20 rounded"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-3 w-16 bg-white/20 rounded"></div>
        <div className="h-3 w-16 bg-white/20 rounded"></div>
        <div className="h-3 w-12 bg-white/20 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
