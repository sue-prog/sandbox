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
        incomplete: 0,
        continuation: 0
      };
    }

    gradingByInstructor[inst].total += 1;
    if (row.passed) gradingByInstructor[inst].passed += 1;
    if (row.failed) gradingByInstructor[inst].failed += 1;
    if (row.incomplete) gradingByInstructor[inst].incomplete += 1;
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

  // --- 4. Premature Signoff Metrics ---
  const prematureByInstructor: Record<string, any> = {};

  for (const row of shaped) {
    const inst = row.primaryInstructor || "Unknown";

    if (!prematureByInstructor[inst]) {
      prematureByInstructor[inst] = {
        instructor: inst,
        recommended: 0,
        passed: 0,
        failed: 0,
        incomplete: 0,
        continuation: 0,
        prematureRate: 0
      };
    }

    prematureByInstructor[inst].recommended += 1;
    if (row.failed) prematureByInstructor[inst].failed += 1;
    if (row.passed) prematureByInstructor[inst].passed += 1;
    if (row.incomplete) prematureByInstructor[inst].incomplete += 1;
    if (row.continuation) prematureByInstructor[inst].continuation += 1;
  }

  // compute percentages
  for (const inst of Object.values(prematureByInstructor)) {
    const nonPass =
      inst.failed +
      inst.incomplete +
      (inst.continuation || 0);

    inst.prematureRate =
    inst.recommended > 0 ? nonPass / inst.recommended : 0;
  }

  const prematureSignoffData = Object.values(prematureByInstructor);

  // --- 5. Lesson Friction Metrics ---
const lessonFriction: Record<string, any> = {};

for (const row of shaped) {
  const lesson = row.lessonName || "Unknown";

  if (!lessonFriction[lesson]) {
    lessonFriction[lesson] = {
      lesson,
      total: 0,
      passed: 0,
      failed: 0,
      incomplete: 0,
      continuation: 0,
      attempts: []
    };
  }

  lessonFriction[lesson].total += 1;

  if (row.passed) lessonFriction[lesson].passed += 1;
  if (row.failed) lessonFriction[lesson].failed += 1;
  if (row.incomplete) lessonFriction[lesson].incomplete += 1;
  if (row.continuation) lessonFriction[lesson].continuation += 1;

  lessonFriction[lesson].attempts.push(row.attempt);
}

const lessonFrictionData = Object.values(lessonFriction).map(l => ({
  ...l,
  avgAttempts:
    l.attempts.length > 0
      ? l.attempts.reduce((a, b) => a + b, 0) / l.attempts.length
      : 1
}));


  // --- Return all three datasets ---
  return {
    repeatRateData,
    gradingData,
    flightsToStageData,
    prematureSignoffData, 
    lessonFrictionData
  };
}
