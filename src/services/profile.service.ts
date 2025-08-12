import { prisma } from "../config/prisma";

// Get all profiles
export const getAllProfiles = async () => {
  try {
    return await prisma.profile.findMany();
  } catch (error: any) {
    throw new Error(`Error fetching profiles: ${error.message}`);
  }
};

// Get profile by ID
export const getProfileById = async (id: number) => {
  try {
    return await prisma.profile.findUnique({ where: { id } });
  } catch (error: any) {
    throw new Error(`Error fetching profile by ID ${id}: ${error.message}`);
  }
};

// Create new profile
export const createProfile = async (data: any) => {
  try {
    return await prisma.profile.create({ data });
  } catch (error: any) {
    throw new Error(`Error creating profile: ${error.message}`);
  }
};

// Update profile
export const updateProfile = async (id: number, data: any) => {
  try {
    return await prisma.profile.update({ where: { id }, data });
  } catch (error: any) {
    throw new Error(`Error updating profile with ID ${id}: ${error.message}`);
  }
};

// Delete profile
export const deleteProfile = async (id: number) => {
  try {
    return await prisma.profile.delete({ where: { id } });
  } catch (error: any) {
    throw new Error(`Error deleting profile with ID ${id}: ${error.message}`);
  }
};

// Role-specific fetches
export const getAllMentors = async () => {
  try {
    return await prisma.profile.findMany({ where: { role: "mentor" } });
  } catch (error: any) {
    throw new Error(`Error fetching mentors: ${error.message}`);
  }
};

export const getMentorById = async (id: number) => {
  try {
    return await prisma.profile.findUnique({
      where: { id, role: "mentor" }
    });
  } catch (error: any) {
    throw new Error(`Error fetching mentor by ID ${id}: ${error.message}`);
  }
};

export const getMentorsWithStudents = async () => {
  try {
    return await prisma.profile.findMany({
      where: { role: "mentor" },
      include: { students: { include: { student: true } } }
    });
  } catch (error: any) {
    throw new Error(`Error fetching mentors with students: ${error.message}`);
  }
};

export const getMentorsWithoutStudents = async () => {
  try {
    return await prisma.profile.findMany({
      where: { role: "mentor", students: { none: {} } }
    });
  } catch (error: any) {
    throw new Error(`Error fetching mentors without students: ${error.message}`);
  }
};

export const getAllStudents = async () => {
  try {
    return await prisma.profile.findMany({ where: { role: "student" } });
  } catch (error: any) {
    throw new Error(`Error fetching students: ${error.message}`);
  }
};

export const getStudentById = async (id: number) => {
  try {
    return await prisma.profile.findUnique({
      where: { id, role: "student" }
    });
  } catch (error: any) {
    throw new Error(`Error fetching student by ID ${id}: ${error.message}`);
  }
};

export const getStudentsWithoutMentor = async () => {
  try {
    return await prisma.profile.findMany({
      where: { role: "student", mentors: { none: {} } }
    });
  } catch (error: any) {
    throw new Error(`Error fetching students without mentor: ${error.message}`);
  }
};
