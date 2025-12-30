// @ts-ignore
const { PrismaClient } = require('@prisma/client');
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();


async function main() {
const admin = await prisma.user.upsert({
where: { email: 'admin@example.com' },
update: {},
create: { email: 'admin@example.com', passwordHash: await bcrypt.hash('ChangeMe123!', 12), displayName: 'Admin', role: 'admin' }
});
const quiz = await prisma.quiz.create({ data: { title: 'MVP Quiz', description: 'Ukázkový', isPublished: true, createdBy: admin.id } });
const q1 = await prisma.question.create({ data: { quizId: quiz.id, body: '2+2=?', questionType: 'single_choice', orderIndex: 1, points: 1 } });
await prisma.choice.createMany({ data: [
{ questionId: q1.id, label: '3', isCorrect: false },
{ questionId: q1.id, label: '4', isCorrect: true }
]});
}


main().finally(()=>prisma.$disconnect());