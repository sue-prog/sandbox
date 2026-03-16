import fs from "fs";
import path from "path";
import Papa from "papaparse";

export function loadStageChecks() {
  const filePath = path.join(__dirname, "../../data/stagechecks.csv");
  const file = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    dynamicTyping: false, // keep raw strings for shaping step
    skipEmptyLines: true,
  });

  return parsed.data;
}
