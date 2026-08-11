import { ShieldAlert } from "lucide-react";

export default function Disclaimer({ text }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs text-amber-200/90">
      <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-300" />
      <p>
        {text ||
          "This result is for educational/research purposes and is not a medical diagnosis."}
      </p>
    </div>
  );
}