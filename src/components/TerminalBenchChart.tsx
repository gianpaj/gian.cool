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
  bg: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  text: string;
  textMuted: string;
  textLabel: string;
  gridStroke: string;
  axisStroke: string;
  noteBg: string;
  noteBorder: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
}

const lightTheme: ThemeColors = {
  bg: "transparent",
  cardBg: "#ffffff",
  cardBorder: "#e2e2e2",
  cardShadow: "0 4px 24px rgba(0,0,0,0.06)",
  text: "#1a1a1a",
  textMuted: "#999",
  textLabel: "#555",
  gridStroke: "#eee",
  axisStroke: "#ddd",
  noteBg: "#fafaf8",
  noteBorder: "#eee",
  tooltipBg: "#fff",
  tooltipBorder: "#e0e0e0",
  tooltipText: "#222",
};

const darkTheme: ThemeColors = {
  bg: "#141414",
  cardBg: "#1e1e1e",
  cardBorder: "#2e2e2e",
  cardShadow: "0 4px 24px rgba(0,0,0,0.4)",
  text: "#e8e4de",
  textMuted: "#9ca3af",
  textLabel: "#d1d5db",
  gridStroke: "#333",
  axisStroke: "#444",
  noteBg: "#252525",
  noteBorder: "#333",
  tooltipBg: "#1a1a1a",
  tooltipBorder: "#444",
  tooltipText: "#e8e4de",
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
  theme: ThemeColors;
  barColors: Record<string, string>;
}

const CustomTooltip = ({ active, payload, theme, barColors }: CustomTooltipWithThemeProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const prov = d.provider === "anthropic_ref" ? "anthropic" : d.provider;
    return (
      <div
        style={{
          background: theme.tooltipBg,
          border: `1px solid ${theme.tooltipBorder}`,
          borderRadius: 8,
          padding: "10px 14px",
          color: theme.tooltipText,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
          maxWidth: 200,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.name}</div>
        <div style={{ color: barColors[d.provider], fontWeight: 600 }}>{d.accuracy}%</div>
        <div style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>{providerLabels[prov]}</div>
        {d.provider === "anthropic_ref" && (
          <div
            style={{
              color: theme.textMuted,
              fontSize: 10,
              marginTop: 4,
              fontStyle: "italic",
            }}
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
    <div
      style={{
        background: theme.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: isMobile ? 0 : 24,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          width: "100%",
          maxWidth: 920,
          background: theme.cardBg,
          borderRadius: isMobile ? 12 : 16,
          border: `1px solid ${theme.cardBorder}`,
          padding: isMobile ? "20px 10px 16px" : "36px 32px 28px",
          boxShadow: theme.cardShadow,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: isMobile ? 16 : 28, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 9 : 11,
              color: theme.textMuted,
              letterSpacing: isMobile ? 2 : 3,
              textTransform: "uppercase",
              marginBottom: isMobile ? 4 : 8,
            }}
          >
            Benchmark Comparison
          </div>
          <h1
            style={{
              color: theme.text,
              fontSize: isMobile ? 20 : 28,
              fontWeight: 700,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            Agentic Coding
          </h1>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 11 : 13,
              color: theme.textMuted,
              marginTop: isMobile ? 4 : 6,
            }}
          >
            Terminal-Bench 2.0
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 12 : 24,
            marginBottom: isMobile ? 12 : 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Anthropic", color: barColors.anthropic },
            { label: "OpenAI", color: barColors.openai },
            { label: "Google", color: barColors.google },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 8 }}>
              <div
                style={{
                  width: isMobile ? 10 : 12,
                  height: isMobile ? 10 : 12,
                  borderRadius: 3,
                  background: color,
                }}
              />
              <span style={{ color: theme.textLabel, fontSize: isMobile ? 10 : 12, fontWeight: 500 }}>{label}</span>
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
                fill: theme.textLabel,
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
                fill: theme.textMuted,
                fontSize: isMobile ? 9 : 11,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              width={isMobile ? 28 : 48}
            />
            <Tooltip content={<CustomTooltip theme={theme} barColors={barColors} />} cursor={false} />
            <ReferenceLine y={65.4} stroke="#d4714e" strokeDasharray="4 4" strokeOpacity={0.25} />
            <Bar dataKey="accuracy" radius={[3, 3, 0, 0]} maxBarSize={isMobile ? 32 : 64}>
              <LabelList
                dataKey="accuracy"
                position="top"
                formatter={(v) => `${v}%`}
                style={{
                  fill: theme.text,
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
          style={{
            marginTop: isMobile ? 12 : 16,
            padding: isMobile ? "10px 12px" : "12px 16px",
            background: theme.noteBg,
            borderRadius: 8,
            border: `1px solid ${theme.noteBorder}`,
          }}
        >
          <p
            style={{
              color: theme.textMuted,
              fontSize: isMobile ? 9 : 11,
              margin: 0,
              lineHeight: 1.6,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span style={{ color: theme.text, fontWeight: 600 }}>Note:</span> All OpenAI models shown at
            <span style={{ color: theme.textLabel }}> xhigh</span> compute setting. GPT-5.2-Codex appears twice —
            <span style={{ color: theme.textLabel }}> 64.7%</span> as reported by Anthropic,
            <span style={{ color: theme.textLabel }}> 64.0%</span> as reported by OpenAI.
          </p>
        </div>
      </div>
    </div>
  );
}
