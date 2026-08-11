import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RotateCcw, Activity, Loader2, AlertCircle, Ruler, Gauge, TrendingUp, FlaskConical } from "lucide-react";
import { useFeatures } from "@/hooks/useBackend";
import { predict } from "@/lib/api";
import { savePrediction } from "@/lib/firebase";
import { DEFAULT_FEATURES, groupFeatures, FEATURE_PLACEHOLDERS } from "@/lib/features";
import SectionCard from "@/components/SectionCard";
import FeatureField from "@/components/FeatureField";
import ResultCard from "@/components/ResultCard";
import Disclaimer from "@/components/Disclaimer";

export default function Prediction() {
  const featuresQuery = useFeatures();
  const features = featuresQuery.data || DEFAULT_FEATURES;
  const offline = featuresQuery.isError;

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [sampleLoaded, setSampleLoaded] = useState(false);
  const mutation = useMutation({ 
    mutationFn: async (vals) => {
      const result = await predict(vals);
      await savePrediction(result);
      return result;
    } 
  });

  const groups = groupFeatures(features);

  const handleChange = (name, v) => {
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleLoadSample = () => {
    setValues({ ...FEATURE_PLACEHOLDERS });
    setErrors({});
    setSampleLoaded(true);
  };

  const handleReset = () => {
    setValues({});
    setErrors({});
    setSampleLoaded(false);
    mutation.reset();
  };

  const handleAnalyze = () => {
    const errs = {};
    for (const f of features) {
      const v = values[f];
      if (v === undefined || v === "" || v === null) {
        errs[f] = "Required";
        continue;
      }
      const n = Number(v);
      if (!Number.isFinite(n)) errs[f] = "Must be a number";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {};
    for (const f of features) payload[f] = Number(values[f]);
    mutation.mutate(payload);
  };

  const sections = [
    { key: "mean", title: "Mean Features", subtitle: "Average cell nucleus measurements", icon: Ruler, items: groups.mean },
    { key: "se", title: "Standard Error Features", subtitle: "Variability of measurements", icon: Gauge, items: groups.se },
    { key: "worst", title: "Worst Features", subtitle: "Largest / most extreme values", icon: TrendingUp, items: groups.worst },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="flex items-center gap-2.5 mb-2">
          <Activity className="w-5 h-5 text-cyan-300" />
          <span className="text-xs uppercase tracking-widest text-cyan-300/80">Prediction</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
          Breast Cancer Prediction
        </h1>
        <p className="text-slate-400 mt-1.5 max-w-2xl">
          Enter the diagnostic measurements to generate an AI model prediction.
        </p>
      </motion.div>

      {offline && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-400/25 bg-rose-400/5 px-4 py-3 text-sm text-rose-200">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Prediction service is currently unavailable. Please make sure the FastAPI backend is running.
          </p>
        </div>
      )}

      <div className="grid gap-5">
        {sections.map((s) => (
          <SectionCard key={s.key} icon={s.icon} title={s.title} subtitle={s.subtitle}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {s.items.map((name) => (
                <FeatureField
                  key={name}
                  name={name}
                  value={values[name]}
                  onChange={handleChange}
                  error={errors[name]}
                />
              ))}
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <button
          onClick={handleAnalyze}
          disabled={mutation.isPending || offline}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed transition glow-cyan"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Running ANN prediction…
            </>
          ) : (
            <>
              <Activity className="w-4 h-4" /> Analyze with ANN
            </>
          )}
        </button>
        <button
          onClick={handleLoadSample}
          disabled={mutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-cyan-200 border border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 disabled:opacity-50 transition"
        >
          <FlaskConical className="w-4 h-4" /> Load Sample
        </button>
        <button
          onClick={handleReset}
          disabled={mutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-200 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-50 transition"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {sampleLoaded && (
        <p className="text-xs text-amber-300/90">Demo data only — not a real patient.</p>
      )}

      {mutation.isError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-400/25 bg-rose-400/5 px-4 py-3 text-sm text-rose-200">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{mutation.error?.message || "Prediction failed. Please try again."}</p>
        </div>
      )}

      {mutation.isSuccess && <ResultCard result={mutation.data} />}

      <Disclaimer text="This result is for educational/research purposes and is not a medical diagnosis." />
    </div>
  );
}