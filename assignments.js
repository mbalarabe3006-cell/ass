let assignments = loadAssignments(currentUser) || [];

function renderAssignments() {
  let tbody = document.querySelector("#assignments-table tbody");
  tbody.innerHTML = "";

  assignments.forEach((a, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.title}</td>
      <td>${a.course}</td>
      <td>${a.due}</td>
      <td>${a.points}</td>
      <td>${a.status || "Not Submitted"}</td>
      <td>
        <button onclick="submitAssignment(${i})">Submit</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

renderAssignments();

function addAssignment() {
  let title = document.getElementById("assignment-title").value.trim();
  let course = document.getElementById("assignment-course").value.trim();
  let due = document.getElementById("assignment-due").value;
  let desc = document.getElementById("assignment-desc").value.trim();
  let points = document.getElementById("assignment-points").value.trim();

  if (!title || !course || !due || !points) return alert("Fill all fields.");

  assignments.push({ title, course, due, desc, points, status: "Not Submitted" });
  saveAssignments(currentUser, assignments);
  renderAssignments();
  clearAssignmentForm();
}

function clearAssignmentForm() {
  document.getElementById("assignment-title").value = "";
  document.getElementById("assignment-course").value = "";
  document.getElementById("assignment-due").value = "";
  document.getElementById("assignment-desc").value = "";
  document.getElementById("assignment-points").value = "";
}

function submitAssignment(index) {
  assignments[index].status = "Submitted";
  assignments[index].submittedAt = new Date().toLocaleString();
  saveAssignments(currentUser, assignments);
  renderAssignments();
  alert("Assignment submitted!");
}
