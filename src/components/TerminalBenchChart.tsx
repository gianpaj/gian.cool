import { useState } from "react";
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
  { name: "GPT-5.3-Codex\n(xhigh)", accuracy: 77.3, provider: "openai" },
  { name: "Opus 4.6", accuracy: 65.4, provider: "anthropic" },
  {
    name: "GPT-5.2-Codex\n(xhigh, Anth.)",
    accuracy: 64.7,
    provider: "anthropic_ref",
  },
  { name: "GPT-5.2-Codex\n(xhigh, OAI)", accuracy: 64.0, provider: "openai" },
  { name: "GPT-5.2\n(xhigh)", accuracy: 62.2, provider: "openai" },
  { name: "Opus 4.5", accuracy: 59.8, provider: "anthropic" },
  { name: "Gemini 3 Pro", accuracy: 56.2, provider: "google" },
  { name: "Sonnet 4.5", accuracy: 51.0, provider: "anthropic" },
];

const colors: Record<string, string> = {
  openai: "#1a1a2e",
  anthropic: "#d4714e",
  anthropic_ref: "#d4714e",
  google: "#4285f4",
};

const providerLabels: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
};

interface TooltipPayload {
  payload: {
    name: string;
    accuracy: number;
    provider: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const prov = d.provider === "anthropic_ref" ? "anthropic" : d.provider;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: "10px 14px",
          color: "#222",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.name.replace(/\n/g, " ")}</div>
        <div style={{ color: colors[d.provider], fontWeight: 600 }}>{d.accuracy}%</div>
        <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{providerLabels[prov]}</div>
        {d.provider === "anthropic_ref" && (
          <div
            style={{
              color: "#aaa",
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

  return (
    <div
      style={{
        background: "#f5f5f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: 24,
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
          background: "#ffffff",
          borderRadius: 16,
          border: "1px solid #e2e2e2",
          padding: "36px 32px 28px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#999",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Benchmark Comparison
          </div>
          <h1
            style={{
              color: "#1a1a1a",
              fontSize: 28,
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
              fontSize: 13,
              color: "#777",
              marginTop: 6,
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
            gap: 24,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Anthropic", color: colors.anthropic },
            { label: "OpenAI", color: colors.openai },
            { label: "Google", color: colors.google },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: color,
                }}
              />
              <span style={{ color: "#555", fontSize: 12, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={data}
            margin={{ top: 24, right: 20, left: 0, bottom: 60 }}
            barCategoryGap="18%"
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined && typeof state.activeTooltipIndex === "number") {
                setHoveredIdx(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{
                fill: "#555",
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
              }}
              angle={-35}
              textAnchor="end"
              axisLine={{ stroke: "#ddd" }}
              tickLine={false}
              interval={0}
              height={90}
            />
            <YAxis
              tick={{
                fill: "#999",
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <ReferenceLine y={65.4} stroke="#d4714e" strokeDasharray="4 4" strokeOpacity={0.25} />
            <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} maxBarSize={64}>
              <LabelList
                dataKey="accuracy"
                position="top"
                formatter={(v) => `${v}%`}
                style={{
                  fill: "#333",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.provider]}
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
            marginTop: 16,
            padding: "12px 16px",
            background: "#fafaf8",
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          <p
            style={{
              color: "#999",
              fontSize: 11,
              margin: 0,
              lineHeight: 1.6,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span style={{ color: "#666", fontWeight: 600 }}>Note:</span> All OpenAI models shown at
            <span style={{ color: "#444" }}> xhigh</span> compute setting. GPT-5.2-Codex appears twice —
            <span style={{ color: "#444" }}>64.7%</span> as reported by Anthropic,
            <span style={{ color: "#444" }}>64.0%</span> as reported by OpenAI. Differences may reflect evaluation
            configuration or versioning.
          </p>
        </div>
      </div>
    </div>
  );
}
