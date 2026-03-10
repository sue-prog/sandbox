import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LabeledScatterChart from "./LabeledScatterChart";

export default function ScatterPage() {
  const [data, setData] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/scatter/${encodeURIComponent(courseId)}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error fetching scatter data:", err));
  }, [courseId]);

  if (!data) {
    return <div style={{ padding: 20 }}>Loading scatter data…</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>SMA Private Pilot Training Course</h2>
      <LabeledScatterChart data={data} />
    </div>
  );
}
