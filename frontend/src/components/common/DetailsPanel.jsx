import { useState } from "react";

export default function DetailsPanel({ selected, onClose, onApply }) {
  const [checked, setChecked] = useState(() =>
    selected.reduce((acc, p) => {
      acc[p.student] = true; // default: all selected
      return acc;
    }, {})
  );

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedIds = Object.keys(checked).filter((id) => checked[id]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 999
      }}
    >
      <h3>Selected Students</h3>

      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {selected.map((p) => (
          <label
            key={p.student}
            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          >
            <input
              type="checkbox"
              checked={checked[p.student]}
              onChange={() => toggle(p.student)}
              style={{ marginRight: 8 }}
            />
            {p.student} — {p.instructor}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => onApply(selectedIds, "keep")}>
          Keep Selected
        </button>
        <button onClick={() => onApply(selectedIds, "delete")}>
          Delete Selected
        </button>
        <button onClick={onClose} style={{ marginLeft: "auto" }}>
          Close
        </button>
      </div>
    </div>
  );
}
