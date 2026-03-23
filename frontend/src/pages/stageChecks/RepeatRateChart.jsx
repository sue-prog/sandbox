import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function RepeatRateChart({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  // Group rows by stage
  const grouped = {};
  for (const row of safeData) {
    const stage = row.stage ?? "Unknown";
    if (!grouped[stage]) grouped[stage] = [];
    grouped[stage].push(row);
  }

  // Compute repeat rate per stage
  const chartData = Object.entries(grouped).map(([stage, rows]) => {
    const total = rows.length;

    // A "repeat" is any attempt > 1
    const repeats = rows.filter(r => r.attempt > 1).length;

    const repeatRate = total > 0 ? (repeats / total) * 100 : 0;

    return {
      stage,
      repeatRate
    };
  });

  return (
    <div>
      <h2>Repeat Rate by Stage</h2>

      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis unit="%" />
        <Tooltip isAnimationActive={false} />
        <Bar dataKey="repeatRate" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
