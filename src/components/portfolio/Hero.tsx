import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { Magnetic } from "./Magnetic";
import { ResumeButton } from "./ResumeButton";

const ROLES = ["Full Stack Engineer", "Real-time Systems", "AI-Powered Products", "Product-minded Builder"];


export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-32">

      {/* Floating gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="animate-float-slow absolute -top-32 left-[10%] h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.19 245 / 0.55), transparent 60%)" }}
        />
        <div
          className="animate-float-slower absolute right-[5%] top-[20%] h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.24 305 / 0.5), transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to Internships & Full Stack Roles · {profile.location}
        </motion.div>

        <h1 className="font-display text-[15vw] font-bold leading-[0.9] tracking-[-0.04em] md:text-[10rem]">
          {"ARSH".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
          <span className="inline-block w-[0.2em]" />
          {"GOEL".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-gradient"
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[oklch(0.72_0.19_245)]" />
              <div className="relative h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-gradient"
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Building scalable web applications, real-time communication systems,
              and{" "}
              <span className="text-foreground">AI-powered experiences</span>.
            </p>
          </div>


          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform"
                style={{ background: "var(--gradient-primary)" }}
              >
                Explore Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <ResumeButton variant="ghost" label="Resume" />

            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium hover:bg-white/5"
              >
                Contact
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex items-center gap-6"
        >
          {[
            { icon: Github, href: profile.github, label: "GitHub" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </a>

          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground md:flex"
      >
        <span>Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-full"
            style={{ background: "var(--gradient-primary)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
