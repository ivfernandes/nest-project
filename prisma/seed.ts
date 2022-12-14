import { PrismaClient } from '@prisma/client';

const courses = [
  { name: 'Engenharia de Software', code: 'IE17' },
  { name: 'Ciência da Computação', code: 'IE08' },
];

const prisma = new PrismaClient();
async function main() {
  for (const course of courses) {
    const created_course = await prisma.course.upsert({
      create: course,
      update: {},
      where: { code: course.code },
    });
    console.log(`Created: ${created_course}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
