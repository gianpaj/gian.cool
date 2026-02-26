import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";

const data = [
  {
    name: "Qwen3.5-397B-A17B",
    shortName: "Qwen3.5-397B",
    accuracy: 52.5,
    provider: "alibaba",
  },
  {
    name: "K2.5-1T-A32B",
    shortName: "K2.5-1T",
    accuracy: 50.8,
    provider: "moonshot",
  },
  {
    name: "Qwen3.5-122B-A10B",
    shortName: "Qwen3.5-122B",
    accuracy: 49.4,
    provider: "alibaba",
  },
  {
    name: "Qwen3.5-27B",
    shortName: "Qwen3.5-27B",
    accuracy: 41.6,
    provider: "alibaba",
  },
  {
    name: "Qwen3.5-35B-A3B",
    shortName: "Qwen3.5-35B",
    accuracy: 40.5,
    provider: "alibaba",
  },
  {
    name: "GPT-5-mini (2025-08-07)",
    shortName: "GPT-5-mini",
    accuracy: 31.9,
    provider: "openai",
  },
  {
    name: "Qwen3-Max-Thinking",
    shortName: "Qwen3-Max",
    accuracy: 22.5,
    provider: "alibaba",
  },
  {
    name: "GPT-OSS-120B",
    shortName: "GPT-OSS-120B",
    accuracy: 18.7,
    provider: "openai",
  },
];

const colors: Record<string, string> = {
  openai: "#10b981",
  alibaba: "#06b6d4",
  moonshot: "#8b5cf6",
};

const darkModeColors: Record<string, string> = {
  openai: "#047857",
  alibaba: "#0891b2",
  moonshot: "#6d28d9",
};

const providerLabels: Record<string, string> = {
  openai: "OpenAI",
  alibaba: "Alibaba",
  moonshot: "Moonshot",
};

interface ThemeColors {
  gridStroke: string;
  axisStroke: string;
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
  isDark: boolean;
  barColors: Record<string, string>;
}

const CustomTooltip = ({
  active,
  payload,
  isDark,
  barColors,
}: CustomTooltipWithThemeProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
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
          {providerLabels[d.provider]}
        </div>
      </div>
    );
  }
  return null;
};

export default function TerminalBenchSmallChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hiddenProviders, setHiddenProviders] = useState<Set<string>>(new Set());

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
    () => data.filter((d) => !hiddenProviders.has(d.provider)),
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

  const chartHeight = isMobile ? 300 : 420;
  const chartMargin = isMobile
    ? { top: 0, right: 8, left: 0, bottom: 40 }
    : { top: 0, right: 20, left: 0, bottom: 70 };

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
            Small Coding Models
          </h1>
          <div
            className={`font-mono ${isMobile ? "mt-1 text-[11px]" : "mt-1.5 text-[13px]"} ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            Terminal-Bench 2.0 · Alibaba Leaderboard
          </div>
        </div>

        {/* Legend */}
        <div
          className={`flex flex-wrap justify-center ${isMobile ? "mb-3 gap-3" : "mb-6 gap-6"}`}
        >
          {[
            { label: "Alibaba", key: "alibaba", color: barColors.alibaba },
            { label: "Moonshot", key: "moonshot", color: barColors.moonshot },
            { label: "OpenAI", key: "openai", color: barColors.openai },
          ].map(({ label, key, color }) => {
            const isHidden = hiddenProviders.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleProvider(key)}
                className={`flex cursor-pointer select-none items-center border-none bg-transparent p-0 ${isMobile ? "gap-1" : "gap-2"}`}
                style={{ opacity: isHidden ? 0.4 : 1, transition: "opacity 0.2s ease" }}
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
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={visibleData}
            margin={chartMargin}
            barCategoryGap={isMobile ? "12%" : "18%"}
            onMouseMove={(state) => {
              if (
                state?.activeTooltipIndex !== undefined &&
                typeof state.activeTooltipIndex === "number"
              ) {
                setHoveredIdx(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.gridStroke}
              vertical={false}
            />
            <XAxis
              dataKey={isMobile ? "shortName" : "name"}
              tick={{
                fill: isDark ? "#d1d5db" : "#555",
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'DM Sans', sans-serif",
                textAnchor: "end",
              }}
              angle={isMobile ? -50 : -35}
              textAnchor="end"
              axisLine={{ stroke: theme.axisStroke }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tick={{
                fill: isDark ? "#9ca3af" : "#999",
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              axisLine={false}
              tickLine={false}
              domain={[0, 70]}
              tickFormatter={(v) => `${v}%`}
              width={isMobile ? 28 : 48}
            />
            <Tooltip
              content={<CustomTooltip isDark={isDark} barColors={barColors} />}
              cursor={false}
            />
            <ReferenceLine
              y={52.5}
              stroke="#06b6d4"
              strokeDasharray="4 4"
              strokeOpacity={0.3}
            />
            <Bar
              dataKey="accuracy"
              radius={[3, 3, 0, 0]}
              maxBarSize={isMobile ? 40 : 72}
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
                position="top"
                formatter={(v) => `${v}%`}
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
              Source:
            </span>{" "}
            Alibaba Cloud Terminal-Bench 2.0 leaderboard. All Qwen3.5 MoE models
            use activated parameter counts (A-suffix). K2.5-1T-A32B is a
            1T-parameter sparse MoE from Moonshot AI with 32B active parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
