import * as path from "path";
import csvWriter from "csv-writer";

const generateCSV = async (data) => {
  const AllData = [];
  data.forEach((item) => {
    const dataObj = {
      id: item.student._id,
      name: item.student.name,
      college: item.student.college,
      jobStatus: item.student.jobStatus,
      dsaScore: item.student.DSAScore,
      webDScore: item.student.WebDScore,
      reactScore: item.student.reactScore,
      companyName: item.interview.companyName,
      interviewDate: item.interview.interviewDate,
      result: item.result,
    };
    AllData.push(dataObj);
  });

  const writer = csvWriter.createObjectCsvWriter({
    path: path.resolve("public/master-data.csv"),
    header: [
      { id: "id", title: "Student Id" },
      { id: "name", title: " Name" },
      { id: "college", title: "College" },
      { id: "jobStatus", title: "Job Status" },
      { id: "dsaScore", title: "DSA Score" },
      { id: "webDScore", title: " WebD score" },
      { id: "reactScore", title: "React Score" },
      { id: "companyName", title: "Company Name" },
      { id: "interviewDate", title: "Interview Date" },
      { id: "result", title: "Result" },
    ],
  });

  await writer.writeRecords(AllData).then(() => {
    console.log("Done!");
  });
};

export default generateCSV;
