import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "GPT-5.3-Codex (xhigh)",
    shortName: "GPT-5.3 (xh)",
    accuracy: 77.3,
    provider: "openai",
  },
  {
    name: "GPT-5.4",
    shortName: "GPT-5.4",
    accuracy: 75.1,
    provider: "openai",
  },
  {
    name: "Gemini 3.1 Pro",
    shortName: "Gemini 3.1",
    accuracy: 68.5,
    provider: "google",
  },
  {
    name: "Opus 4.6",
    shortName: "Opus 4.6",
    accuracy: 65.4,
    provider: "anthropic",
  },
  {
    name: "GPT-5.2-Codex (xhigh, Anth.)",
    shortName: "GPT-5.2 (A)",
    accuracy: 64.7,
    provider: "anthropic_ref",
  },
  {
    name: "GPT-5.2-Codex (xhigh, OAI)",
    shortName: "GPT-5.2 (O)",
    accuracy: 64.0,
    provider: "openai",
  },
  {
    name: "GPT-5.2 (xhigh)",
    shortName: "GPT-5.2",
    accuracy: 62.2,
    provider: "openai",
  },
  {
    name: "Opus 4.5",
    shortName: "Opus 4.5",
    accuracy: 59.8,
    provider: "anthropic",
  },
  {
    name: "Gemini 3 Pro",
    shortName: "Gemini 3",
    accuracy: 56.2,
    provider: "google",
  },
  {
    name: "Sonnet 4.5",
    shortName: "Sonnet 4.5",
    accuracy: 51.0,
    provider: "anthropic",
  },
];

const colors: Record<string, string> = {
  openai: "#10b981",
  anthropic: "#f97316",
  anthropic_ref: "#f97316",
  google: "#3b82f6",
};

const darkModeColors: Record<string, string> = {
  openai: "#047857",
  anthropic: "#c2410c",
  anthropic_ref: "#c2410c",
  google: "#1d4ed8",
};

const providerLabels: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
};

interface ThemeColors {
  axisStroke: string;
  gridStroke: string;
}

const lightTheme: ThemeColors = {
  gridStroke: "#eee",
  axisStroke: "#ddd",
};

const darkTheme: ThemeColors = {
  gridStroke: "#333",
  axisStroke: "#444",
};

