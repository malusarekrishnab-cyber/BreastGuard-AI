import { motion } from "framer-motion";
import { Network, ArrowDown, CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import Disclaimer from "@/components/Disclaimer";
import { useHealth } from "@/hooks/useBackend";

const specs = [
  { label: "Model", value: "Artificial Neural Network (ANN)" },
  { label: "Framework", value: "TensorFlow / Keras" },
  { label: "Input", value: "30 numerical features" },
  { label: "Output", value: "Binary classification" },
  { label: "Activation", value: "ReLU hidden layers · Sigmoid output" },
  { label: "Loss", value: "Binary Crossentropy" },
  { label: "Optimizer", value: "Adam" },
  { label: "Preprocessing", value: "StandardScaler" },
  { label: "Regularization", value: "Dropout" },
  { label: "Training Controls", value: "Batch Norm · Early Stopping · Reduce LR" },
  { label: "Reported Test Accuracy", value: "100%" },
];

const layers = [
  "Input Layer (30 features)",
  "Dense 64 + ReLU",
  "Batch Normalization",
  "Dropout 25%",
  "Dense 32 + ReLU",
  "Batch Normalization",
  "Dropout 20%",
  "Dense 16 + ReLU",
  "Dense 1 + Sigmoid",
];

export default function ModelInfo() {
  const health = useHealth();
  const d = health.data || {};
  const loading = health.isLoading;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="flex items-center gap-2.5 mb-2">
          <Network className="w-5 h-5 text-cyan-300" />
          <span className="text-xs uppercase tracking-widest text-cyan-300/80">Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">Model Information</h1>
        <p className="text-slate-400 mt-1.5">Architecture and training configuration of the ANN.</p>
      </motion.div>

      <SectionCard icon={Network} title="Specifications" subtitle="Training configuration">
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {specs.map((s) => (
            <div key={s.label} className="flex flex-col py-1.5 border-b border-white/5">
              <dt className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</dt>
              <dd className="text-sm text-slate-100">{s.value}</dd>
            </div>
          ))}
        </dl>
      </SectionCard>

      <SectionCard icon={Network} title="Network Architecture" subtitle="Layer-by-layer flow">
        <div className="flex flex-col gap-2">
          {layers.map((l, i) => (
            <div key={l} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-200 text-center"
              >
                {l}
              </motion.div>
              {i < layers.length - 1 && <ArrowDown className="w-4 h-4 text-cyan-400/60 my-0.5" />}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon={CheckCircle2} title="Model Status" subtitle="Live backend health">
        <div className="grid sm:grid-cols-2 gap-3">
          <StatusBadge label="Model Loaded" ok={!!d.model_loaded} loading={loading} />
          <StatusBadge label="Scaler Loaded" ok={!!d.scaler_loaded} loading={loading} />
          <StatusBadge
            label="Features Loaded"
            ok={!!d.features_loaded}
            loading={loading}
          />
          <StatusBadge
            label="API Connected"
            ok={health.isSuccess && d.status === "ok"}
            loading={loading}
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-3">
          Architecture shown reflects the supplied trained model. If details conflict with the loaded
          .keras file, inspect the actual model summary on the backend.
        </p>
      </SectionCard>

      <Disclaimer text="This application is intended for educational and demonstration purposes only. It is not a medical diagnostic tool and should not be used to make healthcare decisions." />
    </div>
  );
}