import express from "express";
import StudentController from "./student.controller.js";

const StudentRoute = express.Router();
const studentController = new StudentController();

StudentRoute.post("/", (req, res, next) => {
  studentController.create(req, res, next);
});

StudentRoute.get("/", (req, res, next) => {
  studentController.getAll(req, res, next);
});
export default StudentRoute;
