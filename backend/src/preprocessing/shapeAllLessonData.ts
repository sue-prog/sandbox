export function shapeAllLessonData(raw: any[], courseName: string) {
  return raw
    .filter(row => row.Course === courseName)
    .map(row => ({
      date: row.Date,
      student: row.Student,
      instructor: row.Instructor,
      course: row.Course,
      lessonName: row.Lesson,
      status: row["Repeat or Continue"] || row.Status,
      attempt: Number(row.Attempt) || 1,

      // Normalize grading fields
      passed: row["Lesson Grade"]?.toLowerCase() === "complete",
      failed: row["Lesson Grade"]?.toLowerCase() === "fail",
      incomplete: row["Lesson Grade"]?.toLowerCase() === "incomplete",
      continuation: row["Repeat or Continue"]?.toLowerCase() === "continue"
    }));
}
