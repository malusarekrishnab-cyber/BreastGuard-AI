import { motion } from "framer-motion";

function Bar({ label, value, gradient }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-slate-100">{value.toFixed(2)}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/5 overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>
    </div>
  );
}

export default function ProbabilityBar({ benign, malignant }) {
  return (
    <div className="space-y-4">
      <Bar label="Benign" value={benign} gradient="from-cyan-400 to-cyan-500" />
      <Bar label="Malignant" value={malignant} gradient="from-violet-400 to-fuchsia-500" />
    </div>
  );
}