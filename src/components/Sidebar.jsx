import { NavLink } from "react-router-dom";
import { LayoutDashboard, Activity, Network, Info, ShieldCheck, BarChart3, Sparkles } from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/prediction", label: "Prediction", icon: Activity },
  { to: "/model", label: "Model", icon: Network },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/about", label: "About", icon: Info },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/25 to-violet-500/25 border border-cyan-400/30 flex items-center justify-center glow-cyan">
          <ShieldCheck className="w-5 h-5 text-cyan-300" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">BreastGuard AI</p>
          <p className="text-[11px] text-slate-400">ANN-Powered Prediction</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-gradient-to-r from-cyan-400/15 to-violet-500/10 text-cyan-200 border border-cyan-400/30"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-5 border-t border-white/10">
        <p className="text-[10px] leading-relaxed text-slate-500">
          Educational Deep Learning project. Not a medical diagnostic tool.
        </p>
      </div>
    </aside>
  );
}