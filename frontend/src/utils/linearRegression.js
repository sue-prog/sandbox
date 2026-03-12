export function linearRegression(points) {
  if (!points.length) return null;

  const n = points.length;
  const sumX = points.reduce((a, p) => a + p.pct, 0);
  const sumY = points.reduce((a, p) => a + p.hours, 0);
  const sumXY = points.reduce((a, p) => a + p.pct * p.hours, 0);
  const sumX2 = points.reduce((a, p) => a + p.pct * p.pct, 0);

  const slope =
    (n * sumXY - sumX * sumY) /
    (n * sumX2 - sumX * sumX);

  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}
