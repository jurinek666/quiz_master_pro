import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middleware/auth.js';
const r = Router();


r.get('/', async (_req, res) => {
const quizzes = await prisma.quiz.findMany({ where: { isPublished: true }, select: { id: true, title: true, description: true } });
res.json({ items: quizzes });
});


r.get('/:id', async (req, res) => {
const q = await prisma.quiz.findUnique({ where: { id: req.params.id }, select: { id: true, title: true, description: true, isPublished: true } });
if (!q || !q.isPublished) return res.status(404).json({ title: 'Not found' });
res.json(q);
});


r.get('/:id/questions', async (req, res) => {
const questions = await prisma.question.findMany({ where: { quizId: req.params.id }, orderBy: { orderIndex: 'asc' }, include: { choices: { select: { id: true, label: true } } } });
res.json({ items: questions });
});


export default r;