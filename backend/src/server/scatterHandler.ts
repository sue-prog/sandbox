import { Request, Response } from 'express';
import { runAnalyticsPipeline } from "../analytics/pipeline";

// Route now uses courseId instead of courseName
interface ScatterParams {
  courseId: string;
}

export const getScatter = async (
  req: Request<ScatterParams>,
  res: Response
) => {
  console.log("Scatter endpoint hit");

  try {
    const { courseId } = req.params;

    const result = runAnalyticsPipeline();

    // Confirm the pipeline returned courses
//    console.log("Courses from pipeline:", result.courses);

    // Find the course with this ID
    const course = result.courses.find(c => c.id === courseId);

    if (!course) {
      console.log("No course found for ID:", courseId);
      return res.json([]);
    }

    const courseName = course.name;

    const scatter = result.scatterByCourse[courseName] ?? [];

    console.log(`Returning scatter for ${courseName}:`, scatter);

    res.json(scatter);
  } catch (err) {
    console.error("Error in scatter endpoint:", err);
    res.status(500).json({ error: "Failed to generate scatter data" });
  }
};
