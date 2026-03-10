import express from 'express';
import routes from './routes';

const app = express();
import cors from 'cors';
app.use(cors());

app.use(express.json());

// mount all routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Analytics backend running on port ${PORT}`);
});
