// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { createStudentSchema, createMentorSchema, loginSchema } from "../schemas/profile.schema";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const parsed = createStudentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues});
    }
    const student = await authService.registerStudent(parsed.data);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Internal server error" });
  }
};

export const registerMentor = async (req: Request, res: Response) => {
  try {
    const parsed = createMentorSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    const mentor = await authService.registerMentor(parsed.data);
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    const { token } = await authService.login(parsed.data.email, parsed.data.password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message || "Invalid credentials" });
  }
};