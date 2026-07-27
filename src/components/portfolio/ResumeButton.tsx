import { useState } from "react";
import { Download, Check, Loader2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/portfolio";
import { toast } from "sonner";
import { Magnetic } from "./Magnetic";
import { trackResumeEvent } from "@/lib/analytics";


type State = "idle" | "loading" | "success";

interface ResumeButtonProps {
  variant?: "primary" | "ghost";
  className?: string;
  label?: string;
}

export function ResumeButton({
  variant = "primary",
  className = "",
  label = "Download Resume",
}: ResumeButtonProps) {
  const [state, setState] = useState<State>("idle");

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    void trackResumeEvent("click", variant);
    setState("loading");


    try {
      const res = await fetch(profile.resume, { method: "GET", cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("text/html")) throw new Error("Resume file not found");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setState("success");
      void trackResumeEvent("download", variant);
      toast.success("Resume downloaded", {
        description: "Thanks for taking a look — feel free to reach out anytime.",
      });
      setTimeout(() => setState("idle"), 2200);

    } catch (err) {
      setState("idle");
      toast.error("Resume unavailable right now", {
        description: "Email me and I'll send the latest PDF within the hour.",
        action: {
          label: "Email",
          onClick: () => {
            window.location.href = `mailto:${profile.email}?subject=Resume%20Request`;
          },
        },
        icon: <Mail className="h-4 w-4" />,
      });
    }
  };

  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-transform disabled:cursor-wait";
  const variantClasses =
    variant === "primary"
      ? "text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-[1.02]"
      : "glass hover:scale-[1.02]";

  return (
    <Magnetic>
      <button
        type="button"
        onClick={handleDownload}
        disabled={state !== "idle"}
        aria-label={label}
        aria-live="polite"
        className={`${baseClasses} ${variantClasses} ${className}`}
        style={
          variant === "primary" ? { background: "var(--gradient-primary)" } : undefined
        }
      >
        {state === "loading" && (
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.9), transparent)",
              animation: "resume-shimmer 1.1s ease-in-out infinite",
            }}
          />
        )}
        <span className="relative flex h-4 w-4 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {state === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              </motion.span>
            )}
            {state === "loading" && (
              <motion.span
                key="loading"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </motion.span>
            )}
            {state === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Check className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="relative">
          {state === "loading"
            ? "Preparing PDF…"
            : state === "success"
            ? "Downloaded"
            : label}
        </span>
        <style>{`@keyframes resume-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
      </button>
    </Magnetic>
  );
}
