import React from "react";

export default function HighlightedDot({ cx = 0, cy = 0, selected = false, fill = "#000" }) {
  // If cx or cy are missing, don't render anything yet
  if (cx == null || cy == null) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={fill} />
      {selected && (
        <circle
          cx={cx}
          cy={cy}
          r={10}
          stroke="red"
          strokeWidth={2}
          fill="none"
        />
      )}
    </g>
  );
}
