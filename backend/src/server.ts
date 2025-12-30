import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

app.use(cors());
// Cast middleware to any to resolve TypeScript overload mismatch with express types
app.use(express.json() as any);

// Health check
app.get('/api/health', (req, res) => res.send('OK'));

// --- Quizzes ---
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({ orderBy: { day: 'asc' } });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

app.post('/api/quizzes/:id/attendance', async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id } });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    await prisma.quiz.update({
      where: { id },
      data: { isUserIn: !quiz.isUserIn }
    });

    const updatedQuizzes = await prisma.quiz.findMany({ orderBy: { day: 'asc' } });
    res.json(updatedQuizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

// --- Team ---
app.get('/api/team', async (req, res) => {
  try {
    const team = await prisma.teamMember.findMany();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

app.patch('/api/user/profile', async (req, res) => {
  try {
    // Assuming single user "me" for demo
    const me = await prisma.teamMember.findFirst({ where: { isMe: true } });
    if (me) {
      const updated = await prisma.teamMember.update({
        where: { id: me.id },
        data: req.body,
      });
      res.json(updated);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// --- Notifications ---
app.get('/api/notifications', async (req, res) => {
  try {
    const notifs = await prisma.notification.findMany();
    res.json(notifs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});