import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { normalizeStudentProgressRow } from "../preprocessing/studentProgress";
import { buildStudentSnapshot } from "../preprocessing/buildSnapshot";
import { buildScatterData } from "./scatterData";
import { detectOutliers } from "./outliers";

export function runAnalyticsPipeline() {

let csvText = fs.readFileSync("data/studentprogress.csv", "utf8");

// Remove UTF‑8 BOM if present
if (csvText.charCodeAt(0) === 0xfeff) {
  csvText = csvText.slice(1);
}

const rows = parse(csvText, {
  columns: true,
  skip_empty_lines: true
});

console.log("Normalized sample rows:");

for (let i = 0; i < 5; i++) {
  console.log(`Row ${i + 1}:`, normalizeStudentProgressRow(rows[i]));
}

// Group rows by course
const rowsByCourse: Record<string, any[]> = {};

for (const row of rows) {
  const normalized = normalizeStudentProgressRow(row);
  const course = normalized.course || "Unknown Course";

  if (!rowsByCourse[course]) {
    rowsByCourse[course] = [];
  }

  rowsByCourse[course].push(normalized);
  
}

// Group students within each course
const studentsByCourse: Record<string, Record<string, any[]>> = {};

for (const course of Object.keys(rowsByCourse)) {
  const courseRows = rowsByCourse[course];

  studentsByCourse[course] = {};

  if (!courseRows) continue;
  for (const row of courseRows) {
    const student = row.student || "Unknown Student";

    if (!studentsByCourse[course][student]) {
      studentsByCourse[course][student] = [];
    }

    studentsByCourse[course][student].push(row);
  }
}

console.log("Courses in studentsByCourse:", Object.keys(studentsByCourse));

for (const course of Object.keys(studentsByCourse)) {
  const bucket = studentsByCourse[course] ?? {};
  const studentNames = Object.keys(bucket);
  console.log(`Course "${course}" has ${studentNames.length} students`);
}
// Build snapshots by course
const snapshotsByCourse: Record<string, any[]> = {};

for (const course of Object.keys(studentsByCourse)) {
  const studentMap = studentsByCourse[course] ?? {};   // always an object
  const snapshots: any[] = [];

  for (const student of Object.keys(studentMap)) {
    const rows = studentMap[student] ?? [];            // always an array
    const snapshot = buildStudentSnapshot(rows);
    if (snapshot) snapshots.push(snapshot);
  }

  snapshotsByCourse[course] = snapshots;
}


for (const course of Object.keys(snapshotsByCourse)) {
  const snapshots = snapshotsByCourse[course];
  const scatter = buildScatterData(snapshots);
  const outliers = detectOutliers(scatter);

  console.log(`Scatter data for ${course}:`, scatter.length, "points");
  console.log(`Outliers for ${course}:`, outliers);
}

  const scatterByCourse: Record<string, any[]> = {};
  const outliersByCourse: Record<string, any[]> = {};

  for (const course of Object.keys(snapshotsByCourse)) {
    const snapshots = snapshotsByCourse[course];
    const scatter = buildScatterData(snapshots);
    const outliers = detectOutliers(scatter);

    scatterByCourse[course] = scatter;
    outliersByCourse[course] = outliers;

    console.log(`Scatter data for ${course}:`, scatter.length, "points");
    console.log(`Outliers for ${course}:`, outliers);
  }
// Build course metadata list with stable IDs
const courses = Object.keys(snapshotsByCourse).map(courseName => ({
  id: Buffer.from(courseName).toString("base64"), // stable, reversible ID
  name: courseName
}));

  return {
    courses,
    snapshotsByCourse,
    scatterByCourse,
    outliersByCourse
  };
}

