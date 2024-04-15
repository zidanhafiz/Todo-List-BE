import { User, UserSelect } from '@/types/costum';
import { prisma } from '@db/.';

const safeUserSelect = {
  id: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export const createData = async (data: User) => {
  return await prisma.user.create({
    data,
    select: safeUserSelect,
  });
};

export const findMany = async (select?: UserSelect) => {
  select = {
    ...safeUserSelect,
    ...select,
  };
  return await prisma.user.findMany({
    select,
  });
};

export const findById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: safeUserSelect,
  });
};

export const findByRefreshToken = async (refreshToken: string) => {
  return await prisma.user.findFirst({
    where: {
      refreshToken,
    },
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      ...safeUserSelect,
      password: true,
    },
  });
};

export const updateUsername = async (id: string, username: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
    select: safeUserSelect,
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

export const deleteById = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
