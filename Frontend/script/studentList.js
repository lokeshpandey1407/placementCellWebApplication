//function to check if the token is present in the session storage, if not then it will redirect to login page
const isUserValid = () => {
  const token = sessionStorage.getItem("user");
  if (!token) {
    window.location.href = "../index.html";
  }
};
isUserValid();

const tableBody = document.getElementById("student-table-body");
const addStudent = document.getElementById("add-student-btn");

//adding event listener to move the user to add student page
addStudent.addEventListener("click", () => {
  window.location.href = "../Pages/addStudent.html";
});

//Function to pupulate Students table
function populateStudentTable(students) {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.batch}</td>
      <td>${student.college}</td>
      <td>${student.DSAScore}</td>
      <td>${student.WebDScore}</td>
      <td>${student.reactScore}</td>
    `;
    tableBody.appendChild(row);
  });
}

//Api call to get all the students data
async function handleGetStudents() {
  try {
    const response = await fetch("http://localhost:3000/api/student", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateStudentTable(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

handleGetStudents();
