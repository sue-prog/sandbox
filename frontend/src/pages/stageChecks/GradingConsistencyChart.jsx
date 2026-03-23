import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function GradingConsistencyChart({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  // Group rows by checkInstructor
  const grouped = {};
  for (const row of safeData) {
    const instructor = row.checkInstructor ?? "Unknown";

    if (!grouped[instructor]) {
      grouped[instructor] = {
        instructor,
        passed: 0,
        failed: 0,
        incomplete: 0,
        continuation: 0
      };
    }

    if (row.passed) grouped[instructor].passed += 1;
    if (row.failed) grouped[instructor].failed += 1;
    if (row.incomplete) grouped[instructor].incomplete += 1;
    if (row.continuation) grouped[instructor].continuation += 1;
  }

  const chartData = Object.values(grouped);

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
