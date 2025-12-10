let grades = loadGrades(currentUser) || {}; // {course: [{assignment, score}]}

function renderGrades() {
  let tbody = document.querySelector("#grades-table tbody");
  tbody.innerHTML = "";

  for (let course in grades) {
    grades[course].forEach((g, i) => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${course}</td>
        <td>${g.assignment}</td>
        <td>${g.score || 0}</td>
        <td><button onclick="editGrade('${course}', ${i})">Edit</button></td>
      `;
      tbody.appendChild(row);
    });
  }

  calculateGPA();
}

renderGrades();

function editGrade(course, index) {
  let score = prompt("Enter score:", grades[course][index].score || 0);
  if (score !== null) {
    grades[course][index].score = parseFloat(score);
    saveGrades(currentUser, grades);
    renderGrades();
  }
}

function calculateGPA() {
  let total = 0, count = 0;
  for (let course in grades) {
    grades[course].forEach(g => {
      total += g.score || 0;
      count++;
    });
  }
  let gpa = count === 0 ? 0 : (total / count / 20).toFixed(2); // scale to 0-5 GPA
  document.getElementById("gpa").textContent = gpa;
}
    