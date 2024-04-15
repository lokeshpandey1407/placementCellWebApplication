import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    batch: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: Number },
    email: { type: String },
    college: { type: String },
    jobStatus: { type: String, enum: ["Placed", "Not-placed"] },
    DSAScore: { type: Number, require: true },
    WebDScore: { type: Number, require: true },
    reactScore: { type: Number, require: true },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Interview",
      },
    ],
    results: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Result" },
    ],
  },
  { timeStamp: true }
);

StudentSchema.pre("save", function () {
  this.interviews = [];
  this.results = [];
});

const StudentModel = mongoose.model("Student", StudentSchema);
export default StudentModel;
