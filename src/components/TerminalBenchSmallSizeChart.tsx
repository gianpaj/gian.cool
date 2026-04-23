import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Provider = "alibaba" | "moonshot" | "google" | "openai";

interface ModelPoint {
  gguf: string;
  name: string;
  provider: Provider;
  score: number;
  shortName: string;
  sizeGb: number;
}

const data: ModelPoint[] = [
  {
    name: "Qwen3.6-27B",
    shortName: "Qwen3.6-27B",
    score: 59.3,
    sizeGb: 16.8,
    provider: "alibaba",
    gguf: "unsloth/Qwen3.6-27B-GGUF",
  },
  {
    name: "Qwen3.5-397B-A17B",
    shortName: "Qwen3.5-397B",
    score: 52.5,
    sizeGb: 244,
    provider: "alibaba",
    gguf: "unsloth/Qwen3.5-397B-A17B-GGUF",
  },
  {
    name: "Qwen3.6-35B-A3B",
    shortName: "Qwen3.6-35B",
    score: 51.5,
    sizeGb: 22.1,
    provider: "alibaba",
    gguf: "unsloth/Qwen3.6-35B-A3B-GGUF",
  },
  {
    name: "K2.5-1T-A32B",
    shortName: "K2.5-1T",
    score: 50.8,
    sizeGb: 621,
    provider: "moonshot",
    gguf: "unsloth/Kimi-K2.5-GGUF",
  },
  {
    name: "Qwen3.5-122B-A10B",
    shortName: "Qwen3.5-122B",
    score: 49.4,
    sizeGb: 76.5,
    provider: "alibaba",
    gguf: "unsloth/Qwen3.5-122B-A10B-GGUF",
  },
  {
    name: "Gemma4-31B",
    shortName: "Gemma4-31B",
    score: 42.9,
    sizeGb: 18.3,
    provider: "google",
    gguf: "unsloth/gemma-4-31B-it-GGUF",
  },
  {
    name: "Qwen3.5-27B",
    shortName: "Qwen3.5-27B",
    score: 41.6,
    sizeGb: 16.7,
    provider: "alibaba",
    gguf: "unsloth/Qwen3.5-27B-GGUF",
  },
  {
    name: "Qwen3.5-35B-A3B",
    shortName: "Qwen3.5-35B",
    score: 40.5,
    sizeGb: 22,
    provider: "alibaba",
    gguf: "unsloth/Qwen3.5-35B-A3B-GGUF",
  },
  {
    name: "Gemma4-26BA4B",
    shortName: "Gemma4-26BA4B",
    score: 34.2,
    sizeGb: 16.9,
    provider: "google",
    gguf: "unsloth/gemma-4-26B-A4B-it-GGUF",
  },
  {
    name: "GPT-OSS-120B",
    shortName: "GPT-OSS-120B",
    score: 18.7,
    sizeGb: 62.8,
    provider: "openai",
    gguf: "unsloth/gpt-oss-120b-GGUF",
  },
];

const colors: Record<Provider, string> = {
  openai: "#10b981",
  alibaba: "#06b6d4",
  moonshot: "#8b5cf6",
  google: "#f59e0b",
};

const darkModeColors: Record<Provider, string> = {
  openai: "#047857",
  alibaba: "#0891b2",
  moonshot: "#6d28d9",
  google: "#d97706",
};

const providerLabels: Record<Provider, string> = {
  openai: "OpenAI",
  alibaba: "Alibaba",
  moonshot: "Moonshot",
  google: "Google",
};

interface ThemeColors {
  axisStroke: string;
  gridStroke: string;
  surfaceBg: string;
  surfaceBorder: string;
  textMuted: string;
  textPrimary: string;
}

const lightTheme: ThemeColors = {
  gridStroke: "#eee",
  axisStroke: "#ddd",
  textPrimary: "#1a1a1a",
  textMuted: "#666",
  surfaceBorder: "#e5e7eb",
  surfaceBg: "#ffffff",
};

