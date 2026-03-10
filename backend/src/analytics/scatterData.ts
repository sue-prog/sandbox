export function buildScatterData(snapshots: any[]) {
  return snapshots.map(s => ({
    student: s.student,
    pct: s.pctComplete,
    hours: s.totalHours,
    instructor: s.instructor ?? null
  }));
  
}

export function detectOutliers(points: any[]) {
  const outliers = [];

  for (const p of points) {
    if (p.pct >= 90 && p.hours < 40) {
      outliers.push({ ...p, reason: "Low hours for high completion" });
    }
    if (p.pct < 70 && p.hours > 70) {
      outliers.push({ ...p, reason: "High hours for low completion" });
    }
  }

  return outliers;
}
