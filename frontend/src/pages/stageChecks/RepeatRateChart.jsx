import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function RepeatRateChart({ data }) {
  const chartData = data.map(d => ({
    stage: d.stage,
    repeatRate: d.repeatRate * 100 // convert to %
  }));

  console.log("RepeatRateChart data:", data);

  return (
    <div>
      <h2>Repeat Rate by Stage</h2>

      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis unit="%" />
        <Tooltip />
        <Bar dataKey="repeatRate" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
