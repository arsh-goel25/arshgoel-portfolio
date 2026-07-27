import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div
              className="absolute inset-0 rounded-lg opacity-80 transition-transform duration-500 group-hover:rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.19 245), oklch(0.68 0.24 305))",
              }}
            />
            <div className="absolute inset-[3px] flex items-center justify-center rounded-md bg-background font-display text-sm font-bold">
              A
            </div>
          </div>
          <span className="font-display text-sm tracking-widest text-muted-foreground">
            ARSH.DEV
          </span>
        </a>
        <nav
          className={`glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex ${
            scrolled ? "opacity-100" : "opacity-90"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="glass hidden rounded-full px-5 py-2 text-sm font-medium md:inline-flex"
        >
          Let's talk →
        </a>
      </div>
    </motion.header>
  );
}
