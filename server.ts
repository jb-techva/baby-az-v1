import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rsvpHandler from './api/rsvp';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 3000);
const isProd = process.env.NODE_ENV === 'production';
app.use(express.json({ limit: '8kb' }));
app.all('/api/rsvp', (req, res) => { void rsvpHandler(req, res); });
// Responses are read only through the restricted Google Sheet, never the public site.
app.all('/api/rsvp/*', (_req, res) => res.status(404).json({ error: 'Not found.' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => res.sendFile(path.resolve(__dirname, 'dist/index.html')));
  }
  app.listen(PORT, '0.0.0.0');
}
startServer();
