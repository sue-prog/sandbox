import { Routes, Route, Link } from "react-router-dom";
import ScatterPage from "./ScatterPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Select a course</h1>
            <Link to="/scatter/U01BIFByaXZhdGUgUGlsb3QgVHJhaW5pbmcgQ291cnNl">
              SMA Private Pilot Training Course
            </Link>
          </div>
        }
      />
      <Route path="/scatter/:courseId" element={<ScatterPage />} />
    </Routes>
  );
}
