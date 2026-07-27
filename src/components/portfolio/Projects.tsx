import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeader
        kicker="03 — Selected Work"
        title="Case studies, not screenshots."
        subtitle="A closer look at two production-grade builds — the problem, the architecture, and the trade-offs."
      />

      <div className="mt-20 space-y-32">
        {projects.map((p, idx) => (
          <ProjectCase key={p.slug} project={p} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCase({
  project: p,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="group relative aspect-[16/11] overflow-hidden rounded-3xl border border-white/10"
        >
          {/* Mockup canvas */}
          <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-30`} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent, oklch(0.1 0 0 / 0.85))" }} />
          <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                {p.slug}.app
              </span>
            </div>
            <div className="grid gap-3">
              <div className="h-2 w-1/3 rounded-full bg-white/20" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((k) => (
                  <div key={k} className="aspect-video rounded-lg bg-white/[0.04]">
                    <div
                      className="h-full w-full rounded-lg opacity-60"
                      style={{
                        background:
                          k === 1
                            ? "linear-gradient(135deg, oklch(0.72 0.19 245 / 0.4), oklch(0.68 0.24 305 / 0.3))"
                            : "linear-gradient(180deg, oklch(1 0 0 / 0.05), transparent)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 h-24 rounded-lg bg-white/[0.03]" />
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--x,50%) var(--y,50%), oklch(0.72 0.19 245 / 0.2), transparent 40%)",
            }}
          />
        </motion.div>
      </Reveal>

      <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>0{index + 1}</span>
            <span className="h-px w-8 bg-white/20" />
            <span>{p.year}</span>
          </div>
          <h3 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            {p.name}
          </h3>
          <p className="mt-2 text-lg text-muted-foreground">{p.subtitle}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 space-y-6 text-sm leading-relaxed">
            <Block label="Overview" body={p.overview} />
            <Block label="Problem" body={p.problem} />
            <Block label="Solution" body={p.solution} />
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Features
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-foreground/85">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gradient-to-r from-[oklch(0.72_0.19_245)] to-[oklch(0.68_0.24_305)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Block label="Challenges" body={p.challenges} />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={p.live}
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Live Demo <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={p.github}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
      <p className="mt-2 text-foreground/85">{body}</p>
    </div>
  );
}
