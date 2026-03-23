import { useParams } from "react-router-dom";
import PrematureSignoffChart from "./PrematureSignoffChart";

export default function InstructorQualityPage({ shapedData }) {
  const { courseId } = useParams();

  // Pull the shaped data for this course
  const course = shapedData[courseId];

  if (!course) return <div>Loading…</div>;

  // This is the data we created in App.jsx
  const prematureSignoffData = course.instructorQuality;

  if (!prematureSignoffData) return <div>No instructor quality data.</div>;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <h1>Instructor Quality Metrics</h1>

      <div
        style={{
          width: "100%",
          height: "500px",
          minHeight: "500px",
          flexShrink: 0,
          display: "block",
          position: "relative",
        }}
      >
        <PrematureSignoffChart data={prematureSignoffData} />
      </div>
    </div>
  );
}
