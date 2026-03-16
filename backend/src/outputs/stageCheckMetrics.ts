export function computeStageCheckMetrics(shaped: any[]) {
  // --- 1. Repeat Rate Metrics ---
  const repeatRateByStage: Record<string, any> = {};

  for (const row of shaped) {
    const stage = row.stage;

    if (!repeatRateByStage[stage]) {
      repeatRateByStage[stage] = {
        stage,
        total: 0,
        repeats: 0,
        repeatRate: 0
      };
    }

    repeatRateByStage[stage].total += 1;

    if (row.attempt > 1) {
      repeatRateByStage[stage].repeats += 1;
    }
  }

  // compute percentages
  for (const stage of Object.values(repeatRateByStage)) {
    stage.repeatRate =
      stage.total > 0 ? stage.repeats / stage.total : 0;
  }

  const repeatRateData = Object.values(repeatRateByStage);


  // --- 2. Grading Consistency Metrics ---
  const gradingByInstructor: Record<string, any> = {};

  for (const row of shaped) {
    const inst = row.checkInstructor || "Unknown";

    if (!gradingByInstructor[inst]) {
      gradingByInstructor[inst] = {
        instructor: inst,
        total: 0,
        passed: 0,
        failed: 0,
        continuation: 0
      };
    }

    gradingByInstructor[inst].total += 1;
    if (row.passed) gradingByInstructor[inst].passed += 1;
    if (row.failed) gradingByInstructor[inst].failed += 1;
    if (row.continuation) gradingByInstructor[inst].continuation += 1;
  }

  const gradingData = Object.values(gradingByInstructor);


  // --- 3. Flights-to-Stage Distribution ---
  const flightsByStage: Record<string, number[]> = {};

  for (const row of shaped) {
    const stage = row.stage;

    if (!flightsByStage[stage]) {
      flightsByStage[stage] = [];
    }

    flightsByStage[stage].push(row.flightsBeforeStage);
  }

  const flightsToStageData = Object.entries(flightsByStage).map(
    ([stage, flights]) => ({
      stage,
      flights
    })
  );


  // --- Return all three datasets ---
  return {
    repeatRateData,
    gradingData,
    flightsToStageData
  };
}
