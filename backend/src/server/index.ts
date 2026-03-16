import express from 'express';
import cors from 'cors';

import routes from './routes';
import { registerStageCheckRoutes } from "./routes";

const app = express();

//  CORS MUST COME FIRST
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

//  THEN register your API routes
registerStageCheckRoutes(app);

//  THEN mount your other routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Analytics backend running on port ${PORT}`);
});
