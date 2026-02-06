import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";

const data = [
  { name: "GPT-5.3-Codex (xhigh)", shortName: "GPT-5.3 (xh)", accuracy: 77.3, provider: "openai" },
  { name: "Opus 4.6", shortName: "Opus 4.6", accuracy: 65.4, provider: "anthropic" },
  {
    name: "GPT-5.2-Codex (xhigh, Anth.)",
    shortName: "GPT-5.2 (A)",
    accuracy: 64.7,
    provider: "anthropic_ref",
  },
  { name: "GPT-5.2-Codex (xhigh, OAI)", shortName: "GPT-5.2 (O)", accuracy: 64.0, provider: "openai" },
  { name: "GPT-5.2 (xhigh)", shortName: "GPT-5.2", accuracy: 62.2, provider: "openai" },
  { name: "Opus 4.5", shortName: "Opus 4.5", accuracy: 59.8, provider: "anthropic" },
  { name: "Gemini 3 Pro", shortName: "Gemini 3", accuracy: 56.2, provider: "google" },
  { name: "Sonnet 4.5", shortName: "Sonnet 4.5", accuracy: 51.0, provider: "anthropic" },
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

const CustomTooltip = ({ active, payload, isDark, barColors }: CustomTooltipWithThemeProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const prov = d.provider === "anthropic_ref" ? "anthropic" : d.provider;
    return (
      <div
        className={`rounded-lg p-3 font-sans text-[13px] shadow-lg max-w-50 border ${
          isDark ? "bg-dark-bg border-dark-border text-dark-text" : "bg-white border-border text-ink"
        }`}
      >
        <div className="font-bold mb-1">{d.name}</div>
        <div className="font-semibold" style={{ color: barColors[d.provider] }}>
          {d.accuracy}%
        </div>
        <div className={`text-[11px] mt-0.5 ${isDark ? "text-dark-muted" : "text-muted"}`}>{providerLabels[prov]}</div>
        {d.provider === "anthropic_ref" && (
          <div className={`text-[10px] mt-1 italic ${isDark ? "text-dark-muted" : "text-muted"}`}>
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

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const barColors = useMemo(() => (isDark ? darkModeColors : colors), [isDark]);

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
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const chartHeight = isMobile ? 360 : 520;
  const chartMargin = isMobile ? { top: 0, right: 8, left: 0, bottom: 40 } : { top: 0, right: 20, left: 0, bottom: 70 };

  return (
    <div className={`flex items-center justify-center font-sans ${isMobile ? "p-0" : "p-6"}`}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <div
        className={`w-full max-w-230 border shadow-md ${
          isMobile ? "rounded-xl px-2.5 py-5 pb-4" : "rounded-2xl px-8 py-9 pb-7"
        } ${isDark ? "bg-dark-surface border-dark-border" : "bg-white border-border"}`}
      >
        {/* Header */}
        <div className={`text-center ${isMobile ? "mb-4" : "mb-7"}`}>
          <div
            className={`font-mono uppercase tracking-widest ${
              isMobile ? "text-[9px] tracking-[2px] mb-1" : "text-[11px] tracking-[3px] mb-2"
            } ${isDark ? "text-dark-muted" : "text-muted"}`}
          >
            Benchmark Comparison
          </div>
          <h1
            className={`font-bold tracking-tight m-0 ${
              isMobile ? "text-xl" : "text-[28px]"
            } ${isDark ? "text-dark-text" : "text-ink"}`}
          >
            Agentic Coding
          </h1>
          <div
            className={`font-mono ${isMobile ? "text-[11px] mt-1" : "text-[13px] mt-1.5"} ${
              isDark ? "text-dark-muted" : "text-muted"
            }`}
          >
            Terminal-Bench 2.0
          </div>
        </div>

        {/* Legend */}
        <div className={`flex justify-center flex-wrap ${isMobile ? "gap-3 mb-3" : "gap-6 mb-6"}`}>
          {[
            { label: "Anthropic", color: barColors.anthropic },
            { label: "OpenAI", color: barColors.openai },
            { label: "Google", color: barColors.google },
          ].map(({ label, color }) => (
            <div key={label} className={`flex items-center ${isMobile ? "gap-1" : "gap-2"}`}>
              <div className={`rounded-sm ${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"}`} style={{ background: color }} />
              <span
                className={`font-medium ${isMobile ? "text-[10px]" : "text-xs"} ${
                  isDark ? "text-dark-text" : "text-ink/80"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={data}
            margin={chartMargin}
            barCategoryGap={isMobile ? "12%" : "18%"}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined && typeof state.activeTooltipIndex === "number") {
                setHoveredIdx(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.gridStroke} vertical={false} />
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
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              width={isMobile ? 28 : 48}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} barColors={barColors} />} cursor={false} />
            <ReferenceLine y={65.4} stroke="#d4714e" strokeDasharray="4 4" strokeOpacity={0.25} />
            <Bar dataKey="accuracy" radius={[3, 3, 0, 0]} maxBarSize={isMobile ? 32 : 64}>
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
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[entry.provider]}
                  opacity={hoveredIdx !== null && hoveredIdx !== index ? 0.35 : 1}
                  style={{ transition: "opacity 0.2s ease" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Footer note */}
        <div
          className={`rounded-lg border ${isMobile ? "mt-3 p-2.5" : "mt-4 p-4"} ${
            isDark ? "bg-dark-bg border-dark-border" : "bg-cream border-border"
          }`}
        >
          <p
            className={`font-mono leading-relaxed m-0 ${
              isMobile ? "text-[9px]" : "text-[11px]"
            } ${isDark ? "text-dark-muted" : "text-muted"}`}
          >
            <span className={`font-semibold ${isDark ? "text-dark-text" : "text-ink"}`}>Note:</span> All OpenAI models
            shown at
            <span className={isDark ? "text-dark-text" : "text-ink/80"}> xhigh</span> compute setting. GPT-5.2-Codex
            appears twice —<span className={isDark ? "text-dark-text" : "text-ink/80"}> 64.7%</span> as reported by
            Anthropic,
            <span className={isDark ? "text-dark-text" : "text-ink/80"}> 64.0%</span> as reported by OpenAI.
          </p>
        </div>
      </div>
    </div>
  );
}
