import poster from "@/assets/hero-machine-poster.jpg";

/**
 * Static visual shown while the 3D scene loads, and as the permanent fallback
 * on devices without WebGL support.
 */
export function MachineFallback({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={poster}
        alt="Intensify Technologies precision industrial cleaning machine"
        className="h-full w-full object-contain object-center"
        loading="eager"
      />
      {loading && (
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
            <span className="h-2 w-2 animate-ping rounded-full bg-yellow" />
            Loading 3D model
          </span>
        </div>
      )}
    </div>
  );
}
