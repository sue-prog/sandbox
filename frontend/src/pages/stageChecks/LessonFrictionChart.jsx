import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function LessonFrictionChart({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  // Group rows by lessonName and count statuses
  const grouped = {};
  for (const row of safeData) {
    const lesson = row.lessonName ?? "Unknown Lesson";

    if (!grouped[lesson]) {
      grouped[lesson] = {
        passed: 0,
        failed: 0,
        incomplete: 0,
        continuation: 0
      };
    }

    if (row.passed) grouped[lesson].passed++;
    if (row.failed) grouped[lesson].failed++;
    if (row.incomplete) grouped[lesson].incomplete++;
    if (row.continuation) grouped[lesson].continuation++;
  }

  // Convert groups into chart rows
  const chartData = Object.entries(grouped).map(([lesson, counts]) => ({
    lesson,
    ...counts
  }));

  return (
    <div>
      <h2>Lesson Friction (Status Breakdown)</h2>

      <BarChart
        data={chartData}
        layout="vertical"
        width={900}
        height={Math.max(400, chartData.length * 22)}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="lesson"
          width={320}          // more horizontal space for long lesson names
          tick={{ fontSize: 10 }}   // smaller, readable font
          interval={0}         // force Recharts to show EVERY label
        />
        <Tooltip isAnimationActive={false} />

        {/* Stacked bars */}
        <Bar dataKey="passed" stackId="a" fill="#4caf50" />
        <Bar dataKey="failed" stackId="a" fill="#f44336" />
        <Bar dataKey="incomplete" stackId="a" fill="#9c27b0" />
        <Bar dataKey="continuation" stackId="a" fill="#ff9800" />
      </BarChart>
    </div>
  );
}
