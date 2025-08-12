import { Router } from "express";
import * as mentorStudentController from "../controllers/mentorstudent.controller";
import { isAuthenticated, isAdminOrMentor, isAdmin } from "../middlewares/auth";

const router = Router();

// Create new assignment
router.post("/", isAuthenticated, isAdminOrMentor, mentorStudentController.createAssignment);

// Get all assignments
router.get("/", isAuthenticated, mentorStudentController.getAllAssignments);

// Get a specific assignment by mentorId and studentId
router.get("/:mentorId/:studentId", isAuthenticated, mentorStudentController.getAssignmentByIds);

// Update an assignment by mentorId and studentId
router.put("/:mentorId/:studentId", isAuthenticated, isAdminOrMentor, mentorStudentController.updateAssignment);

// Delete an assignment by mentorId and studentId
router.delete("/:mentorId/:studentId", isAuthenticated, isAdmin, mentorStudentController.deleteAssignment);

export default router;
