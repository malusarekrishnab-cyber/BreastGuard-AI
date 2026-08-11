import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function AppLayout() {
  return (
    <div className="min-h-screen app-bg text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#060912]/70 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 h-16">
            <div className="flex items-center gap-2.5 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight">BreastGuard AI</p>
                <p className="text-[10px] text-slate-400">ANN-Powered Prediction</p>
              </div>
            </div>

            <div className="hidden lg:block text-xs text-slate-400">
              ANN-Powered Breast Cancer Prediction
            </div>

            <div className="flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 text-[11px] text-amber-200/90">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-medium">Educational AI prediction — not a medical diagnosis</span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-28 lg:pb-12">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}