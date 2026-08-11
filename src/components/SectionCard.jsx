import { motion } from "framer-motion";

export default function SectionCard({ icon: Icon, title, subtitle, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`glass-card glass-card-hover p-5 ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/15 to-violet-500/15 border border-white/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-cyan-300" />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}