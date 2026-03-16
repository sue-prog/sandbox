export default function LassoLayer({ dragStart, dragEnd }) {
  // If dragStart is missing, render nothing
  if (!dragStart) return null;

  // If dragEnd is missing, use dragStart as the fallback
  const end = dragEnd || dragStart;

  // Extra safety: if either is still null for any reason, bail out
  if (!end) return null;

  const x = Math.min(dragStart.x, end.x);
  const y = Math.min(dragStart.y, end.y);
  const width = Math.abs(end.x - dragStart.x);
  const height = Math.abs(end.y - dragStart.y);

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(0, 120, 215, 0.2)"
      stroke="rgba(0, 120, 215, 0.8)"
      strokeWidth={1}
      pointerEvents="none"
    />
  );
}
