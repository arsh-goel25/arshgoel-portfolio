import { useState } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { ResumeButton } from "./ResumeButton";
import { toast } from "sonner";

export function Contact() {
  const [sending, setSending] = useState(false);
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-[3fr_2fr]">
        <div>
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-gradient">
              06 — Contact
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-6xl font-semibold leading-[1] tracking-[-0.03em] md:text-8xl">
              Let's build <br /> something <span className="text-gradient">amazing</span> together.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Have a role, a project, or an idea in mind? My inbox is always open —
              I'll get back within 24 hours.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
            </Magnetic>
            <ResumeButton variant="ghost" label="Resume" />

          </div>

          <div className="mt-10 flex gap-6">
            {[
              { icon: Github, href: profile.github, label: "GitHub" },
              { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{label}</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                setSending(false);
                toast.success("Message sent — I'll reply within 24h.");
                (e.target as HTMLFormElement).reset();
              }, 900);
            }}
            className="glass space-y-5 rounded-3xl p-8"
          >
            <Field label="Your name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Message" name="message" as="textarea" required />
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01]"
              style={{ background: "var(--gradient-primary)" }}
            >
              {sending ? "Sending…" : "Send message"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  required?: boolean;
}) {
  const Cmp: any = as === "textarea" ? "textarea" : "input";
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <Cmp
        name={name}
        type={type}
        required={required}
        rows={as === "textarea" ? 5 : undefined}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-[oklch(0.72_0.19_245)] focus:bg-white/[0.04]"
      />
    </label>
  );
}
