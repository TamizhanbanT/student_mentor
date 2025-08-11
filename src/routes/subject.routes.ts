import { Router } from "express";
import * as subjectController from "../controllers/subject.controller";

const router = Router();

router.post("/", subjectController.createSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);
router.put("/:id", subjectController.updateSubject);
router.delete("/:id", subjectController.deleteSubject);

export default router;
