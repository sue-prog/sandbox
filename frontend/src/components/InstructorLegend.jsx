import React from "react";

export default function InstructorLegend({
  uniqueInstructors,
  selectedInstructors,
  setSelectedInstructors,
  colorMap
}) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Instructors</h3>
      {uniqueInstructors.map(inst => {
        const isSelected =
          selectedInstructors.length === 0 ||
          selectedInstructors.includes(inst);

        return (
          <div
            key={inst}
            onClick={() => {
              setSelectedInstructors(prev =>
                prev.includes(inst)
                  ? prev.filter(i => i !== inst)
                  : [...prev, inst]
              );
            }}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 6,
              cursor: "pointer",
              opacity: isSelected ? 1 : 0.4
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                backgroundColor: colorMap[inst],
                marginRight: 8,
                border: "1px solid #333"
              }}
            />
            <span>{inst}</span>
          </div>
        );
      })}
    </div>
  );
}
