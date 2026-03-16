import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function FlightsToStageChart({ data }) {
  const chartData = data.map(d => ({
    stage: d.stage,
    avgFlights:
      d.flights.length > 0
        ? d.flights.reduce((a, b) => a + b, 0) / d.flights.length
        : 0
  }));

  return (
    <div>
      <h2>Average Flights Before Stage Check</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip isAnimationActive={false}/>
        <Bar dataKey="avgFlights" fill="#2196f3" />
      </BarChart>
    </div>
  );
}
