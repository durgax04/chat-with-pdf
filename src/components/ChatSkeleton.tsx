export const SkeletonLoader = () => {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-8 flex justify-between items-center gap-2 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-white/20 rounded"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-3 w-16 bg-white/20 rounded"></div>
        <div className="h-3 w-16 bg-white/20 rounded"></div>
        <div className="h-3 w-12 bg-white/20 rounded"></div>
      </div>
    </div>
  );
};
export const ChatSkeleton = () => (
  <div className="flex flex-col gap-4 px-6 py-4">
    {/* assistant bubble 1 */}
    <div className="flex justify-start">
      <div className="max-w-[70%] space-y-2">
        <div className="h-3 w-40 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-64 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-52 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* user bubble */}
    <div className="flex justify-end">
      <div className="max-w-[50%] space-y-2">
        <div className="h-3 w-32 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* assistant bubble 2 */}
    <div className="flex justify-start">
      <div className="max-w-[65%] space-y-2">
        <div className="h-3 w-56 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-44 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>
    {/* assistant bubble 1 */}
    <div className="flex justify-start">
      <div className="max-w-[70%] space-y-2">
        <div className="h-3 w-40 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-64 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-52 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* user bubble */}
    <div className="flex justify-end">
      <div className="max-w-[50%] space-y-2">
        <div className="h-3 w-32 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* assistant bubble 2 */}
    <div className="flex justify-start">
      <div className="max-w-[65%] space-y-2">
        <div className="h-3 w-56 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-44 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>
    {/* assistant bubble 1 */}
    <div className="flex justify-start">
      <div className="max-w-[70%] space-y-2">
        <div className="h-3 w-40 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-64 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-52 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* user bubble */}
    <div className="flex justify-end">
      <div className="max-w-[50%] space-y-2">
        <div className="h-3 w-32 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* assistant bubble 2 */}
    <div className="flex justify-start">
      <div className="max-w-[65%] space-y-2">
        <div className="h-3 w-56 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-44 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>
    {/* assistant bubble 1 */}
    <div className="flex justify-start">
      <div className="max-w-[70%] space-y-2">
        <div className="h-3 w-40 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-64 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-52 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* user bubble */}
    <div className="flex justify-end">
      <div className="max-w-[50%] space-y-2">
        <div className="h-3 w-32 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>

    {/* assistant bubble 2 */}
    <div className="flex justify-start">
      <div className="max-w-[65%] space-y-2">
        <div className="h-3 w-56 bg-slate-200 rounded-full animate-pulse" />
        <div className="h-3 w-44 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);
