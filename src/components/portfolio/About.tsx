import { about } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeader kicker="01 — About" title="A story, not a résumé." />

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a final-year Computer Science student who believes great software
            is 20% code, 80% empathy for the person on the other side of the screen.
            I build things end-to-end — from database schema to the last easing curve.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:left-6" />
          <div className="space-y-10">
            {about.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08}>
                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center md:left-2 md:h-9 md:w-9">
                    <span
                      className="absolute inset-0 rounded-full opacity-40 blur-md"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                    <span
                      className="relative h-3 w-3 rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {it.year}
                  </div>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl">{it.title}</h3>
                  <p className="mt-2 max-w-xl text-muted-foreground">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
