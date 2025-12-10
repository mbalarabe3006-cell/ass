document.addEventListener("DOMContentLoaded", () => {
  // Get the logged-in user
  let currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("No user logged in!");
    return;
  }

  // Load courses from localStorage
  let courses = JSON.parse(localStorage.getItem(`courses_${currentUser}`)) || [];

  // DOM Elements
  const tbody = document.querySelector("#courses-table tbody");
  const titleInput = document.getElementById("course-title");
  const instructorInput = document.getElementById("course-instructor");
  const creditsInput = document.getElementById("course-credits");
  const semesterInput = document.getElementById("course-semester");
  const addCourseBtn = document.getElementById("add-course-btn");

  let editIndex = -1; // Track if editing a course

  // Render courses table
  function renderCourses() {
    tbody.innerHTML = "";
    courses.forEach((c, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${c.title}</td>
        <td>${c.instructor}</td>
        <td>${c.credits}</td>
        <td>${c.semester}</td>
        <td>
          <button onclick="editCourse(${i})">Edit</button>
          <button onclick="deleteCourse(${i})">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  // Add or save a course
  addCourseBtn.onclick = function () {
    const title = titleInput.value.trim();
    const instructor = instructorInput.value.trim();
    const credits = creditsInput.value.trim();
    const semester = semesterInput.value.trim();

    if (!title || !instructor || !credits || !semester) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex === -1) {
      // Add new course
      courses.push({ title, instructor, credits, semester });
    } else {
      // Save edited course
      courses[editIndex] = { title, instructor, credits, semester };
      editIndex = -1;
      addCourseBtn.textContent = "Add Course";
    }

    localStorage.setItem(`courses_${currentUser}`, JSON.stringify(courses));
    renderCourses();

    // Clear input fields
    titleInput.value = "";
    instructorInput.value = "";
    creditsInput.value = "";
    semesterInput.value = "";
  };

  // Make functions global for inline buttons
  window.editCourse = function (index) {
    const c = courses[index];
    titleInput.value = c.title;
    instructorInput.value = c.instructor;
    creditsInput.value = c.credits;
    semesterInput.value = c.semester;

    editIndex = index;
    addCourseBtn.textContent = "Save Course";
  };

  window.deleteCourse = function (index) {
    if (confirm("Are you sure you want to delete this course?")) {
      courses.splice(index, 1);
      localStorage.setItem(`courses_${currentUser}`, JSON.stringify(courses));
      renderCourses();
    }
  };

  // Initial render
  renderCourses();
});
