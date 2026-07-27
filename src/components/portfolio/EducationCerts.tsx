import { GraduationCap, Award } from "lucide-react";
import { education, certifications } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function EducationCerts() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeader kicker="04 — Education" title="Foundations." />
          <div className="mt-12 space-y-6">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.1}>
                <div className="glass group relative overflow-hidden rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {e.period}
                      </div>
                      <h3 className="mt-1 font-display text-xl">{e.degree}</h3>
                      <p className="text-muted-foreground">{e.school}</p>
                      <p className="mt-2 text-sm text-foreground/80">{e.detail}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader kicker="05 — Certifications" title="Verified craft." />
          <div className="mt-12 space-y-6">
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Award className="h-5 w-5 text-gradient" style={{ color: "oklch(0.72 0.19 245)" }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {c.year} · {c.audience}
                      </div>
                      <h3 className="mt-1 font-display text-xl">{c.name}</h3>
                      <p className="text-muted-foreground">{c.issuer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-muted-foreground">
              More certifications on the way ✦
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
