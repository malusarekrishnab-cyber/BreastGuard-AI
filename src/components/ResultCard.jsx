import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Activity, Sparkles } from "lucide-react";
import ProbabilityBar from "./ProbabilityBar";

export default function ResultCard({ result }) {
  const isMalignant = result.prediction === 1;
  const malignantPct = result.probability * 100;
  const benignPct = 100 - malignantPct;

  const accent = isMalignant
    ? {
        ring: "border-violet-400/40",
        glow: "shadow-[0_0_40px_-8px_rgba(139,92,246,0.45)]",
        chip: "from-violet-500/20 to-fuchsia-500/10 border-violet-400/40 text-violet-200",
        icon: AlertTriangle,
        iconColor: "text-violet-300",
      }
    : {
        ring: "border-cyan-400/40",
        glow: "shadow-[0_0_40px_-8px_rgba(34,211,238,0.45)]",
        chip: "from-cyan-400/20 to-cyan-500/10 border-cyan-400/40 text-cyan-200",
        icon: CheckCircle2,
        iconColor: "text-cyan-300",
      };

  const Icon = accent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass-card p-6 sm:p-8 border-2 ${accent.ring} ${accent.glow}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.chip} border flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${accent.iconColor}`} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Result</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
            Model prediction: {isMalignant ? "Malignant" : "Benign"}
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">AI Probability</p>
          <p className="text-xl font-semibold text-slate-50">{(result.probability * 100).toFixed(2)}%</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Model</p>
          <p className="text-sm font-medium text-slate-100 pt-1">{result.model || "Artificial Neural Network"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Status</p>
          <p className="text-sm font-medium text-emerald-300 pt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Prediction generated successfully
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-cyan-300" />
          <p className="text-sm font-medium text-slate-200">Model output probability</p>
        </div>
        <ProbabilityBar benign={benignPct} malignant={malignantPct} />
        <p className="text-[11px] text-slate-500 mt-3">
          Model output probability — not an estimate of medical risk.
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Educational interpretation</p>
        <p className="text-sm text-slate-300">
          {isMalignant
            ? "The ANN output is more consistent with malignant characteristics for the provided measurements in this educational model."
            : "The ANN output is more consistent with benign characteristics for the provided measurements in this educational model."}
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-xs text-amber-200/90">
        Educational AI prediction — not a medical diagnosis.
      </div>
    </motion.div>
  );
}