"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
// Middleware
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Basic health-check route
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});
// Example “echo” POST endpoint
app.post('/echo', (req, res) => {
    res.json({ youSent: req.body });
});
app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    res.json({ message: `Hello, ${name}!` });
});
app.get('/message', (_req, res) => {
    res.json({ message: process.env.MESSAGE || 'Default message' });
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
exports.default = app;
