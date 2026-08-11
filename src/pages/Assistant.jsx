import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Sparkles, Send, Trash2, Loader2 } from "lucide-react";
import { chat } from "@/lib/api";
import ChatMessage from "@/components/ChatMessage";

const SUGGESTED = [
  "What is ANN?",
  "Explain this project for viva",
  "How does the prediction pipeline work?",
  "Explain the 30 features",
  "Why do we use StandardScaler?",
  "What is overfitting?",
  "Explain the ANN architecture",
  "What does sigmoid do?",
  "Explain confusion matrix",
];

export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const mutation = useMutation({
    mutationFn: (msg) => chat(msg),
    onSuccess: (reply) => setMessages((m) => [...m, { role: "ai", content: reply }]),
    onError: (err) =>
      setMessages((m) => [...m, { role: "ai", content: err.message, error: true }]),
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text) => {
    const msg = (text ?? input).trim();
    if (!msg || mutation.isPending) return;
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setInput("");
    mutation.mutate(msg);
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-8rem)]">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <Sparkles className="w-5 h-5 text-violet-300" />
              <span className="text-xs uppercase tracking-widest text-violet-300/80">AI Assistant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">BreastGuard AI Assistant</h1>
            <p className="text-sm text-slate-400">Powered by Gemini · Educational assistant</p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 hover:bg-white/10 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto glass-card p-4 sm:p-5 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-white/10 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-violet-300" />
            </div>
            <p className="text-slate-200 font-medium">Ask about the ANN, the dataset, or the model</p>
            <p className="text-xs text-slate-500 mt-1 mb-5">Educational assistant — not a doctor.</p>
            <div className="grid sm:grid-cols-2 gap-2 max-w-xl w-full">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-slate-300 hover:border-cyan-400/30 hover:text-slate-100 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <ChatMessage key={i} msg={m} />
        ))}

        {mutation.isPending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-400/30 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-violet-300 animate-spin" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-white/[0.04] border border-white/10">
              <p className="text-sm text-slate-400">Thinking…</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder="Ask about the model, features, or viva prep…"
          className="input-dark flex-1 resize-none max-h-32"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || mutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 disabled:opacity-50 transition glow-cyan"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}