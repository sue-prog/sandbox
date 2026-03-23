import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function FlightsToStageChart({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  // Group rows by stage
  const grouped = {};
  for (const row of safeData) {
    const stage = row.stage ?? "Unknown";
    const flights = row.flightsBeforeStage ?? 0;

    if (!grouped[stage]) grouped[stage] = [];
    grouped[stage].push(flights);
  }

  // Convert groups into chart rows
  const chartData = Object.entries(grouped).map(([stage, flightsArray]) => {
    const avg =
      flightsArray.length > 0
        ? flightsArray.reduce((a, b) => a + b, 0) / flightsArray.length
        : 0;

    return {
      stage,
      avgFlights: avg
    };
  });

  return (
    <div>
      <h2>Average Flights Before Stage Check</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip isAnimationActive={false} />
        <Bar dataKey="avgFlights" fill="#2196f3" />
      </BarChart>
    </div>
  );
}
