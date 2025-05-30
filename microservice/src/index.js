import 'dotenv/config';
import express from 'express';
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
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});
// Example “echo” POST endpoint
app.post('/echo', (req, res) => {
    res.json({ youSent: req.body });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Error handler
app.use((err, _req, res, _next) => {
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
