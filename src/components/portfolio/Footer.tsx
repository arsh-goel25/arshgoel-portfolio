import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-7">
            <div
              className="absolute inset-0 rounded-md"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="absolute inset-[2px] flex items-center justify-center rounded-[4px] bg-background font-display text-xs font-bold">
              A
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Crafted with care.
          </span>
        </div>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
