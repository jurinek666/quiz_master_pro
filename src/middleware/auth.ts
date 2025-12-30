import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';


export interface AuthPayload { sub: string; role: 'user'|'admin'; }


export function requireAuth(req: Request, res: Response, next: NextFunction) {
const hdr = req.headers.authorization;
const token = hdr?.startsWith('Bearer ') ? hdr.slice(7) : undefined;
if (!token) return res.status(401).json({ title: 'Unauthorized' });
try {
const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
(req as any).auth = payload;
next();
} catch {
res.status(401).json({ title: 'Invalid token' });
}
}