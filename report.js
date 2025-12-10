// Generate the report content
function generateReport() {
  const container = document.getElementById("report-content");
  if (!container) return;

  // Load data (make sure these variables exist globally or load from storage)
  const profile = window.profile || {};
  const courses = window.courses || [];
  const grades = window.grades || {};
  const attendance = window.attendance || {};
  const gpa = document.getElementById("gpa")?.textContent || "0.00";

  container.innerHTML = ""; // clear previous content

  // Profile
  container.innerHTML += `<h3>Profile</h3>`;
  container.innerHTML += `<p><strong>Name:</strong> ${profile.name || ""}</p>`;
  container.innerHTML += `<p><strong>Email:</strong> ${profile.email || ""}</p>`;
  container.innerHTML += `<p><strong>Bio:</strong> ${profile.bio || ""}</p>`;

  // Courses & Grades
  container.innerHTML += `<h3>Courses & Grades</h3>`;
  courses.forEach(c => {
    container.innerHTML += `<p><strong>${c.title}</strong> (${c.semester})</p>`;
    if (grades[c.title]) {
      grades[c.title].forEach(g => {
        container.innerHTML += `<p>Assignment: ${g.assignment}, Score: ${g.score}</p>`;
      });
    }
  });

  // Attendance
  container.innerHTML += `<h3>Attendance</h3>`;
  for (let course in attendance) {
    const present = attendance[course].filter(a => a.status === "present").length;
    const total = attendance[course].length;
    const percent = total === 0 ? 0 : Math.round((present / total) * 100);
    container.innerHTML += `<p>${course}: ${percent}% attendance</p>`;
  }

  // GPA
  container.innerHTML += `<h3>GPA</h3>`;
  container.innerHTML += `<p>${gpa}</p>`;
}

// Print function (clean print)
function printReport() {
  generateReport(); // make sure content is ready

  const reportContent = document.getElementById("report-content").innerHTML;

  // Open a new window for printing
  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write("<html><head><title>Report Card</title>");
  printWindow.document.write("<style>");
  printWindow.document.write("body { font-family: Arial, sans-serif; margin: 20px; }");
  printWindow.document.write("h3 { margin-top: 20px; }");
  printWindow.document.write("p { margin: 5px 0; }");
  printWindow.document.write("</style>");
  printWindow.document.write("</head><body>");
  printWindow.document.write(reportContent);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
// Attach print function to button
document.getElementById("print-report").onclick = printReport;  
