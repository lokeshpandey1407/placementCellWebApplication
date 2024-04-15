//function to check if the token is present in the session storage, if not then it will redirect to login page
const isUserValid = () => {
  const token = sessionStorage.getItem("user");
  if (!token) {
    window.location.href = "../index.html";
  }
};
isUserValid();

const tableBody = document.getElementById("master-table-body");
const generateCsv = document.getElementById("generate-csv-btn");

// adding event listener to move the user to add master page
generateCsv.addEventListener("click", handleGetCSV);

//Function to pupulate master table
function populateMasterTable(entries) {
  tableBody.innerHTML = "";
  entries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
      <td>${entry.student._id}</td>
      <td>${entry.student.name}</td>
      <td>${entry.student.college}</td>
      <td>${entry.student.jobStatus}</td>
      <td>${entry.student.DSAScore}</td>
      <td>${entry.student.WebDScore}</td>
      <td>${entry.student.reactScore}</td>
      <td>${entry.interview.companyName}</td>
      <td>${entry.interview.interviewDate}</td>
      <td>${entry.result}</td>
    `;
    tableBody.appendChild(row);
  });
}

//Api call to get all the master data
async function handleGetData() {
  try {
    const response = await fetch(`http://localhost:3000/api/result/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateMasterTable(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

async function handleGetCSV() {
  try {
    const response = await fetch(`http://localhost:3000/api/result/csv`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
    });
    const blob = await response.blob();
    const anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = "master-data.csv";
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  } catch (err) {
    console.log(err);
  }
}

handleGetData();
