const items = [
  "React", "Node.js", "TypeScript", "MongoDB", "WebRTC", "Socket.IO",
  "Express", "Tailwind", "JWT", "Clerk", "REST APIs", "MERN",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-6">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-display text-3xl font-semibold tracking-tight text-muted-foreground/60 md:text-5xl"
          >
            {t} <span className="text-gradient">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
