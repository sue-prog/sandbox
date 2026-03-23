export function groupLessonsByStudent(lessons) {
  const groups = {};

  for (const row of lessons) {
    const student = row.student;
    if (!student) continue;

    if (!groups[student]) {
      groups[student] = [];
    }

    groups[student].push(row);
  }

  return groups;
}
