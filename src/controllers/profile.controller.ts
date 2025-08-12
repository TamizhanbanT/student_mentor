
import { Request, Response } from "express";
import * as profileService from "../services/profile.service";

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.status(200).json(profiles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getProfileById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const profile = await profileService.getProfileById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const createProfile = async (req: Request, res: Response) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json({ message: "Profile created successfully", data: newProfile });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedProfile = await profileService.updateProfile(id, req.body);
    res.status(200).json({ message: "Profile updated successfully", data: updatedProfile });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await profileService.deleteProfile(id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMentors = async (req: Request, res: Response) => {
  try {
    const mentors = await profileService.getAllMentors();
    res.status(200).json(mentors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMentorById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const mentor = await profileService.getMentorById(id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json(mentor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMentorsWithStudents = async (req: Request, res: Response) => {
  try {
    const data = await profileService.getMentorsWithStudents();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMentorsWithoutStudents = async (req: Request, res: Response) => {
  try {
    const data = await profileService.getMentorsWithoutStudents();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await profileService.getAllStudents();
    res.status(200).json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const student = await profileService.getStudentById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentsWithoutMentor = async (req: Request, res: Response) => {
  try {
    const students = await profileService.getStudentsWithoutMentor();
    res.status(200).json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
