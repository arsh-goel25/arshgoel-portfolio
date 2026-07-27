import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover'], input, textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[999] -ml-1 -mt-1 hidden md:block"
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: hover ? 44 : 8,
            height: hover ? 44 : 8,
            background: hover
              ? "transparent"
              : "linear-gradient(135deg, oklch(0.72 0.19 245), oklch(0.68 0.24 305))",
            border: hover ? "1px solid oklch(0.72 0.19 245 / 0.6)" : "none",
            transform: `translate(-50%, -50%)`,
            boxShadow: hover ? "0 0 30px oklch(0.72 0.19 245 / 0.4)" : "none",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[998] hidden md:block"
      >
        <div
          className="h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, oklch(0.72 0.19 245 / 0.35), transparent 60%)",
          }}
        />
      </motion.div>
    </>
  );
}
