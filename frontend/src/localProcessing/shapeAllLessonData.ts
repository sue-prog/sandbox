export function shapeAllLessonData(raw: any[], courseName: string) {

  return raw
    .filter(row => row.Course === courseName)
    .map((row, index) => {

      return {
        date: row.Date,
        student: row.Student,
        instructor: row["Primary Instructor"] || row.Instructor,
        otherInstructors: row["Other Instructors"] || "",
        group: row.Group,
        course: row.Course,
        lessonName: row.Lesson,   // ← this is what we’re testing
        status: row["Repeat or Continue"] || row.Status,
        attempt: Number(row.Attempt) || 1,

        // Grading fields
        passed: row["Lesson Grade"]?.toLowerCase() === "complete",
        failed: row["Lesson Grade"]?.toLowerCase() === "fail",
        incomplete: row["Lesson Grade"]?.toLowerCase() === "incomplete",
        continuation: row["Repeat or Continue"]?.toLowerCase() === "continue",

        // Progress fields
        totalFlightTime: Number(row["Total Flight Time Sum"]) || 0,
        totalPrePost: Number(row["Total Pre/Post Sum"]) || 0,
        totalGround: Number(row["Total Ground Sum"]) || 0,
        pctLessonComplete: Number(row["% Lesson Complete"]) || 0
      };
    });
}
