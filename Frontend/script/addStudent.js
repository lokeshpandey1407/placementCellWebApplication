//function to check if the token is present in the session storage, if not then it will redirect to login page
const isUserValid = () => {
  const token = sessionStorage.getItem("user");
  if (!token) {
    window.location.href = "../index.html";
  }
};
isUserValid();

const AddStudentForm = document.getElementById("student-form");

//Adding eventlistener for student registration form submission
AddStudentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  handleCreateStudent(jsonData);
});

//Api call for create student
async function handleCreateStudent(data) {
  try {
    const response = await fetch("http://localhost:3000/api/student", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      window.location.href = "../Pages/StudentList.html";
    }
  } catch (err) {
    console.log(err);
  }
}
