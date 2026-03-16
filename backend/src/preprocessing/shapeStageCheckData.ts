import { parse } from "date-fns";

export function shapeStageCheckData(rows: any[], courseName: string) {
  // Filter to this course only
  const courseRows = rows
    .filter(r => r.Course === courseName)
    .map(r => ({
      ...r,
      parsedDate: parse(r.Date, "M/d/yyyy", new Date())
    }))
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()); // chronological

  // Identify stage-check rows
  const stageCheckRows = courseRows.filter(r => {
    const lesson = (r.Lesson || "").toUpperCase();
    const stageField = (r["Stage Check"] || "").toUpperCase();
    return lesson.includes("STAGE CHECK") || stageField !== "";
  });

  // Shape each stage-check row
  return stageCheckRows.map(r => {
    const lesson = r.Lesson || "";
    const stageField = r["Stage Check"] || "";

    // Extract stage name (I, II, III, FINAL, etc.)
    const stageMatch = lesson.match(/STAGE CHECK\s*([IVX]+|FINAL)/i);
    const stage = stageMatch ? stageMatch[1].toUpperCase() : stageField || "UNKNOWN";

    // Normalize pass/fail
    const grade = (r["Lesson Grade"] || "").trim().toUpperCase();
    const passed = grade === "COMPLETE";
    const failed = grade === "UNSATISFACTORY" || grade === "INCOMPLETE";
    const continuation = grade === "CONTINUE";

    // Compute flights before stage (same student, same course, earlier date)
    const flightsBeforeStage = courseRows.filter(l =>
      l.Student === r.Student &&
      l.parsedDate < r.parsedDate
    ).length;

    // Compute primary instructor (most frequent in last 5 lessons)
    const recentLessons = courseRows
      .filter(l =>
        l.Student === r.Student &&
        l.parsedDate < r.parsedDate
      )
      .sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime())
      .slice(0, 5);

    const instructorCounts: Record<string, number> = {};
    for (const lessonRow of recentLessons) {
      const inst = lessonRow.Instructor || "Unknown";
      instructorCounts[inst] = (instructorCounts[inst] || 0) + 1;
    }

    const primaryInstructor =
      Object.entries(instructorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return {
      student: r.Student,
      courseName,
      stage,
      lessonName: r.Lesson,
      checkInstructor: r.Instructor,
      primaryInstructor,
      date: r.parsedDate,
      attempt: Number(r.Attempt) || 1,
      passed,
      failed,
      continuation,
      flightsBeforeStage
    };
  });
}
