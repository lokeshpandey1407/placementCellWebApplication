const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  window.location.href = "../index.html";
});
