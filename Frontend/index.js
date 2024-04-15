const LoginForm = document.getElementById("login-form");
const error = document.getElementById("error-message");

//Event listener to add the submit functionality to the signin form
LoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleSignInUser(email, password);
});

//Api call to signin
async function handleSignInUser(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/user/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await response.json();
    sessionStorage.setItem("user", JSON.stringify(res.data));
    if (res.success) {
      window.location.href = "./Pages/StudentList.html";
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
