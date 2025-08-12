import { Request, Response } from "express";
import * as mentorStudentService from "../services/mentorstudent.service";

// Create assignment
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const { mentorId, studentId } = req.body;
    const assignment = await mentorStudentService.createAssignment(Number(mentorId), Number(studentId));
    res.status(201).json({ message: "Mentor assigned to student successfully", assignment });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to assign mentor to student" });
  }
};

// Get all assignments
export const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await mentorStudentService.getAllAssignments();
    res.status(200).json(assignments);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch assignments" });
  }
};

// Get assignment by composite keys
export const getAssignmentByIds = async (req: Request, res: Response) => {
  try {
    const mentorId = Number(req.params.mentorId);
    const studentId = Number(req.params.studentId);
    const assignment = await mentorStudentService.getAssignmentByIds(mentorId, studentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.status(200).json(assignment);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch assignment" });
  }
};

// Update assignment by composite keys
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const oldMentorId = Number(req.params.mentorId);
    const oldStudentId = Number(req.params.studentId);
    const { newMentorId, newStudentId } = req.body;
    const updated = await mentorStudentService.updateAssignment(
      oldMentorId,
      oldStudentId,
      Number(newMentorId),
      Number(newStudentId)
    );
    res.status(200).json({ message: "Assignment updated successfully", updated });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to update assignment" });
  }
};

// Delete assignment by composite keys
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const mentorId = Number(req.params.mentorId);
    const studentId = Number(req.params.studentId);
    await mentorStudentService.deleteAssignment(mentorId, studentId);
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to delete assignment" });
  }
};
