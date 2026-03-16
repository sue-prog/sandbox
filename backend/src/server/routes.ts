import { Router } from 'express';
import { getScatter } from './scatterHandler';
import { courseMap } from "../courseMap";
import { loadStageChecks } from "../loaders/loadStageChecks";
import { shapeStageCheckData } from "../preprocessing/shapeStageCheckData";
import { computeStageCheckMetrics } from "../outputs/stageCheckMetrics";

const router = Router();

router.get('/scatter/:courseId', getScatter);

export default router;

export function registerStageCheckRoutes(app: any) {
  app.get("/api/stage-checks/:courseId", (req: any, res: any) => {
    const courseId = req.params.courseId;
    const courseName = courseMap[courseId];

    if (!courseName) {
      return res.status(404).json({
        error: `Unknown courseId: ${courseId}`
      });
    }

    // Load raw CSV rows
    const raw = loadStageChecks();

    // Shape the data for this course
    const shaped = shapeStageCheckData(raw, courseName);

    // Compute analytics
    const metrics = computeStageCheckMetrics(shaped);

    // Return everything to the frontend
    res.json({
      courseId,
      courseName,
      ...metrics
    });
  });
}

