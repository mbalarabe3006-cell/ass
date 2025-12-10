// Get current logged-in user
let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("No user logged in!");
  // Optionally redirect to login
  window.location.href = "index.html";
}

// Load profile from storage
let profile = loadProfile(currentUser) || {};

// Populate profile form fields
document.getElementById("profile-name").value = profile.name || "";
document.getElementById("profile-email").value = profile.email || "";
document.getElementById("profile-bio").value = profile.bio || "";
if (profile.picture) {
  document.getElementById("profile-pic").src = profile.picture;
}

// Handle profile picture upload
document.getElementById("upload-pic").onchange = function (e) {
  let reader = new FileReader();
  reader.onload = function () {
    document.getElementById("profile-pic").src = reader.result;
    profile.picture = reader.result; // Save to profile object
  };
  reader.readAsDataURL(e.target.files[0]);
};

// Save profile function
function saveProfileData() {
  profile.name = document.getElementById("profile-name").value.trim();
  profile.email = document.getElementById("profile-email").value.trim();
  profile.bio = document.getElementById("profile-bio").value.trim();

  saveProfile(currentUser, profile); // Save to localStorage
  alert("Profile saved successfully!");
}
