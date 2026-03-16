import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function LessonFrictionChart({ data }) {
  // Give each lesson ~35px of vertical space
  const chartHeight = Math.max(600, data.length * 35);

  return (
    <div>
      <h2>Lesson Friction Overview</h2>

      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <BarChart
          width={900}
          height={chartHeight}
          data={data}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="lesson"
            width={260}
            tick={{ fontSize: 11 }}   // ← smaller font
          />

          <Tooltip isAnimationActive={false} />
          <Legend />

          <Bar dataKey="passed" stackId="a" fill="#4caf50" isAnimationActive={false} />
          <Bar dataKey="failed" stackId="a" fill="#f44336" isAnimationActive={false} />
          <Bar dataKey="incomplete" stackId="a" fill="#9c27b0" isAnimationActive={false} />
          <Bar dataKey="continuation" stackId="a" fill="#ff9800" isAnimationActive={false} />
        </BarChart>
      </div>
    </div>
  );
}
