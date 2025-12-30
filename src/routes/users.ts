import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { z } from 'zod';
const r = Router();


r.get('/me', requireAuth, async (req, res) => {
const user = await prisma.user.findUnique({ where: { id: (req as any).auth.sub }, select: { id: true, email: true, displayName: true, role: true } });
res.json(user);
});


r.patch('/me', requireAuth, async (req, res) => {
const body = z.object({ displayName: z.string().min(1).optional() }).parse(req.body);
const user = await prisma.user.update({ where: { id: (req as any).auth.sub }, data: body, select: { id: true, email: true, displayName: true, role: true } });
res.json(user);
});


export default r;