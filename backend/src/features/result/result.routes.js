import express from "express";
import ResultController from "./result.controller.js";

const ResultRoute = express.Router();
const resultController = new ResultController();

ResultRoute.get("/all/:interviewId", (req, res, next) => {
  resultController.getAllByInterviewId(req, res, next);
});

ResultRoute.put("/:id", (req, res, next) => {
  resultController.updateResult(req, res, next);
});

ResultRoute.get("/all", (req, res, next) => {
  resultController.getAll(req, res, next);
});

ResultRoute.get("/csv", (req, res, next) => {
  resultController.getCSV(req, res, next);
});
export default ResultRoute;
