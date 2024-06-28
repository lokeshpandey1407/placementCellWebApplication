import ApplicationError from "../../middleware/handleError.middleware.js";
import InterviewRepository from "./interview.repository.js";

export default class InterviewController {
  constructor() {
    this.interviewRepository = new InterviewRepository();
  }
  async create(req, res, next) {
    try {
      const interview = await this.interviewRepository.create(req.body);
      if (!interview) {
        throw new ApplicationError("Cannot create Interview", 400);
      } else {
        res.status(201).json({
          success: true,
          message: "Interview created successfully",
          data: interview,
        });
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const interview = await this.interviewRepository.getById(id);
      if (!interview) {
        throw new ApplicationError(
          "Interview not found with the given Id",
          404
        );
      } else {
        res.status(200).json({
          success: true,
          message: "",
          data: interview,
        });
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async get(req, res, next) {
    try {
      const interviews = await this.interviewRepository.get();
      res.status(200).json({
        success: true,
        message: "",
        data: interviews,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateStudens(req, res, next) {
    try {
      const { id } = req.params;
      const { student, resultStatus } = req.body;
      const interview = await this.interviewRepository.updateStudents(
        id,
        student,
        resultStatus
      );
      if (!interview) {
        throw new ApplicationError("Cannot update Interview", 400);
      } else {
        res.status(201).json({
          success: true,
          message: "Student assigned successfully",
          data: interview,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateResult(req, res, next) {}
}
