let attendance = loadAttendance(currentUser) || {}; // {course: [{date,status}]}

function renderAttendance() {
  let tbody = document.querySelector("#attendance-table tbody");
  tbody.innerHTML = "";

  for (let course in attendance) {
    attendance[course].forEach(a => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${course}</td>
        <td>${a.date}</td>
        <td>${a.status}</td>
      `;
      tbody.appendChild(row);
    });
  }
}

renderAttendance();

function markAttendance() {
  let course = document.getElementById("attendance-course").value.trim();
  let date = document.getElementById("attendance-date").value;
  let status = document.getElementById("attendance-status").value;

  if (!course || !date) return alert("Fill all fields.");

  if (!attendance[course]) attendance[course] = [];
  attendance[course].push({ date, status });

  saveAttendance(currentUser, attendance);
  renderAttendance();
}
