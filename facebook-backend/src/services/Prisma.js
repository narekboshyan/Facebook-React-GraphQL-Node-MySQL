import PClient from '@prisma/client';

const { PrismaClient } = PClient;
const prisma = new PrismaClient();
// eslint-disable-next-line
console.log(`prisma previewFeatures  ${prisma._engine?.previewFeatures}`);
// eslint-disable-next-line
console.log(`prisma clientVersion ${prisma._engine?.clientVersion}`);
export { prisma };
