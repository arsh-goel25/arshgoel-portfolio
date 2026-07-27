import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MousePointerClick, Download, TrendingUp, Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";

type ResumeEvent = {
  id: string;
  event_type: "click" | "download";
  source: string | null;
  created_at: string;
};

export const Route = createFileRoute("/stats")({
  component: StatsPage,
  head: () => ({
    meta: [
      { title: "Resume Analytics — Arsh Goel" },
      {
        name: "description",
        content:
          "Live dashboard tracking resume button clicks and successful downloads across Arsh Goel's portfolio.",
      },
      { property: "og:title", content: "Resume Analytics — Arsh Goel" },
      {
        property: "og:description",
        content: "Live event dashboard: clicks, downloads, conversion, and 14-day trends.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Resume Analytics — Arsh Goel" },
      {
        name: "twitter:description",
        content: "Live event dashboard for resume clicks and downloads.",
      },
    ],
  }),
});

function StatsPage() {
  const [events, setEvents] = useState<ResumeEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("resume_events")
        .select("id,event_type,source,created_at")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (cancelled) return;
      if (error) setError(error.message);
      else setEvents((data ?? []) as ResumeEvent[]);
    })();

    const channel = supabase
      .channel("resume_events_live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "resume_events" },
        (payload) => {
          setEvents((prev) => [payload.new as ResumeEvent, ...(prev ?? [])].slice(0, 1000));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = useMemo(() => {
    const list = events ?? [];
    const clicks = list.filter((e) => e.event_type === "click").length;
    const downloads = list.filter((e) => e.event_type === "download").length;
    const conversion = clicks ? Math.round((downloads / clicks) * 100) : 0;
    const now = Date.now();
    const dayMs = 86_400_000;
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now - (13 - i) * dayMs);
      d.setHours(0, 0, 0, 0);
      return d;
    });
    const chart = days.map((d) => {
      const next = d.getTime() + dayMs;
      const dayEvents = list.filter((e) => {
        const t = new Date(e.created_at).getTime();
        return t >= d.getTime() && t < next;
      });
      return {
        date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        clicks: dayEvents.filter((e) => e.event_type === "click").length,
        downloads: dayEvents.filter((e) => e.event_type === "download").length,
      };
    });
    return { clicks, downloads, conversion, chart, total: list.length };
  }, [events]);

  return (
    <div className="noise relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-[10%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.19 245 / 0.5), transparent 60%)" }}
        />
        <div
          className="absolute right-[5%] top-[20%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.24 305 / 0.45), transparent 60%)" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-gradient">
          <Activity className="h-4 w-4" /> Live analytics
        </div>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1] tracking-[-0.03em] md:text-7xl">
          Resume <span className="text-gradient">events</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Every click on a resume button and every successful PDF download is captured here in real
          time. Updates stream in without a refresh.
        </p>

        {error && (
          <div className="glass mt-8 rounded-2xl p-4 text-sm text-red-300">
            Couldn't load analytics: {error}
          </div>
        )}

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Button clicks"
            value={stats.clicks}
            icon={MousePointerClick}
            loading={events === null}
          />
          <StatCard
            label="Successful downloads"
            value={stats.downloads}
            icon={Download}
            loading={events === null}
          />
          <StatCard
            label="Click → download"
            value={stats.conversion}
            suffix="%"
            icon={TrendingUp}
            loading={events === null}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mt-8 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Last 14 days
              </div>
              <div className="mt-1 text-lg font-medium">Daily activity</div>
            </div>
            <Legend />
          </div>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.19 245)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.72 0.19 245)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.24 305)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.68 0.24 305)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="oklch(1 0 0 / 0.4)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(1 0 0 / 0.4)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.15 0.02 260 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "oklch(1 0 0 / 0.7)" }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="oklch(0.72 0.19 245)"
                  strokeWidth={2}
                  fill="url(#gClicks)"
                />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="oklch(0.68 0.24 305)"
                  strokeWidth={2}
                  fill="url(#gDownloads)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Recent events
            </div>
            <ul className="mt-4 divide-y divide-white/5">
              {(events ?? []).slice(0, 12).map((e) => (
                <li key={e.id} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        e.event_type === "download"
                          ? "bg-[oklch(0.68_0.24_305/0.15)] text-[oklch(0.78_0.2_305)]"
                          : "bg-[oklch(0.72_0.19_245/0.15)] text-[oklch(0.82_0.15_245)]"
                      }`}
                    >
                      {e.event_type === "download" ? (
                        <Download className="h-3 w-3" />
                      ) : (
                        <MousePointerClick className="h-3 w-3" />
                      )}
                    </span>
                    <span className="capitalize">{e.event_type}</span>
                    {e.source && (
                      <span className="text-xs text-muted-foreground">· {e.source}</span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {timeAgo(e.created_at)}
                  </span>
                </li>
              ))}
              {events !== null && events.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">
                  No events yet — click the Resume button on the homepage to see it appear here.
                </li>
              )}
            </ul>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Sources
            </div>
            <ul className="mt-4 space-y-3">
              {sourceBreakdown(events ?? []).map((row) => (
                <li key={row.source}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize">{row.source}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {row.count} · {row.pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${row.pct}%`,
                        background: "var(--gradient-primary)",
                      }}
                    />
                  </div>
                </li>
              ))}
              {(events ?? []).length === 0 && (
                <li className="text-sm text-muted-foreground">Waiting for first event…</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  loading,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-4 font-display text-5xl font-semibold tracking-tight">
        {loading ? <span className="text-muted-foreground/40">—</span> : value}
        {!loading && suffix && (
          <span className="ml-1 text-2xl text-muted-foreground">{suffix}</span>
        )}
      </div>
    </motion.div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.72 0.19 245)" }} />
        Clicks
      </span>
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: "oklch(0.68 0.24 305)" }} />
        Downloads
      </span>
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function sourceBreakdown(events: ResumeEvent[]) {
  const counts = new Map<string, number>();
  events.forEach((e) => {
    const k = e.source || "unknown";
    counts.set(k, (counts.get(k) ?? 0) + 1);
  });
  const total = events.length || 1;
  return Array.from(counts.entries())
    .map(([source, count]) => ({
      source,
      count,
      pct: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
