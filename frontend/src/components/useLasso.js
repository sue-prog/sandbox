import { useState } from "react";

export default function useLasso() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const startDrag = (x, y) => {
    setDragStart({ x, y });
    setDragEnd(null);
    setIsDragging(true);
  };

  const updateDrag = (x, y) => {
    if (!isDragging) return;
    setDragEnd({ x, y });
  };

  const endDrag = () => {
    setIsDragging(false);
    return { dragStart, dragEnd };
  };

  return {
    isDragging,
    dragStart,
    dragEnd,
    startDrag,
    updateDrag,
    endDrag
  };
}
