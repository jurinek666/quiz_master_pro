import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import { env } from './env.js';
import health from './routes/health.js';
import auth from './routes/auth.js';
import users from './routes/users.js';
// import teams from './routes/teams.js';
import quizzes from './routes/quizzes.js';
import attempts from './routes/attempts.js';
import { errorHandler } from './middleware/error.js';


export function createApp() {
const app = express();
app.disable('x-powered-by');
// Fix: Cast helmet middleware to any to match app.use signature
app.use(helmet() as any);
// Fix: Cast cors middleware to any to match app.use signature
app.use(cors({ origin: env.corsOrigin, credentials: true }) as any);
app.use(express.json({ limit: '1mb' }) as any);
app.use(cookieParser() as any);
app.use(pinoHttp() as any);
app.use('/api/health', health);
app.use('/api/auth', rateLimit({ windowMs: 60_000, max: 20 }) as any, auth);
app.use('/api/users', users);
// app.use('/api/teams', teams);
app.use('/api/quizzes', quizzes);
app.use('/api/attempts', attempts);
app.use(errorHandler as any);
return app;
}