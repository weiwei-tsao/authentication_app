import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // Updated client URL
    credentials: true, // Allow credentials (cookies)
  })
);

// Routes
app.use('/', routes);
export default app;
