import { Request, Response } from "express";
import * as subjectService from "../services/subject.service";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { subjectName } = req.body;

    if (!subjectName) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const subject = await subjectService.createSubject(subjectName);
    res.status(201).json(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSubjects = async (_req: Request, res: Response) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const subject = await subjectService.getSubjectById(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { subjectName } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }
    if (!subjectName) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const updated = await subjectService.updateSubject(id, subjectName);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    await subjectService.deleteSubject(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
