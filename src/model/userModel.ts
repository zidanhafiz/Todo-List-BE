import { User, UserSelect } from '@/types/costum';
import { prisma } from '@db/.';

export const createData = async (data: User) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findMany = async (select?: UserSelect) => {
  select = {
    id: true,
    username: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    ...select,
  };
  return await prisma.user.findMany({
    select,
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const updateRefreshToken = async (id: string, refreshToken: string | null) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      refreshToken,
    },
  });
};
