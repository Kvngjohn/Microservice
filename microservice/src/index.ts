import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables from .env if present
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Health-check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: Date.now(),
  });
});

// Echo endpoint (POST /echo)
app.post('/echo', (req: Request, res: Response) => {
  res.status(200).json({
    youSent: req.body,
  });
});

// 404 handler (for any other route)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler (catch both sync & async errors)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Only start listening if this file is run directly (not imported by Jest)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export the app for Jest/Supertest
export default app;
