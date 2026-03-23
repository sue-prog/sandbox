import Papa from "papaparse";
import { useState } from "react";

export default function UploadDataPanel({ onFilesReady }) {
  const [stageChecks, setStageChecks] = useState(null);
  const [flightHours, setFlightHours] = useState(null);

  function parseFile(file, setter) {
    if (!file) return;

//  console.log("Parsing file:", file.name);   // ← add this

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
//        console.log("Parsed rows:", results.data.length);  // ← add this
        setter(results.data);}
    });
  }

  function handleContinue() {
    if (!stageChecks || !flightHours) return;
    onFilesReady({ stageChecks, flightHours });
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Upload Your Data</h2>
      <p> You may include one or multiple courses in the upload.</p>
      
      <p><strong>1. Lesson / Stage Check Data</strong> (CSV from FSP: Reports → Training Session Detail)</p>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => parseFile(e.target.files[0], setStageChecks)}
      />

      <p><strong>2. Flight Hours / Course Progress</strong> (CSV from FSP: Reports → Student Progress Detail -- ADD fields for Total Ground Sum and Total Flight Time Sum)</p>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => parseFile(e.target.files[0], setFlightHours)}
      />

      <button
        disabled={!stageChecks || !flightHours}
        onClick={handleContinue}
        style={{ marginTop: "1rem" }}
      >
        Continue
      </button>
    </div>
  );
}
