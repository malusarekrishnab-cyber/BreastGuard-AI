import { motion } from "framer-motion";
import { Cpu, Layers, GitBranch, ListChecks, Target, Activity, ShieldCheck } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import StatusBadge from "@/components/StatusBadge";
import Disclaimer from "@/components/Disclaimer";
import { useHealth } from "@/hooks/useBackend";

const cards = [
  { icon: Cpu, title: "Model", value: "Artificial Neural Network", accent: "text-cyan-300" },
  { icon: Layers, title: "Framework", value: "TensorFlow / Keras", accent: "text-violet-300" },
  { icon: GitBranch, title: "Classification", value: "Binary", accent: "text-cyan-300" },
  { icon: ListChecks, title: "Input Features", value: "30", accent: "text-violet-300" },
];

export default function Dashboard() {
  const health = useHealth();
  const ok = health.isSuccess && health.data?.status === "ok";
  const loading = health.isLoading;
  const d = health.data || {};

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <ShieldCheck className="w-5 h-5 text-cyan-300" />
          <span className="text-xs uppercase tracking-widest text-cyan-300/80">Dashboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
          BreastGuard AI
        </h1>
        <p className="text-slate-400 mt-1.5">ANN-Powered Breast Cancer Prediction</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="glass-card glass-card-hover p-5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 border border-white/10 flex items-center justify-center mb-4">
              <c.icon className={`w-5 h-5 ${c.accent}`} />
            </div>
            <p className="text-xs text-slate-400">{c.title}</p>
            <p className="text-base font-semibold text-slate-100 mt-1">{c.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Test Accuracy</p>
            <h3 className="text-lg font-semibold text-slate-100">Reported Training Result</h3>
          </div>
        </div>
        <p className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
          <AnimatedCounter value={100} suffix="%" />
        </p>
        <p className="text-xs text-slate-500 mt-3">
          Reported test-set accuracy from the provided training run.
        </p>
      </motion.div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-cyan-300" />
          <h2 className="text-sm font-semibold text-slate-200">Model Status</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <StatusBadge label="Model Loaded" ok={!!d.model_loaded} loading={loading} />
          <StatusBadge label="Scaler Loaded" ok={!!d.scaler_loaded} loading={loading} />
          <StatusBadge
            label="Features Loaded"
            ok={!!d.features_loaded}
            loading={loading}
          />
          <StatusBadge label="API Connected" ok={ok} loading={loading} />
        </div>
        {health.isError && (
          <p className="text-xs text-rose-300 mt-3">
            Prediction service is currently unavailable. Please make sure the FastAPI backend is running.
          </p>
        )}
      </div>

      <Disclaimer text="BreastGuard AI is an educational Deep Learning demo. It is not a medical diagnostic tool and should not be used to make healthcare decisions." />
    </div>
  );
}