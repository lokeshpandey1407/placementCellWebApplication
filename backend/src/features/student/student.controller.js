import ApplicationError from "../../middleware/handleError.middleware.js";
import StudentRepository from "./student.repository.js";

export default class StudentController {
  constructor() {
    this.studentRepository = new StudentRepository();
  }
  async create(req, res, next) {
    try {
      const student = await this.studentRepository.create(req.body);
      if (!student) {
        throw new ApplicationError("Cannot create Student", 500);
      } else {
        res.status(201).json({
          success: true,
          message: "Successfully created student record",
          data: student,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const student = await this.studentRepository.getAll();
      res.status(201).json({
        success: true,
        message: "",
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }
}
