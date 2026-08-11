export default function StatusBadge({ ok, loading, label }) {
  const state = loading ? "loading" : ok ? "ok" : "fail";
  const dot =
    state === "ok"
      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
      : state === "fail"
      ? "bg-rose-400"
      : "bg-amber-400 animate-pulse";
  const text = state === "ok" ? "Loaded" : state === "fail" ? "Unavailable" : "Checking…";

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="text-sm text-slate-200">{label}</span>
      <span className="flex items-center gap-2 text-xs">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="text-slate-300">{text}</span>
      </span>
    </div>
  );
}