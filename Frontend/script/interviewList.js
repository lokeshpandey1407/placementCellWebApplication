//function to check if the token is present in the session storage, if not then it will redirect to login page
const isUserValid = () => {
  const token = sessionStorage.getItem("user");
  if (!token) {
    window.location.href = "../index.html";
  }
};
isUserValid();

const tableBody = document.getElementById("interview-table-body");
const addInterview = document.getElementById("add-interview-btn");

//adding event listener for view button functionality
addInterview.addEventListener("click", () => {
  window.location.href = "../Pages/addInterview.html";
});

//Function to populate interview list
function populateInterviewTable(interviews) {
  tableBody.innerHTML = "";
  interviews.forEach((interview, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
      <td>${interview.companyName}</td>
      <td>${interview.jobProfile}</td>
      <td>${interview.location}</td>
      <td>${interview.skills}</td>
      <td>${interview.interviewDate}</td>
      <td id="view" class="text-center">${interview.students.length}</td>
      <td>
      <button class="btn btn-primary" onclick="viewEventListener('${
        interview._id
      }')">View</button></td>
    `;
    tableBody.appendChild(row);
  });
}

//Adding event listener for view button
function viewEventListener(id) {
  window.location.href = `../Pages/InterviewInfo.html?id=${id}`;
}

//Api call for getting all interviews
async function handleGetInterviews() {
  try {
    const response = await fetch("http://localhost:3000/api/interview", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateInterviewTable(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

handleGetInterviews();
