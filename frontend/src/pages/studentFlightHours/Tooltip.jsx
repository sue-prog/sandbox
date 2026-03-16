// Tooltip.jsx
import React from "react";

export default function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const p = payload[0].payload;

  return (
    <div
      style={{
        background: "white",
        padding: "10px 14px",
        border: "1px solid #ccc",
        borderRadius: 6,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: 14,
        lineHeight: 1.4
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 4 }}>{p.student}</div>
      <div>Instructor: {p.instructor}</div>
      <div>% Complete: {p.pct}</div>
      <div>Hours: {p.hours}</div>
    </div>
  );
}
