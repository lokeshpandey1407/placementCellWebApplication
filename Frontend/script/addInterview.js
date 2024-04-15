//function to check if the token is present in the session storage, if not then it will redirect to login page
const isUserValid = () => {
  const token = sessionStorage.getItem("user");
  if (!token) {
    window.location.href = "../index.html";
  }
};
isUserValid();

const AddInterviewForm = document.getElementById("interview-form");
const error = document.getElementById("error-message");

//Adding event listener to add interview form
AddInterviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  const skillsSelect = document.getElementById("skills");
  const selectedSkills = [];
  for (let i = 0; i < skillsSelect.options.length; i++) {
    if (skillsSelect.options[i].selected) {
      selectedSkills.push(skillsSelect.options[i].value);
    }
  }
  jsonData.skills = selectedSkills;
  handleCreateInterview(jsonData);
});

//Api call for adding the interview
async function handleCreateInterview(data) {
  try {
    const response = await fetch("http://localhost:3000/api/interview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      window.location.href = "../Pages/InterviewList.html";
    } else {
      handleError(res.message);
    }
  } catch (err) {
    console.log(err);
  }
}

//Function to show Errors
const handleError = (message) => {
  error.textContent = message;
  error.classList.remove("d-none");

  setTimeout(() => {
    error.textContent = "";
    error.classList.add("d-none");
  }, 3000);
};
