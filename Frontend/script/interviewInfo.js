//function to check if the token is present in the session storage, if not then it will redirect to login page
const isUserValid = () => {
  const token = sessionStorage.getItem("user");
  if (!token) {
    window.location.href = "../index.html";
  }
};
isUserValid();

const tableBody = document.getElementById("student-table-body");
const StudentSelectDropdown = document.getElementById("studentSelect");
const AssignBtn = document.getElementById("assign");
const error = document.getElementById("error-message");

var selectedStudent = document.getElementById("studentSelect");
const CompanyName = document.getElementById("companyName");
const JobProfile = document.getElementById("jobProfile");
const JobLocation = document.getElementById("jobLocation");
const Skills = document.getElementById("skillsRequired");
const InterviewDate = document.getElementById("interviewDate");

//Adding event listener to assign the student to an interview
AssignBtn.addEventListener("click", () => {
  handleAssignStudentToInterview();
});

//Function to populate assigned student list inside the interview info page
function populateStudentsTable(data) {
  tableBody.innerHTML = "";
  if (data.length == 0) {
    const row = document.createElement("p");
    row.classList.add("mt-3");
    row.style.textAlign = "center";
    row.textContent = "No data found";
    tableBody.appendChild(row);
  }
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.setAttribute("key", item._id);
    row.innerHTML = `
    <td>${index + 1}</td>
      <td>${item.student.name}</td>
      <td>${item.student.batch}</td>
      <td class="text-center">${item.result}</td>
      <td class="text-center d-flex flex-row gap-2">
      <select
      class="form-control"
      id="result-${item._id}"
      name="result"
      required
      >
        <option value="" disabled selected>Update Result</option>
        <option value="Applied">Applied</option>
        <option value="Pass">Pass</option>
        <option value="Fail">Fail</option>
        <option value="On-Hold">On-Hold</option>
        <option value="Didn't Attempt">Didn't Attempt</option>
      </select>
        <button type="submit" class="btn btn-primary" onClick="handleUpdateResult('${
          item._id
        }')">
          Save
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

//Api call to update the result of an interview
async function handleUpdateResult(id) {
  const StudentSelectDropdown = document.getElementById(`result-${id}`);
  selectedValue = StudentSelectDropdown.value;
  if (selectedValue == "") {
    return;
  }
  const data = { result: selectedValue };
  try {
    const response = await fetch(`http://localhost:3000/api/result/${id}`, {
      method: "PUT",

      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      await handleGetResults();
    }
  } catch (err) {
    console.log(err);
  }
}

//function to populate interview informationk
function populateInterviewInfo(interview) {
  CompanyName.textContent = interview.companyName;
  JobProfile.textContent = interview.jobProfile;
  JobLocation.textContent = interview.location;
  Skills.textContent = interview.skills;
  InterviewDate.textContent = interview.interviewDate;
}

//Function to dynamically populate the students dropdow for assigning
function populateDropdownList(students) {
  students.forEach((student, index) => {
    const select = document.createElement("option");
    select.value = `${student._id}`;
    select.textContent = `${student.name}`;
    select.setAttribute("data-option-id", student._id);
    StudentSelectDropdown.appendChild(select);
  });
}

//Api call to get all the students for dropdown
async function handleGetStudents() {
  try {
    const response = await fetch(`http://localhost:3000/api/student`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateDropdownList(res?.data);
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call to get interview info by id
async function handleGetInterviewInfo() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  try {
    const response = await fetch(`http://localhost:3000/api/interview/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateInterviewInfo(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call to assign student to the interview
async function handleAssignStudentToInterview() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const studentId = selectedStudent.value;
  const data = { student: studentId, resultStatus: "Applied" };
  try {
    const response = await fetch(`http://localhost:3000/api/interview/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      // console.log(res);
      location.reload();
    } else {
      handleError(res.message);
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call to get the results to show in the student list
async function handleGetResults() {
  const params = new URLSearchParams(window.location.search);
  const interviewId = params.get("id");
  try {
    const response = await fetch(
      `http://localhost:3000/api/result/all/${interviewId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
        },
      }
    );
    const res = await response.json();
    if (res.success) {
      populateStudentsTable(res?.data);
    }
  } catch (err) {
    console.log(err);
  }
}

const handleError = (message) => {
  error.textContent = message;
  error.classList.remove("d-none");

  const timeout = setTimeout(() => {
    error.textContent = "";
    error.classList.add("d-none");
  }, 3000);
};

handleGetStudents();
handleGetInterviewInfo();
handleGetResults();
