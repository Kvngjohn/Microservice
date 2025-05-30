import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Basic health-check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// Example “echo” POST endpoint
app.post('/echo', (req: Request, res: Response) => {
  res.json({ youSent: req.body });
});

app.get('/hello/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

app.get('/message', (_req: Request, res: Response) => {
  res.json({ message: process.env.MESSAGE || 'Default message' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;