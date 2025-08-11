// src/services/auth.service.ts
import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateStudentInput, CreateMentorInput } from "../schemas/profile.schema";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register a student - role fixed to 'student'
export const registerStudent = async (data: CreateStudentInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.profile.create({
    data: {
      email: data.email,
      password: hashedPassword,
      studentName: data.studentName,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      address: data.address,
      pincode: data.pincode,
      class: data.class,
      fees: data.fees,
      marks: data.marks,
      todaysUpdate: data.todaysUpdate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy || "system",
      role: "student",
    },
  });
};

// Register a mentor - role fixed to 'mentor'
export const registerMentor = async (data: CreateMentorInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.profile.create({
    data: {
      email: data.email,
      password: hashedPassword,
      mentorName: data.mentorName,
      mentorphone: data.mentorphone,
      class: data.class,
      todaysUpdate: data.todaysUpdate,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy || "system",
      role: "mentor",
    },
  });
};

// Login returns JWT token if credentials valid
export const login = async (email: string, password: string) => {
  const user = await prisma.profile.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};
