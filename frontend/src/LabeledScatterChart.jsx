import React, { useState, useRef } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Cell
} from "recharts";

import CustomTooltip from "./Tooltip";
import InstructorLegend from "./components/InstructorLegend";
import useLasso from "./components/useLasso";
import LassoLayer from "./components/LassoLayer";
import HighlightedDot from "./components/HighlightedDot";
import DetailsPanel from "./components/DetailsPanel";
import { linearRegression } from "./utils/linearRegression";


export default function LabeledScatterChart({ data }) {
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [removedPoints, setRemovedPoints] = useState([]);

// 1. Compute the dataset that is actually visible on the chart
const visibleData = data.filter(
  (p) => !removedPoints.includes(p.student)
);

// 2. Compute regression ONLY from visible points
const regression = linearRegression(visibleData);

// 3. Build two points for the trendline
let trendlinePoints = [];
if (regression) {
  trendlinePoints = [
    { pct: 0, hours: regression.intercept },
    { pct: 100, hours: regression.slope * 100 + regression.intercept }
  ];
}

  const [showDetails, setShowDetails] = useState(false);

  const handleApply = (ids, action) => {
  if (action === "delete") {
  setRemovedPoints((prev) => [...prev, ...ids]);

  // also remove them from the selection
  setSelectedPoints((prev) => prev.filter((id) => !ids.includes(id)));
  }


  if (action === "keep") {
    setSelectedPoints(ids);
  }

  setShowDetails(false);
};


  // Store cx/cy WITHOUT mutating data
  const pointCoords = useRef({});

  const uniqueInstructors = [...new Set(data.map(p => p.instructor))];

  const {
    isDragging,
    dragStart,
    dragEnd,
    startDrag,
    updateDrag,
    endDrag
  } = useLasso();

  const palette = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf"
  ];

  const dimColor = "#cccccc";
  const dimOpacity = 0.4;

  const colorMap = {};
  uniqueInstructors.forEach((inst, i) => {
    colorMap[inst] = palette[i % palette.length];
  });

/*   const filteredData =
    selectedInstructors.length === 0
      ? data
      : data.filter(p => selectedInstructors.includes(p.instructor));
 */
  // -----------------------------
  // LASSO SELECTION LOGIC
  // -----------------------------
  const handleLassoSelection = (start, end) => {
    const x1 = Math.min(start.x, end.x);
    const x2 = Math.max(start.x, end.x);
    const y1 = Math.min(start.y, end.y);
    const y2 = Math.max(start.y, end.y);

    const selected = data.filter((p) => {
      const coords = pointCoords.current[p.student];
      if (!coords) return false;

      return (
        coords.cx >= x1 &&
        coords.cx <= x2 &&
        coords.cy >= y1 &&
        coords.cy <= y2
      );
    });

    setSelectedPoints(selected.map((p) => p.student));
  };

  return (
    <>
      <div style={{ position: "relative", width: 800, height: 500, outline: "3px solid red" }}>

        <ScatterChart width={800} height={500}>
          <CartesianGrid />
          <XAxis type="number" dataKey="pct" name="% Complete" />
          <YAxis type="number" dataKey="hours" name="Flight Hours" />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
            isAnimationActive={false}
          />

          <Scatter
            name="Students"
            data={visibleData.filter((p) => !removedPoints.includes(p.student))}
            isAnimationActive={false}
            shape={(props) => {
            console.log("cx, cy:", props.cx, props.cy);

          // Store coordinates in a safe external map
              pointCoords.current[props.payload.student] = {
              cx: props.cx,
              cy: props.cy
              };

           return (
          <HighlightedDot
           {...props}
          selected={selectedPoints.includes(props.payload.student)}
         />
        );
        }}

          onClick={(data) => {
          console.log("POINT CLICKED", data);
          const id = data.payload.student;
          setSelectedPoints(prev =>
          prev.includes(id)
          ? prev.filter(x => x !== id)
          : [...prev, id]
       );
  }}
          >
            {data.map((p, i) => {
              const isVisible =
                selectedInstructors.length === 0 ||
                selectedInstructors.includes(p.instructor);

              return (
                <Cell
                  key={i}
                  fill={isVisible ? colorMap[p.instructor] : dimColor}
                  fillOpacity={isVisible ? 1 : dimOpacity}
                />
              );
            })}
          </Scatter>
          {regression && (
          <Line
          type="linear"
          data={trendlinePoints}
          dataKey="hours"
          stroke="#333"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
         />
         )}

         </ScatterChart>

        {/* Lasso rectangle overlay */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 800,
            height: 500,
            pointerEvents: "all",
            cursor: "crosshair"

          }}
          onMouseDown={(e) => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            startDrag(e.clientX - rect.left, e.clientY - rect.top);
          }}
          onMouseMove={(e) => {
          console.log("overlay mousemove");   // debug log

            if (!isDragging) return;
            const rect = e.currentTarget.getBoundingClientRect();
            updateDrag(e.clientX - rect.left, e.clientY - rect.top);
          }}

          onMouseUp={() => {
            const { dragStart, dragEnd } = endDrag();
            if (dragStart && dragEnd) {
              handleLassoSelection(dragStart, dragEnd);
            }
          }}
        >
          {console.log("overlay mounted")} 
          <LassoLayer dragStart={dragStart} dragEnd={dragEnd} />
        </svg>
      </div>
  
{selectedPoints.length > 0 && (
  <div
    style={{
      marginTop: "10px",
      padding: "8px 12px",
      background: "#f5f5f5",
      border: "1px solid #ccc",
      borderRadius: "6px",
      width: "fit-content"
    }}
  >
    <strong>{selectedPoints.length} selected</strong>

    <button
      style={{ marginLeft: "12px" }}
      onClick={() => setShowDetails(true)}
    >
      View Details
    </button>

    <button
      style={{ marginLeft: "8px" }}
      onClick={() => setSelectedPoints([])}
    >
      Clear
    </button>
  </div>
)}
{showDetails && (
  <DetailsPanel
    selected={data.filter((p) => selectedPoints.includes(p.student))}
    onClose={() => setShowDetails(false)}
    onApply={handleApply} 
  />
)}


      <InstructorLegend
        uniqueInstructors={uniqueInstructors}
        selectedInstructors={selectedInstructors}
        setSelectedInstructors={setSelectedInstructors}
        colorMap={colorMap}
      />
    </>
  );
}
