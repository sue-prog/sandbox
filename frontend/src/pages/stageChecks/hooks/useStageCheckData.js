import { useEffect, useState } from "react";

export default function useStageCheckData(courseId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/stage-checks/${courseId}`);
        
        const json = await res.json();
        setData(json);
      } catch (err) {
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
