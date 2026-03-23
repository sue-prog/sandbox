import { useEffect, useState } from "react";

type StageCheckHookResult = {
  loading: boolean;
  error: string | null;
  courseName: string | undefined;
  repeatRateData: any[];
  gradingData: any[];
  flightsToStageData: any[];
  lessonFrictionData: any[];
};

export function useStageCheckData(
  courseId: string,
  shapedData: any
): StageCheckHookResult {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const decoded = decodeURIComponent(courseId);
    const course = shapedData?.[decoded];

    setData({
      courseName: decoded,
      repeatRateData: course?.stageChecks || [],
      gradingData: course?.stageChecks || [],
      flightsToStageData: course?.stageChecks || [],
      lessonFrictionData: course?.stageChecks || []
    });

    setLoading(false);
  }, [courseId, shapedData]);

  return {
    loading,
    error,
    courseName: data?.courseName,
    repeatRateData: data?.repeatRateData || [],
    gradingData: data?.gradingData || [],
    flightsToStageData: data?.flightsToStageData || [],
    lessonFrictionData: data?.lessonFrictionData || []
  };
}
