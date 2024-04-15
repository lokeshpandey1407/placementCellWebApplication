import express from "express";
import InterviewController from "./interview.controller.js";

const InterviewRoute = express.Router();
const interviewController = new InterviewController();

InterviewRoute.post("/", (req, res, next) => {
  interviewController.create(req, res, next);
});

InterviewRoute.get("/", (req, res, next) => {
  interviewController.get(req, res, next);
});

InterviewRoute.get("/:id", (req, res, next) => {
  interviewController.getById(req, res, next);
});

InterviewRoute.put("/:id", (req, res, next) => {
  interviewController.updateStudens(req, res, next);
});

export default InterviewRoute;
