export function normalizeStudentProgressRow(raw: any) {
  return {
    student: String(raw.Student || "").trim(),
    course: String(raw.Course || "").trim(),
    totalFlightTime: Number(raw["Total Flight Time"] || 0),
    pctLessonComplete: Number(raw["% Lesson Complete"] || 0),
    instructor: String(raw["Instructor"] || "").trim()
  };
}
