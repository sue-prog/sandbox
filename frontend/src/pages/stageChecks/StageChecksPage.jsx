import { useParams } from "react-router-dom";
import RepeatRateChart from "./RepeatRateChart";
import GradingConsistencyChart from "./GradingConsistencyChart";
import FlightsToStageChart from "./FlightsToStageChart";
import useStageCheckData from "./hooks/useStageCheckData";
import LessonFrictionChart from "./LessonFrictionChart";


export default function StageChecksPage() {
  // 1. ALL HOOKS MUST BE AT THE TOP, ALWAYS IN THE SAME ORDER
  const { courseId } = useParams();
  const {
    loading,
    error,
    courseName,
    repeatRateData,
    gradingData,
    flightsToStageData,
    lessonFrictionData
  } = useStageCheckData(courseId);

  // 2. CONDITIONAL RETURNS ARE OK *AFTER* ALL HOOKS
  if (loading) return <div>Loading stage‑check analytics…</div>;
  if (error) return <div>Error: {error}</div>;

  // 3. NEVER put hooks or console.logs inside JSX
  return (
    <div>
      <h1>Stage Check Analytics — {courseName}</h1>

      <RepeatRateChart data={repeatRateData} />
      <GradingConsistencyChart data={gradingData} />
      <FlightsToStageChart data={flightsToStageData} />
      <LessonFrictionChart data={lessonFrictionData} />

    </div>
  );
}
