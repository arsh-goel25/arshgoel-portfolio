import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeader
        kicker="02 — Toolkit"
        title="The tools I reach for."
        subtitle="A living stack — chosen for reliability, ergonomics, and the surface area they give a small team."
      />

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, list], i) => (
          <Reveal key={category} delay={i * 0.05}>
            <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-60"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {category}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {list.map((s) => (
                  <motion.span
                    key={s}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/90 backdrop-blur-sm"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
