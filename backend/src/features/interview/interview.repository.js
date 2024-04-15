import InterviewModel from "./interview.schema.js";
import StudentModel from "../student/student.schema.js";
import ResultRepository from "../result/result.repository.js";
import ApplicationError from "../../middleware/handleError.middleware.js";

export default class InterviewRepository {
  constructor() {
    this.ResultRepository = new ResultRepository();
  }
  async create(interviewData) {
    return await new InterviewModel(interviewData).save();
  }
  async getById(id) {
    return await InterviewModel.findById(id).populate("students");
  }
  async get() {
    return await InterviewModel.find({});
  }
  async updateStudents(id, student, resultStatus) {
    const foundInterview = await this.ResultRepository.findOne({
      interview: id,
      student: student,
    });
    if (foundInterview) {
      throw new ApplicationError("Student already assigned to interview", 500);
    }
    const interview = await InterviewModel.findByIdAndUpdate(
      id,
      {
        $push: { students: student },
      },
      { new: true }
    ).populate("students");
    const result = await this.ResultRepository.create({
      interview: id,
      student: student,
      result: resultStatus,
    });
    await StudentModel.findByIdAndUpdate(student, {
      $push: { interviews: interview._id, results: result._id },
    });

    return interview;
  }
}
