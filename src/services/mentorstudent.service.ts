
import { prisma } from "../config/prisma";

export const createAssignment = async (mentorId: number, studentId: number) => {
  // Validate mentor exists and role is "mentor"
  const mentor = await prisma.profile.findUnique({
    where: { id: mentorId },
  });
  if (!mentor || mentor.role !== "mentor") {
    throw new Error("Invalid mentor ID or role");
  }

  // Validate student exists and role is "student"
  const student = await prisma.profile.findUnique({
    where: { id: studentId },
  });
  if (!student || student.role !== "student") {
    throw new Error("Invalid student ID or role");
  }

  // Create new assignment
  return await prisma.mentorStudent.create({
    data: { mentorId, studentId },
  });
};

export const getAllAssignments = async () => {
  return await prisma.mentorStudent.findMany({
    include: { mentor: true, student: true },
  });
};

export const getAssignmentByIds = async (mentorId: number, studentId: number) => {
  return await prisma.mentorStudent.findUnique({
    where: { mentorId_studentId: { mentorId, studentId } },
    include: { mentor: true, student: true },
  });
};

// Update an existing assignment 
export const updateAssignment = async (
  oldMentorId: number,
  oldStudentId: number,
  newMentorId: number,
  newStudentId: number
) => {
  // Validate new mentor
  const mentor = await prisma.profile.findUnique({
    where: { id: newMentorId },
  });
  if (!mentor || mentor.role !== "mentor") {
    throw new Error("Invalid new mentor ID or role");
  }

  // Validate new student
  const student = await prisma.profile.findUnique({
    where: { id: newStudentId },
  });
  if (!student || student.role !== "student") {
    throw new Error("Invalid new student ID or role");
  }

  return await prisma.mentorStudent.update({
    where: {
      mentorId_studentId: { mentorId: oldMentorId, studentId: oldStudentId },
    },
    data: { mentorId: newMentorId, studentId: newStudentId },
  });
};

// Delete assignment 
export const deleteAssignment = async (mentorId: number, studentId: number) => {
  return await prisma.mentorStudent.delete({
    where: { mentorId_studentId: { mentorId, studentId } },
  });
};
