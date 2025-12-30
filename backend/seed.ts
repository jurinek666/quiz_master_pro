
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_QUIZZES = [
  {
    name: 'Pub Trivia Night',
    venue: 'The Rusty Anchor',
    date: 'Oct 24',
    month: 'Oct',
    day: '24',
    time: '19:00',
    theme: 'General Knowledge',
    description: 'A classic mid-week trivia session focusing on history, pop culture, and sports.',
    status: 'CONFIRMED',
    slotsOpen: '2/5 Slots Open',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Science & Tech Quiz',
    venue: 'TechHub Lounge',
    date: 'Oct 26',
    month: 'Oct',
    day: '26',
    time: '20:00',
    theme: 'Science Fiction',
    description: 'Deep dives into futuristic tech, classic sci-fi literature, and blockbuster space operas.',
    status: 'CONFIRMED',
    isUserIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Golden Lion Pub',
    venue: 'The Golden Lion Pub',
    date: 'Nov 12',
    month: 'Nov',
    day: '12',
    time: '19:30',
    theme: '80s Music',
    description: 'Test your knowledge of the greatest decade of music.',
    status: 'CONFIRMED',
    isUserIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=400',
  }
];

const TEAM_MEMBERS = [
  {
    name: 'Sarah Lee',
    role: 'Goalkeeper',
    avatar: 'https://i.pravatar.cc/150?u=sarahlee',
    status: 'Active',
    isMe: true,
  },
  {
    name: 'Jane Doe',
    role: 'Team Lead',
    avatar: 'https://i.pravatar.cc/150?u=janedoe',
    status: 'Available',
  },
  {
    name: 'Marcus Johnson',
    role: 'Co-Captain',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    status: 'Away',
  }
];

const NOTIFICATIONS = [
  {
    title: 'Deadline Approaching',
    message: "The sign-up window for the 'Science Trivia' night at TechHub Lounge closes in precisely 2 hours.",
    time: '2m',
    type: 'alert',
    unread: true,
  },
  {
    title: "You're In!",
    message: 'Your spot for the Friday Music Quiz has been officially confirmed.',
    time: '1d',
    type: 'system',
    unread: false,
  }
];

async function main() {
  console.log('Seeding database...');
  
  // Clear existing
  await prisma.quiz.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.notification.deleteMany();

  // Create Quizzes
  for (const q of MOCK_QUIZZES) {
    await prisma.quiz.create({ data: q });
  }

  // Create Team
  for (const t of TEAM_MEMBERS) {
    await prisma.teamMember.create({ data: t });
  }

  // Create Notifications
  for (const n of NOTIFICATIONS) {
    await prisma.notification.create({ data: n });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
