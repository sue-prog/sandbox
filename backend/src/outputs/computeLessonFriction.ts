export function computeLessonFriction(rows: any[]) {
  const lessonFriction: Record<string, any> = {};

  for (const row of rows) {
    const lesson = row.lessonName || "Unknown";

    if (!lessonFriction[lesson]) {
      lessonFriction[lesson] = {
        lesson,
        total: 0,
        passed: 0,
        failed: 0,
        incomplete: 0,
        continuation: 0,
        attempts: []
      };
    }

    const entry = lessonFriction[lesson];

    entry.total += 1;

    if (row.passed) entry.passed += 1;
    if (row.failed) entry.failed += 1;
    if (row.incomplete) entry.incomplete += 1;
    if (row.continuation) entry.continuation += 1;

    entry.attempts.push(row.attempt || 1);
  }

  return Object.values(lessonFriction).map(l => ({
    lesson: l.lesson,
    total: l.total,
    passed: l.passed,
    failed: l.failed,
    incomplete: l.incomplete,
    continuation: l.continuation,
    avgAttempts:
      l.attempts.length > 0
        ? l.attempts.reduce((a, b) => a + b, 0) / l.attempts.length
        : 1
  }));
}
