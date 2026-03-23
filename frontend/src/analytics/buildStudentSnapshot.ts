export function buildStudentSnapshot(rows: any[]) {
  if (!rows || rows.length === 0) return null;

  const first = rows[0];

  return {
    student: first.student,
    course: first.course,
    totalHours: first.totalFlightTime,
    pctComplete: first.pctLessonComplete,
    instructor: first.instructor,
    progressCategory:
      first.pctLessonComplete >= 90 ? "On Track" :
      first.pctLessonComplete >= 70 ? "Needs Review" :
      "Behind",
    flags: [],
    raw: rows
  };
}
