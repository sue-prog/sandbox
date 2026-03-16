import { useEffect, useState } from "react";

export function useStageCheckData(courseId: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/stage-checks/${courseId}`);
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [courseId]);

  return {
    loading,
    error,
    courseName: data?.courseName,
    repeatRateData: data?.repeatRateData || [],
    gradingData: data?.gradingData || [],
    flightsToStageData: data?.flightsToStageData || []
  };
}
