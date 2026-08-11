import { useState } from "react";
import { motion } from "framer-motion";
import { User, Sparkles, Copy, Check } from "lucide-react";

export default function ChatMessage({ msg }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const copy = () => {
    navigator.clipboard?.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-cyan-400/15 border border-cyan-400/30"
            : "bg-violet-500/15 border border-violet-400/30"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-cyan-300" />
        ) : (
          <Sparkles className="w-4 h-4 text-violet-300" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-cyan-400/10 border border-cyan-400/20"
            : "bg-white/[0.04] border border-white/10"
        } ${msg.error ? "border-rose-400/30 bg-rose-400/5" : ""}`}
      >
        <p className="text-sm text-slate-200 whitespace-pre-wrap break-words">{msg.content}</p>
        {!isUser && !msg.error && (
          <button
            onClick={copy}
            className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}