import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';
import { z } from 'zod';


const r = Router();


r.post('/register', async (req, res) => {
const body = z.object({ email: z.string().email(), password: z.string().min(8), displayName: z.string().min(1) }).parse(req.body);
const hash = await bcrypt.hash(body.password, 12);
const user = await prisma.user.create({ data: { email: body.email.toLowerCase(), passwordHash: hash, displayName: body.displayName } });
res.status(201).json({ id: user.id });
});


function signAccess(u: { id: string; role: string }) {
return jwt.sign({ sub: u.id, role: u.role }, env.jwtSecret, { expiresIn: env.accessTtl });
}
function signRefresh(u: { id: string; role: string }) {
return jwt.sign({ sub: u.id, role: u.role, typ: 'refresh' }, env.jwtSecret, { expiresIn: env.refreshTtl });
}


r.post('/login', async (req, res) => {
const body = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
const user = await prisma.user.findUnique({ where: { email: body.email.toLowerCase() } });
if (!user) return res.status(401).json({ title: 'Invalid credentials' });
const ok = await bcrypt.compare(body.password, user.passwordHash);
if (!ok) return res.status(401).json({ title: 'Invalid credentials' });
const accessToken = signAccess(user);
const refreshToken = signRefresh(user);
res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', path: '/api/auth/refresh', maxAge: 7*24*3600*1000 } as any);
res.json({ accessToken });
});


r.post('/refresh', async (req, res) => {
const token = req.cookies?.refreshToken;
if (!token) return res.status(401).json({ title: 'Missing refresh token' });
try {
const payload = jwt.verify(token, env.jwtSecret) as any;
if (payload.typ !== 'refresh') return res.status(401).json({ title: 'Invalid token' });
const user = await prisma.user.findUnique({ where: { id: payload.sub } });
if (!user) return res.status(401).json({ title: 'Unknown user' });
const accessToken = signAccess(user);
res.json({ accessToken });
} catch {
res.status(401).json({ title: 'Invalid token' });
}
});


export default r;