const darkTheme: ThemeColors = {
  gridStroke: "#333",
  axisStroke: "#444",
  textPrimary: "#e8e4de",
  textMuted: "#9ca3af",
  surfaceBorder: "#2a2a2a",
  surfaceBg: "#111111",
};

interface TooltipPayload {
  payload: ModelPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  isDark: boolean;
  payload?: TooltipPayload[];
  pointColors: Record<Provider, string>;
}

const CustomTooltip = ({
  active,
  payload,
  isDark,
  pointColors,
}: CustomTooltipProps) => {
  if (!(active && payload?.length)) return null;

  const d = payload[0].payload;

  return (
    <div
      className={`max-w-72 rounded-lg border p-3 font-sans text-[13px] shadow-lg ${
        isDark
          ? "border-dark-border bg-dark-bg text-dark-text"
          : "border-border bg-white text-ink"
      }`}
    >
      <div className="mb-1 font-bold">{d.name}</div>
      <div
        className="mb-1 font-semibold"
        style={{ color: pointColors[d.provider] }}
      >
        {d.score}% score
      </div>
      <div
        className={`text-[11px] ${isDark ? "text-dark-muted" : "text-muted"}`}
      >
        {d.sizeGb} GB · {providerLabels[d.provider]}
      </div>
      <div
        className={`mt-1 break-all text-[11px] ${isDark ? "text-dark-muted" : "text-muted"}`}
      >
        {d.gguf}
      </div>
    </div>
  );
};

