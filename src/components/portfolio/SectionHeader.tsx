import { Reveal } from "./Reveal";

export function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.35em] text-gradient">
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-7xl">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
