import express from "express";
import cors from "cors";
import { errorHandler } from "./src/middleware/handleError.middleware.js";
import StudentRoute from "./src/features/student/student.routes.js";
import Auth from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import UserRoute from "./src/features/user/user.routes.js";
import DbConnect from "./src/config/mongoose.config.js";
import InterviewRoute from "./src/features/interview/interview.routes.js";
import ResultRoute from "./src/features/result/result.routes.js";

const app = express();

//cors config
app.use(cors());

//config body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config cookie parser
app.use(cookieParser());

//user Routes
app.use("/api/user", UserRoute);
//Student Routes
app.use("/api/student", Auth, StudentRoute);
//Interview Routes
app.use("/api/interview", Auth, InterviewRoute);
//Result Routes
app.use("/api/result", Auth, ResultRoute);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: false, message: "API not found, Please check the API" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Application is listening at port ${process.env.PORT}`);
  DbConnect();
});
