import { NavLink } from "react-router-dom";
import { LayoutDashboard, Activity, Network, Info, BarChart3, Sparkles } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/prediction", label: "Predict", icon: Activity },
  { to: "/model", label: "Model", icon: Network },
  { to: "/analytics", label: "Stats", icon: BarChart3 },
  { to: "/assistant", label: "AI", icon: Sparkles },
  { to: "/about", label: "About", icon: Info },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-[#060912]/85 backdrop-blur-xl">
      <div className="grid grid-cols-6">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
                isActive ? "text-cyan-300" : "text-slate-500"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}