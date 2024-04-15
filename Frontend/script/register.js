const RegistrationForm = document.getElementById("registration-form");
const error = document.getElementById("error-message");

//Adding event listener for signup
RegistrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await handleRegisterUser(name, email, password);
});

//Api call to post signup data
async function handleRegisterUser(name, email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const res = await response.json();
    if (res.success) {
      window.location.href = "../Pages/StudentList.html";
    } else {
      handleError(res.message);
    }
  } catch (err) {
    console.log(err);
  }
}

//error handler function to show error
const handleError = (message) => {
  error.textContent = message;
  error.classList.remove("d-none");

  const timeout = setTimeout(() => {
    error.textContent = "";
    error.classList.add("d-none");
  }, 3000);
};
