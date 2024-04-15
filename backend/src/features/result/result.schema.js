import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Interview",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },

    result: {
      type: String,
      enum: ["Applied", "Pass", "Fail", "On-Hold", "Didn’t Attempt"],
      default: "Applied",
      required: true,
    },
  },
  { timeStamp: true }
);

const ResultModel = mongoose.model("Result", ResultSchema);
export default ResultModel;
