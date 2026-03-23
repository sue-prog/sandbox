import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import AnalyticsLayout from "./layouts/AnalyticsLayout";
import StudentFlightHoursPage from "./pages/studentFlightHours/StudentFlightHoursPage";
import StageChecksPage from "./pages/stageChecks/StageChecksPage";
import InstructorQualityPage from "./pages/instructorQuality/InstructorQualityPage";
import UploadDataPanel from "./components/UploadDataPanel";

import { shapeAllLessonData } from "./localProcessing/shapeAllLessonData";
import {
  shapeStageCheckData,
  shapeAllLessonsFromStageCheckFile
} from "./localProcessing/shapeStageCheckData";
import { shapeInstructorPrematureSignoff } from "./localProcessing/shapeInstructorQuality";

export default function App() {
  // Raw uploaded data
  const [uploadedStageChecks, setUploadedStageChecks] = useState(null);
  const [uploadedFlightHours, setUploadedFlightHours] = useState(null);

  // Multi-course support
  const [courses, setCourses] = useState([]);          // array of course names
  const [shapedData, setShapedData] = useState({});    // { courseName: { stageChecks, lessons } }
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <>
      {/* Upload lives OUTSIDE <Routes> */}
      <UploadDataPanel
        onFilesReady={({ stageChecks, flightHours }) => {
          // Store raw CSVs
          setUploadedStageChecks(stageChecks);
          setUploadedFlightHours(flightHours);

          // 1. Extract ALL course names from both CSVs
          const allCourses = Array.from(
            new Set([
              ...stageChecks.map(r => r.Course?.trim()).filter(Boolean),
              ...flightHours.map(r => r.Course?.trim()).filter(Boolean)
            ])
          );

          setCourses(allCourses);

          // 2. Preprocess EACH course separately
          const shapedByCourse = {};

          for (const course of allCourses) {
            shapedByCourse[course] = {
              stageChecks: shapeStageCheckData(stageChecks, course),
              allLessonsFromStageCheckFile: shapeAllLessonsFromStageCheckFile(stageChecks, course),  
              lessons: shapeAllLessonData(flightHours, course),
              instructorQuality: shapeInstructorPrematureSignoff(shapeStageCheckData(stageChecks, course))
            };
          }

          // Store shaped data
          setShapedData(shapedByCourse);

        }}
      />

      {/* Quick confirmation of raw upload */}
      {uploadedStageChecks && (
        <p>Stage check rows loaded: {uploadedStageChecks.length}</p>
      )}
      {uploadedFlightHours && (
        <p>Flight hours rows loaded: {uploadedFlightHours.length}</p>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Course Analytics Dashboard</h1>

              <h2>Select a Course</h2>
              <select
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
              >
                <option value="">-- Select a course --</option>
                 {courses.map(course => (
                  <option key={course} value={course}>
                  {course}
                </option>
               ))}
              </select>

              <h2>Select an Analysis Type</h2>

              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <Link
                    to={
                      selectedCourse
                        ? `/scatter/${encodeURIComponent(selectedCourse)}`
                        : "#"
                    }
                    style={{
                      pointerEvents: selectedCourse ? "auto" : "none",
                      opacity: selectedCourse ? 1 : 0.5
                    }}
                  >
                    <strong>Flight Hours Progress</strong><br />
                    <span>Scatter chart of flight hours vs lesson completion.</span>
                  </Link>
                </li>

                <br />

                <li>
                  <Link
                    to={
                      selectedCourse
                        ? `/stage-checks/${encodeURIComponent(selectedCourse)}`
                        : "#"
                    }
                    style={{
                      pointerEvents: selectedCourse ? "auto" : "none",
                      opacity: selectedCourse ? 1 : 0.5
                    }}
                  >
                    <strong>Stage Check Analytics</strong><br />
                    <span>Pass/fail trends, timing, and performance insights.</span>
                  </Link>
                </li>

                <br />

                <li>
                  <Link
                    to={
                      selectedCourse
                        ? `/instructor-quality/${encodeURIComponent(selectedCourse)}`
                        : "#"
                    }
                    style={{
                      pointerEvents: selectedCourse ? "auto" : "none",
                      opacity: selectedCourse ? 1 : 0.5
                    }}
                  >
                    <strong>Instructor Quality Metrics</strong><br />
                    <span>Fail rate for stage checks indicating premature signoff.</span>
                  </Link>
                </li>
              </ul>
            </div>
          }
        />

        <Route
          path="/scatter/:courseId"
          element={
            <AnalyticsLayout>
              <StudentFlightHoursPage shapedData={shapedData} />
            </AnalyticsLayout>
            }
        />

        <Route
          path="/stage-checks/:courseId"
          element={
          <AnalyticsLayout>
            <StageChecksPage shapedData={shapedData} />
          </AnalyticsLayout>
          }
        />

        <Route
          path="/instructor-quality/:courseId"
          element={
          <AnalyticsLayout>
            <InstructorQualityPage shapedData={shapedData} />
          </AnalyticsLayout>
          }
        />
      </Routes>
    </>
  );
}
