import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', routes);
export default app;
