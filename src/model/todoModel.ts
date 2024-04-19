import { Todo } from '@/types/costum';
import { prisma } from '@db/.';

export const findMany = async () => {
  return await prisma.todo.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
};

export const findById = async (id: string) => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
};

export const insertData = async (data: Todo, authorId: string) => {
  return await prisma.todo.create({
    data: {
      ...data,
      authorId,
    },
  });
};

export const updateData = async (id: string, data: Todo) => {
  return await prisma.todo.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteData = async (id: string) => {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
};
