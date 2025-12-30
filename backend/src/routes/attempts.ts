import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middleware/auth.js';
const r = Router();


r.post('/', requireAuth, async (req, res) => {
const { quizId } = req.body as { quizId: string };
const attempt = await prisma.attempt.upsert({
where: { quizId_userId: { quizId, userId: (req as any).auth.sub } },
update: {},
create: { quizId, userId: (req as any).auth.sub }
});
res.status(201).json({ id: attempt.id });
});


r.patch('/:id', requireAuth, async (req, res) => {
const { questionId, answerText, choiceIds } = req.body as any;
await prisma.attemptAnswer.upsert({
where: { attemptId_questionId: { attemptId: req.params.id, questionId } },
update: { answerText, choiceIds },
create: { attemptId: req.params.id, questionId, answerText, choiceIds }
});
res.json({ ok: true });
});


r.post('/:id/submit', requireAuth, async (req, res) => {
const attempt = await prisma.attempt.findUnique({ where: { id: req.params.id }, include: { quiz: { include: { questions: { include: { choices: true } } } }, answers: true } });
if (!attempt) return res.status(404).json({ title: 'Not found' });
// jednoduché skórování
let score = 0; let max = 0;
for (const q of attempt.quiz.questions) {
max += q.points;
const ans = attempt.answers.find(a => a.questionId === q.id);
if (!ans) continue;
if (q.questionType === 'text') {
// MVP: bez automatického hodnocení textu
} else {
const correct = q.choices.filter(c => c.isCorrect).map(c => c.id).sort().join(',');
const given = (ans.choiceIds ?? []).slice().sort().join(',');
if (correct && correct === given) score += q.points;
}
}
await prisma.attempt.update({ where: { id: req.params.id }, data: { score, submittedAt: new Date() } });
res.json({ score, maxScore: max });
});


r.get('/:id', requireAuth, async (req, res) => {
const a = await prisma.attempt.findUnique({ where: { id: req.params.id }, select: { id: true, score: true, submittedAt: true } });
res.json(a);
});


export default r;