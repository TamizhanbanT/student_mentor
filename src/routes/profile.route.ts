import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import { isAuthenticated, isAdmin, isAdminOrMentor } from "../middlewares/auth";

const router = Router();

// Profiles
router.get("/profiles", isAuthenticated, isAdmin, profileController.getAllProfiles);
router.get("/profiles/:id", isAuthenticated, profileController.getProfileById);
router.post("/profiles", isAuthenticated, isAdminOrMentor, profileController.createProfile);
router.put("/profiles/:id", isAuthenticated, profileController.updateProfile);
router.delete("/profiles/:id", isAuthenticated, isAdmin, profileController.deleteProfile);

// Mentors
router.get("/mentors", isAuthenticated, profileController.getAllMentors);
router.get("/mentors/:id", isAuthenticated, profileController.getMentorById);
router.get("/mentors-with-students", isAuthenticated, profileController.getMentorsWithStudents);
router.get("/mentors-without-students", isAuthenticated, profileController.getMentorsWithoutStudents);

// Students
router.get("/students", isAuthenticated, profileController.getAllStudents);
router.get("/students/:id", isAuthenticated, profileController.getStudentById);
router.get("/students-without-mentor", isAuthenticated, profileController.getStudentsWithoutMentor);

router.get("/mentors-with-students-selected", isAuthenticated, profileController.getMentorsWithStudentsSelected);
router.get("/students-with-mentors-selected", isAuthenticated, profileController.getStudentsWithMentorsSelected);
router.get("/mentors-without-students-selected", isAuthenticated, profileController.getMentorsWithoutStudentsSelected);


export default router;
