import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PrematureSignoffChart({ data }) {
  if (!data || data.length === 0) {
    return <div>No premature signoff data available.</div>;
  }

  // Sort instructors by highest premature rate
  const sorted = [...data].sort(
    (a, b) => b.prematureRate - a.prematureRate
  );

  // Convert rate (0.25) → percent (25)
  const formatted = sorted.map(d => ({
    ...d,
    prematurePercent: Math.round(d.prematureRate * 100)
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <h2>Premature Signoff Rate by Instructor</h2>

      <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={formatted}
    layout="vertical"
    margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
    barCategoryGap={12}
  >
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      type="number"
      domain={[0, "dataMax + 5"]}
      tickFormatter={(v) => `${v}%`}
    />

    <YAxis
      type="category"
      dataKey="instructor"
      width={120}
    />
          <Tooltip
            isAnimationActive={false}
            formatter={(value, name, entry) => {
              const d = entry?.payload;
              if (!d) return value;

              return [
                `${d.recommended} recommended • ${d.passed} passed • ${d.failed} failed • ${d.incomplete} incomplete`,
                "Details"
              ];
            }}
            labelFormatter={(label) => `Instructor: ${label}`}
          />
  <Bar
    dataKey="prematurePercent"
    fill="#d9534f"
    barSize={24}
    isAnimationActive={false}
    label={{
    position: "right",
    formatter: (value, entry) => {
      if (!entry) return ""; // ⭐ prevents crash on first render

      const { recommended, passed, failed, incomplete } = entry;

      return `${recommended} rec • ${passed} pass • ${failed} fail • ${incomplete} inc`;
    }
    }}
  />

  </BarChart>
</ResponsiveContainer>

    </div>
  );
}