interface TooltipPayload {
  payload: {
    name: string;
    shortName: string;
    accuracy: number;
    provider: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

interface CustomTooltipWithThemeProps extends CustomTooltipProps {
  barColors: Record<string, string>;
  isDark: boolean;
}

const CustomTooltip = ({
  active,
  payload,
  isDark,
  barColors,
}: CustomTooltipWithThemeProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const prov = d.provider === "anthropic_ref" ? "anthropic" : d.provider;
    return (
      <div
        className={`max-w-50 rounded-lg border p-3 font-sans text-[13px] shadow-lg ${
          isDark
            ? "border-dark-border bg-dark-bg text-dark-text"
            : "border-border bg-white text-ink"
        }`}
      >
        <div className="mb-1 font-bold">{d.name}</div>
        <div className="font-semibold" style={{ color: barColors[d.provider] }}>
          {d.accuracy}%
        </div>
        <div
          className={`mt-0.5 text-[11px] ${isDark ? "text-dark-muted" : "text-muted"}`}
        >
          {providerLabels[prov]}
        </div>
        {d.provider === "anthropic_ref" && (
          <div
            className={`mt-1 text-[10px] italic ${isDark ? "text-dark-muted" : "text-muted"}`}
          >
            Score as reported by Anthropic
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function TerminalBenchChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hiddenProviders, setHiddenProviders] = useState<Set<string>>(
    new Set(),
  );

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const barColors = useMemo(() => (isDark ? darkModeColors : colors), [isDark]);

  const toggleProvider = (key: string) => {
    setHiddenProviders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const visibleData = useMemo(
    () =>
      data.filter((d) => {
        const prov = d.provider === "anthropic_ref" ? "anthropic" : d.provider;
        return !hiddenProviders.has(prov);
      }),
    [hiddenProviders],
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const chartHeight = isMobile ? 360 : 520;
  const chartMargin = isMobile
    ? { top: 0, right: 8, left: 0, bottom: 40 }
    : { top: 0, right: 0, left: 30, bottom: 70 };

  return (
    <div
      className={`flex items-center justify-center font-sans ${isMobile ? "p-0" : "p-6"}`}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <div
        className={`w-full max-w-230 border shadow-md ${
          isMobile
            ? "rounded-xl px-2.5 py-5 pb-4"
            : "rounded-2xl px-8 py-9 pb-7"
        } ${isDark ? "border-dark-border bg-dark-surface" : "border-border bg-white"}`}
      >
        {/* Header */}
        <div className={`text-center ${isMobile ? "mb-4" : "mb-7"}`}>
          <div
            className={`font-mono uppercase tracking-widest ${
              isMobile
                ? "mb-1 text-[9px] tracking-[2px]"
                : "mb-2 text-[11px] tracking-[3px]"
            } ${isDark ? "text-dark-muted" : "text-muted"}`}
          >
            Benchmark Comparison
          </div>
          <h1
            className={`m-0 font-bold tracking-tight ${
              isMobile ? "text-xl" : "text-[28px]"
            } ${isDark ? "text-dark-text" : "text-ink"}`}
          >
            Agentic Coding
          </h1>
          <div
            className={`font-mono ${isMobile ? "mt-1 text-[11px]" : "mt-1.5 text-[13px]"} ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            Terminal-Bench 2.0
          </div>
        </div>

        {/* Legend */}
        <div
          className={`flex flex-wrap justify-center ${isMobile ? "mb-3 gap-3" : "mb-6 gap-6"}`}
        >
          {[
            {
              label: "Anthropic",
              key: "anthropic",
              color: barColors.anthropic,
            },
            { label: "OpenAI", key: "openai", color: barColors.openai },
            { label: "Google", key: "google", color: barColors.google },
          ].map(({ label, key, color }) => {
            const isHidden = hiddenProviders.has(key);
            return (
              <button
                className={`flex cursor-pointer select-none items-center border-none bg-transparent p-0 ${isMobile ? "gap-1" : "gap-2"}`}
                key={key}
                onClick={() => toggleProvider(key)}
                style={{
                  opacity: isHidden ? 0.4 : 1,
                  transition: "opacity 0.2s ease",
                }}
                type="button"
              >
                <div
                  className={`rounded-sm ${isMobile ? "h-2.5 w-2.5" : "h-3 w-3"}`}
                  style={{
                    background: isHidden ? "transparent" : color,
                    border: `2px solid ${color}`,
                    transition: "background 0.2s ease",
                  }}
                />
                <span
                  className={`font-medium ${isMobile ? "text-[10px]" : "text-xs"} ${
                    isDark ? "text-dark-text" : "text-ink/80"
                  } ${isHidden ? "line-through" : ""}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chart */}
        <ResponsiveContainer height={chartHeight} width="100%">
          <BarChart
            barCategoryGap={isMobile ? "12%" : "18%"}
            data={visibleData}
            margin={chartMargin}
            onMouseLeave={() => setHoveredIdx(null)}
            onMouseMove={(state) => {
              if (
                state?.activeTooltipIndex !== undefined &&
                typeof state.activeTooltipIndex === "number"
              ) {
                setHoveredIdx(state.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid
              stroke={theme.gridStroke}
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              angle={isMobile ? -50 : -35}
              axisLine={{ stroke: theme.axisStroke }}
              dataKey={isMobile ? "shortName" : "name"}
              interval={0}
              textAnchor="end"
              tick={{
                fill: isDark ? "#d1d5db" : "#555",
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'DM Sans', sans-serif",
                textAnchor: "end",
              }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              domain={[0, 100]}
              tick={{
                fill: isDark ? "#9ca3af" : "#999",
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              width={isMobile ? 28 : 48}
            />
            <Tooltip
              content={<CustomTooltip barColors={barColors} isDark={isDark} />}
              cursor={false}
            />
            <ReferenceLine
              stroke="#d4714e"
              strokeDasharray="4 4"
              strokeOpacity={0.25}
              y={65.4}
            />
            <Bar
              dataKey="accuracy"
              maxBarSize={isMobile ? 32 : 64}
              radius={[3, 3, 0, 0]}
              shape={(props: any) => {
                const index = Number(props.index);
                const provider = props.payload?.provider;
                return (
                  <Rectangle
                    {...props}
                    fill={barColors[provider] ?? "#8884d8"}
                    opacity={
                      hoveredIdx !== null && hoveredIdx !== index ? 0.35 : 1
                    }
                    style={{ transition: "opacity 0.2s ease" }}
                  />
                );
              }}
            >
              <LabelList
                dataKey="accuracy"
                formatter={(v) => `${v}%`}
                position="top"
                style={{
                  fill: isDark ? "#e8e4de" : "#1a1a1a",
                  fontSize: isMobile ? 7 : 12,
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Footer note */}
        <div
          className={`rounded-lg border ${isMobile ? "mt-3 p-2.5" : "mt-4 p-4"} ${
            isDark ? "border-dark-border bg-dark-bg" : "border-border bg-cream"
          }`}
        >
          <p
            className={`m-0 font-mono leading-relaxed ${
              isMobile ? "text-[9px]" : "text-[11px]"
            } ${isDark ? "text-dark-muted" : "text-muted"}`}
          >
            <span
              className={`font-semibold ${isDark ? "text-dark-text" : "text-ink"}`}
            >
              Note:
            </span>{" "}
            All OpenAI models shown at
            <span className={isDark ? "text-dark-text" : "text-ink/80"}>
              {" "}
              xhigh
            </span>{" "}
            compute setting. GPT-5.2-Codex appears twice —
            <span className={isDark ? "text-dark-text" : "text-ink/80"}>
              {" "}
              64.7%
            </span>{" "}
            as reported by Anthropic,
            <span className={isDark ? "text-dark-text" : "text-ink/80"}>
              {" "}
              64.0%
            </span>{" "}
            as reported by OpenAI. Harnesses differ: Anthropic &amp; Google used
            the{" "}
            <span className={isDark ? "text-dark-text" : "text-ink/80"}>
              Terminus-2
            </span>{" "}
            harness; OpenAI used{" "}
            <span className={isDark ? "text-dark-text" : "text-ink/80"}>
              Codex
            </span>
            . Scores are not directly comparable across providers.
          </p>
        </div>
      </div>
    </div>
  );
}
