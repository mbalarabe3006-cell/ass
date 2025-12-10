/* ===========================================
   LOGIN + REGISTRATION LOGIC
=========================================== */

function showRegister() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("register-section").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("register-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

// Register user
function registerUser() {
  let user = document.getElementById("reg-user").value.trim();
  let email = document.getElementById("reg-email").value.trim();
  let pass = document.getElementById("reg-pass").value.trim();
  let confirm = document.getElementById("reg-confirm").value.trim();
  let error = document.getElementById("reg-error");

  if (!user || !email || !pass || !confirm) {
    error.textContent = "Please fill all fields.";
    return;
  }

  if (pass !== confirm) {
    error.textContent = "Passwords do not match.";
    return;
  }

  if (pass.length < 8) {
    error.textContent = "Password must be at least 8 characters.";
    return;
  }

  let users = loadData("users") || [];

  if (users.some(u => u.username === user)) {
    error.textContent = "Username already exists.";
    return;
  }

  users.push({ username: user, email: email, password: pass });
  saveData("users", users);

  alert("Registration successful!");
  showLogin();
}

// Login user
function login() {
  let user = document.getElementById("login-user").value.trim();
  let pass = document.getElementById("login-pass").value.trim();
  let error = document.getElementById("login-error");

  let users = loadData("users") || [];
  let found = users.find(u => u.username === user && u.password === pass);

  if (!found) {
    error.textContent = "Incorrect username or password.";
    return;
  }

  localStorage.setItem("currentUser", user);
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("student-name").textContent = user;
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}
