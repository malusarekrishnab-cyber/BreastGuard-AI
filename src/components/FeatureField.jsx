import { Info } from "lucide-react";
import { formatLabel, placeholderFor } from "@/lib/features";

export default function FeatureField({ name, value, onChange, error }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
        {formatLabel(name)}
        <span className="group relative inline-flex">
          <Info className="w-3 h-3 text-slate-500 cursor-help" />
          <span className="tooltip">Diagnostic feature: {name}</span>
        </span>
      </label>
      <input
        type="number"
        step="any"
        inputMode="decimal"
        value={value ?? ""}
        placeholder={placeholderFor(name)}
        onChange={(e) => onChange(name, e.target.value)}
        className={`input-dark w-full ${error ? "border-rose-400/60 focus:border-rose-400" : ""}`}
      />
      {error && <p className="text-rose-400 text-[11px] mt-1">{error}</p>}
    </div>
  );
}