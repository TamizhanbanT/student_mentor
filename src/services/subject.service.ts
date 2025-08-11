
import { prisma } from "../config/prisma";

export const createSubject = async (subjectName: string) => {
  return await prisma.subject.create({
    data: { subjectName },
  });
};

export const getAllSubjects = async () => {
  return await prisma.subject.findMany();
};

export const getSubjectById = async (id: number) => {
  return await prisma.subject.findUnique({
    where: { id },
    include: {
      profiles: true, 
    },
  });
};

export const updateSubject = async (id: number, subjectName: string) => {
  return await prisma.subject.update({
    where: { id },
    data: { subjectName },
  });
};

export const deleteSubject = async (id: number) => {
  return await prisma.subject.delete({
    where: { id },
  });
};
