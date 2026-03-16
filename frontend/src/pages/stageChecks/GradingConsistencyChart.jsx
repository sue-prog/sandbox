import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function GradingConsistencyChart({ data }) {
  const chartData = data.map(d => ({
    instructor: d.instructor,
    passed: d.passed,
    failed: d.failed,
    incomplete: d.incomplete,
    continuation: d.continuation
  }));

  return (
    <div>
      <h2>Grading Consistency by Check Instructor</h2>

      <BarChart width={700} height={350} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="instructor" />
        <YAxis />
        <Tooltip isAnimationActive={false} />
        <Legend />
        <Bar dataKey="passed" stackId="a" fill="#4caf50" />
        <Bar dataKey="failed" stackId="a" fill="#f44336" />
        <Bar dataKey="incomplete" stackId="a" fill="#9c27b0" /> 
        <Bar dataKey="continuation" stackId="a" fill="#ff9800" />
      </BarChart>
    </div>
  );
}
