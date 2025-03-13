import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Health check route
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

export default router;
