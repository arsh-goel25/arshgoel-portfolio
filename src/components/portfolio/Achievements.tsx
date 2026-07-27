import { achievements } from "@/data/portfolio";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

export function Achievements() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-16">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div
          className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.24 305 / 0.6), transparent 70%)" }}
        />
        <div className="grid gap-10 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.1}>
              <div>
                <div className="font-display text-6xl font-semibold tracking-tight text-gradient md:text-8xl">
                  <Counter to={a.value} suffix={a.suffix} decimals={a.decimals ?? 0} />
                </div>
                <div className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
                  {a.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
