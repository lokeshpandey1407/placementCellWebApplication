import ResultModel from "./result.schema.js";

export default class ResultRepository {
  async create(data) {
    return await new ResultModel(data).save();
  }
  async findAllByInterview(id) {
    return await ResultModel.find({ interview: id }).populate("student");
  }
  async findOne(data) {
    return await ResultModel.findOne({ data });
  }
  async find() {
    return await ResultModel.find({})
      .populate({
        path: "student",
        select: "name college jobStatus DSAScore WebDScore reactScore",
      })
      .populate({ path: "interview", select: "companyName interviewDate" });
  }
  async updateOne(id, data) {
    return await ResultModel.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("student");
  }
}