export default function TerminalBenchSmallSizeChart() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hiddenProviders, setHiddenProviders] = useState<Set<Provider>>(
    new Set(),
  );

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const pointColors = useMemo(
    () => (isDark ? darkModeColors : colors),
    [isDark],
  );

  const visibleData = useMemo(
    () => data.filter((d) => !hiddenProviders.has(d.provider)),
    [hiddenProviders],
  );

  const xDomain = useMemo(() => {
    if (visibleData.length === 0) return [0, 100] as [number, number];

    const sizes = visibleData.map((d) => d.sizeGb);
    const min = Math.min(...sizes);
    const max = Math.max(...sizes);
    const range = max - min;
    const padding = Math.max(range * 0.12, 2);

    return [
      Math.max(0, Number((min - padding).toFixed(1))),
      Number((max + padding).toFixed(1)),
    ] as [number, number];
  }, [visibleData]);

  const yDomain = useMemo(() => {
    if (visibleData.length === 0) return [0, 100] as [number, number];

    const scores = visibleData.map((d) => d.score);
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const range = max - min;
    const padding = Math.max(range * 0.15, 3);

    return [
      Math.max(0, Number((min - padding).toFixed(1))),
      Math.min(100, Number((max + padding).toFixed(1))),
    ] as [number, number];
  }, [visibleData]);

  const xReference = useMemo(() => {
    const target = 20;
    return target >= xDomain[0] && target <= xDomain[1] ? target : null;
  }, [xDomain]);

  const yReference = useMemo(() => {
    const target = 50;
    return target >= yDomain[0] && target <= yDomain[1] ? target : null;
  }, [yDomain]);

  const toggleProvider = (key: Provider) => {
    setHiddenProviders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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
    ? { top: 16, right: 12, left: 0, bottom: 24 }
    : { top: 24, right: 24, left: 8, bottom: 32 };

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
        <div className={`text-center ${isMobile ? "mb-4" : "mb-7"}`}>
          <div
            className={`font-mono uppercase tracking-widest ${
              isMobile
                ? "mb-1 text-[9px] tracking-[2px]"
                : "mb-2 text-[11px] tracking-[3px]"
            } ${isDark ? "text-dark-muted" : "text-muted"}`}
          >
            Intelligence vs Size
          </div>
          <h2
            className={`m-0 font-bold tracking-tight ${
              isMobile ? "text-xl" : "text-[28px]"
            } ${isDark ? "text-dark-text" : "text-ink"}`}
          >
            Terminal-Bench Score vs Model Size
          </h2>
          <div
            className={`font-mono ${isMobile ? "mt-1 text-[11px]" : "mt-1.5 text-[13px]"} ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            Q4_K_M GGUF size in GB
          </div>
        </div>

        <div
          className={`flex flex-wrap justify-center ${isMobile ? "mb-3 gap-3" : "mb-6 gap-6"}`}
        >
          {(
            [
              { label: "Alibaba", key: "alibaba" },
              { label: "Moonshot", key: "moonshot" },
              { label: "Google", key: "google" },
              { label: "OpenAI", key: "openai" },
            ] as const
          ).map(({ label, key }) => {
            const isHidden = hiddenProviders.has(key);
            const color = pointColors[key];

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
                  className={`rounded-full ${isMobile ? "h-2.5 w-2.5" : "h-3 w-3"}`}
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

        <ResponsiveContainer height={chartHeight} width="100%">
          <ScatterChart margin={chartMargin}>
            <CartesianGrid stroke={theme.gridStroke} strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="sizeGb"
              domain={xDomain}
              tickCount={Math.min(8, Math.max(4, visibleData.length + 1))}
              axisLine={{ stroke: theme.axisStroke }}
              tickLine={false}
              tick={{
                fill: isDark ? "#d1d5db" : "#555",
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              tickFormatter={(value: number) => `${value} GB`}
              label={{
                value: "Model size (GB, Q4_K_M)",
                position: "insideBottom",
                offset: isMobile ? -8 : -4,
                fill: theme.textMuted,
                fontSize: isMobile ? 10 : 12,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <YAxis
              type="number"
              dataKey="score"
              domain={yDomain}
              axisLine={false}
              tickLine={false}
              width={isMobile ? 36 : 52}
              tickCount={Math.min(8, Math.max(4, visibleData.length + 1))}
              tick={{
                fill: isDark ? "#9ca3af" : "#999",
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              tickFormatter={(value: number) => `${value}%`}
              label={{
                value: "Terminal-Bench score",
                angle: -90,
                position: "insideLeft",
                fill: theme.textMuted,
                fontSize: isMobile ? 10 : 12,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <Tooltip
              cursor={{ stroke: theme.axisStroke, strokeDasharray: "4 4" }}
              content={
                <CustomTooltip
                  isDark={isDark}
                  payload={undefined}
                  pointColors={pointColors}
                />
              }
            />
            {xReference !== null && (
              <ReferenceLine
                x={xReference}
                stroke={theme.axisStroke}
                strokeDasharray="4 4"
                strokeOpacity={0.5}
              />
            )}
            {yReference !== null && (
              <ReferenceLine
                y={yReference}
                stroke="#06b6d4"
                strokeDasharray="4 4"
                strokeOpacity={0.3}
              />
            )}
            <Scatter data={visibleData}>
              {visibleData.map((entry) => (
                <Cell
                  key={`${entry.name}-${entry.sizeGb}-${entry.score}`}
                  fill={pointColors[entry.provider]}
                  stroke={isDark ? "#0b0b0b" : "#ffffff"}
                  strokeWidth={1.5}
                />
              ))}
              <LabelList
                dataKey="shortName"
                position="top"
                offset={10}
                style={{
                  fill: theme.textPrimary,
                  fontSize: isMobile ? 8 : 11,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

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
            Sizes are GGUF download sizes for the same quantization level,
            <span className={isDark ? "text-dark-text" : "text-ink"}>
              {" "}
              Q4_K_M
            </span>
            . This chart compares storage footprint against Terminal-Bench 2.0
            score, making the efficiency tradeoff more visible than the
            leaderboard alone.
          </p>
        </div>
      </div>
    </div>
  );
}
