// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Only admins allowed
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user?.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

// Admin or Mentor allowed (for creating students)
export const isAdminOrMentor = (req: Request, res: Response, next: NextFunction) => {
  const role = (req as any).user?.role;
  if (role !== "admin" && role !== "mentor") {
    return res.status(403).json({ message: "Only admin or mentor allowed" });
  }
  next();
};
