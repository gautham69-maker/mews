export default function MapPlaceholder() {
  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden border border-white/70 bg-gradient-to-br from-sky-100 via-indigo-100 to-emerald-100">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-5 opacity-40">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="border border-white/60" />
        ))}
      </div>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute left-6 right-6 top-10 h-2 rounded-full bg-white/70 rotate-[4deg]" />
        <div className="absolute left-10 right-10 bottom-10 h-2 rounded-full bg-white/70 -rotate-[8deg]" />
        <div className="absolute top-4 bottom-4 left-1/2 w-2 -translate-x-1/2 rounded-full bg-white/70 rotate-[2deg]" />
      </div>
      <div className="absolute left-4 top-3 text-slate-700 font-medium">Map placeholder</div>
    </div>
  )
}
