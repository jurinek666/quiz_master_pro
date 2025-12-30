// @ts-ignore
const { PrismaClient } = require('@prisma/client');
export const prisma = new PrismaClient({
log: ['error', 'warn']
});