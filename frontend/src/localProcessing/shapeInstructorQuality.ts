// src/localProcessing/shapeInstructorQuality.ts

export interface StageCheckRow {
  primaryInstructor?: string;
  failed?: boolean;
}

export interface InstructorQualityRow {
  instructor: string;
  prematureRate: number;
}

export function shapeInstructorPrematureSignoff(
  stageChecks: StageCheckRow[]
): InstructorQualityRow[] {
  const byInstructor: Record<
    string,
    { total: number; premature: number }
  > = {};

  for (const row of stageChecks) {
    const inst = row.primaryInstructor || "Unknown";

    if (!byInstructor[inst]) {
      byInstructor[inst] = { total: 0, premature: 0 };
    }

    byInstructor[inst].total++;

    if (row.failed) {
      byInstructor[inst].premature++;
    }
  }

  return Object.entries(byInstructor).map(([instructor, stats]) => ({
    instructor,
    prematureRate:
      stats.total > 0 ? stats.premature / stats.total : 0
  }));
}
