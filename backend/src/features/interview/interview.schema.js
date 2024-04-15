import { timeStamp } from "console";
import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    jobProfile: { type: String, required: true },
    location: { type: String, required: true },
    skills: [{ type: String }],
    interviewDate: { type: String, required: true },
    students: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student" },
    ],
  },
  { timeStamp: true }
);

InterviewSchema.pre("save", function () {
  this.students = [];
});

const InterviewModel = mongoose.model("Interview", InterviewSchema);
export default InterviewModel;
