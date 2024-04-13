import { prisma } from '@db/.';

export const findMany = async () => {
  return await prisma.todo.findMany();
};
