export function normalizeStudentProgressRow(raw: any) {
  return {
    student: String(raw.student || "").trim(),
    course: String(raw.course || "").trim(),
    totalFlightTime: Number(raw.totalFlightTime || 0),
    pctLessonComplete: Number(raw.pctLessonComplete || 0),
    instructor: String(raw.instructor || "").trim()
  };
}
