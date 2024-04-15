import StudentModel from "./student.schema.js";

export default class StudentRepository {
  async create(studentData) {
    return await new StudentModel(studentData).save();
  }
  async getAll() {
    return await StudentModel.find({});
  }
}
