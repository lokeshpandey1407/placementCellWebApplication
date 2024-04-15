import generateCSV from "../../middleware/generateCSV.js";
import ResultRepository from "./result.repository.js";
import * as path from "path";
export default class ResultController {
  constructor() {
    this.resultRepository = new ResultRepository();
  }
  async getAllByInterviewId(req, res, next) {
    const { interviewId } = req.params;
    try {
      const results = await this.resultRepository.findAllByInterview(
        interviewId
      );
      res.status(200).json({
        success: true,
        message: "",
        data: results,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const results = await this.resultRepository.find();
      res.status(200).json({
        success: true,
        message: "",
        data: results,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getCSV(req, res, next) {
    try {
      const results = await this.resultRepository.find();
      //code for generating CSV
      await generateCSV(results);
      const filePath = path.resolve("public/master-data.csv");
      await res.sendFile(filePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error downloading file");
        } else {
          console.log("CSV downloaded successfully");
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateResult(req, res, next) {
    const { id } = req.params;
    try {
      const result = await this.resultRepository.updateOne(id, req.body);
      res.status(200).json({
        success: true,
        message: "",
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
