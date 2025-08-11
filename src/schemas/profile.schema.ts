// src/schemas/profile.schema.ts
import { z } from "zod";

export const createStudentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  studentName: z.string().min(1),
  parentName: z.string().optional(),
  parentPhone: z
    .union([z.string(), z.number(), z.bigint()])
    .optional()
    .transform((val) => (val !== undefined ? BigInt(val) : undefined)),
  address: z.string().optional(),
  pincode: z.number().optional(),
  class: z.number().optional(),
  fees: z.number().optional(),
  marks: z.number().optional(),
  todaysUpdate: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const createMentorSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  mentorName: z.string().min(1),
  mentorphone: z
    .union([z.string(), z.number(), z.bigint()])
    .optional()
    .transform((val) => (val !== undefined ? BigInt(val) : undefined)),
  class: z.number().optional(),
  todaysUpdate: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type CreateMentorInput = z.infer<typeof createMentorSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
