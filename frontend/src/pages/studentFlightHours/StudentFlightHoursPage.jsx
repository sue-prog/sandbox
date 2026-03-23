import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LabeledScatterChart from "./LabeledScatterChart";
import { groupLessonsByStudent } from "../../analytics/groupLessonsByStudent";
import { buildStudentSnapshot } from "../../analytics/buildStudentSnapshot";
import { normalizeStudentProgressRow } from "../../analytics/normalizeStudentProgressRow";
import { buildScatterData } from "../../analytics/scatterData";

export default function StudentFlightHoursPage({ shapedData }) {
  const { courseId } = useParams();
  const decodedCourse = decodeURIComponent(courseId);

  // shapedData comes from props
  const rawLessons = shapedData?.[decodedCourse]?.lessons || [];

  // Normalize progress fields
  const lessons = rawLessons.map(normalizeStudentProgressRow);

  // 1. Group lessons by student
  const grouped = groupLessonsByStudent(lessons);

  // 2. Build snapshots (one per student)
  const snapshots = Object.values(grouped)
    .map(rows => buildStudentSnapshot(rows))
    .filter(Boolean);

  // Build scatter data from snapshots
  const scatter = buildScatterData(snapshots);

  return (
    <div style={{ padding: 20 }}>
      <h2>SMA Private Pilot Training Course</h2>
      <LabeledScatterChart data={scatter} />
    </div>
  );
}
