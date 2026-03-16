import { useParams } from "react-router-dom";
import PrematureSignoffChart from "./PrematureSignoffChart";
import useStageCheckData from "../stageChecks/hooks/useStageCheckData";

export default function InstructorQualityPage() {
  const { courseId } = useParams();
  const { prematureSignoffData, loading, error } = useStageCheckData(courseId);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",          // ⭐ guarantees full-page height
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <h1>Instructor Quality Metrics</h1>

      {/* ⭐ This wrapper CANNOT collapse */}
      <div
        style={{
          width: "100%",
          height: "500px",           // ⭐ fixed height for the chart
          minHeight: "500px",
          flexShrink: 0,             // ⭐ prevents flexbox from collapsing it
          display: "block",
          position: "relative",      // ⭐ ensures ResponsiveContainer can measure
        }}
      >
        <PrematureSignoffChart data={prematureSignoffData} />
      </div>
    </div>
  );
}
