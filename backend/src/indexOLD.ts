import express from 'express';
import routes from '../src/server/routes';

const app = express();
app.use(express.json());

// mount all routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Analytics backend running on port ${PORT}`);
});
