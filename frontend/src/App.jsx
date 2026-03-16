import { Routes, Route, Link } from "react-router-dom";
import StudentFlightHoursPage from "./pages/studentFlightHours/StudentFlightHoursPage";
import StageChecksPage from "./pages/stageChecks/StageChecksPage";
import InstructorQualityPage from "./pages/instructorQuality/InstructorQualityPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
  <h1>Course Analytics Dashboard</h1>

<h2>Select a Course</h2>
<select disabled>
  <option value="U01BIFByaXZhdGUgUGlsb3QgVHJhaW5pbmcgQ291cnNl">
    SMA Private Pilot Training Course
  </option>
</select>

<h2>Select an Analysis Type</h2>

<ul style={{ listStyle: "none", padding: 0 }}>
  <li>
    <Link to="/scatter/U01BIFByaXZhdGUgUGlsb3QgVHJhaW5pbmcgQ291cnNl">
      <strong>Flight Hours Progress</strong><br />
      <span>Scatter chart of flight hours vs lesson completion.</span>
    </Link>
  </li>
  <br />
  <li>
    <Link to="/stage-checks/test-course">
      <strong>Stage Check Analytics</strong><br />
      <span>Pass/fail trends, timing, and performance insights.</span>
    </Link>
  </li>
    <br />
    <li>
    <Link to={"/instructor-quality/test-course"}>
      <strong>Instructor Quality Metrics</strong><br />
      <span>Fail rate for stage checks indicating premature signoff.</span>
    </Link>
  </li>
</ul>

</div>
        }
      />
      <Route path="/scatter/:courseId" element={<StudentFlightHoursPage />} />
      <Route path="/stage-checks/:courseId" element={<StageChecksPage />} />
      <Route path="/instructor-quality/:courseId" element={<InstructorQualityPage />} />
    </Routes>
  );
}
