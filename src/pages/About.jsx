import { motion } from "framer-motion";
import { Info, ArrowDown, Database, Sliders, Network, Activity, SplitSquareHorizontal, Globe } from "lucide-react";
import SectionCard from "@/components/SectionCard";
import Disclaimer from "@/components/Disclaimer";

const pipeline = [
  { icon: Database, label: "Dataset", desc: "Breast Cancer Wisconsin Diagnostic" },
  { icon: Sliders, label: "Preprocessing", desc: "Feature extraction & cleaning" },
  { icon: SplitSquareHorizontal, label: "StandardScaler", desc: "Mean / variance normalization" },
  { icon: Network, label: "ANN", desc: "TensorFlow / Keras network" },
  { icon: Activity, label: "Sigmoid Probability", desc: "Continuous 0–1 output" },
  { icon: SplitSquareHorizontal, label: "Binary Classification", desc: "Threshold at 0.5" },
  { icon: Globe, label: "Web Prediction", desc: "FastAPI + React interface" },
];

export default function About() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="flex items-center gap-2.5 mb-2">
          <Info className="w-5 h-5 text-cyan-300" />
          <span className="text-xs uppercase tracking-widest text-cyan-300/80">About</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">About BreastGuard AI</h1>
      </motion.div>

      <SectionCard icon={Info} title="Overview" subtitle="What this project demonstrates">
        <p className="text-sm leading-relaxed text-slate-300">
          BreastGuard AI is an educational Deep Learning application that demonstrates how an
          Artificial Neural Network can perform binary classification using numerical diagnostic
          features. It uses a trained TensorFlow/Keras ANN model together with a StandardScaler to
          produce a sigmoid probability, which is converted into a Benign / Malignant prediction.
        </p>
      </SectionCard>

      <SectionCard icon={Activity} title="Prediction Pipeline" subtitle="From data to prediction">
        <div className="flex flex-col gap-2">
          {pipeline.map((p, i) => (
            <div key={p.label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/15 to-violet-500/15 border border-white/10 flex items-center justify-center shrink-0">
                  <p.icon className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">{p.label}</p>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </div>
              </motion.div>
              {i < pipeline.length - 1 && <ArrowDown className="w-4 h-4 text-cyan-400/60 my-0.5" />}
            </div>
          ))}
        </div>
      </SectionCard>

      <Disclaimer text="This application is intended for educational and demonstration purposes only. It is not a medical diagnostic tool and should not be used to make healthcare decisions." />
    </div>
  );
}