/* ===========================================
   LOCAL STORAGE HELPER FUNCTIONS
=========================================== */

// Generic load/save
function loadData(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ---------------------------
   PROFILE DATA
--------------------------- */
function loadProfile(username) {
  let profiles = loadData("profiles") || {};
  return profiles[username] || {};
}

function saveProfile(username, profileObj) {
  let profiles = loadData("profiles") || {};
  profiles[username] = profileObj;
  saveData("profiles", profiles);
}

/* ---------------------------
   COURSES
--------------------------- */
function loadCourses(username) {
  let courses = loadData("courses") || {};
  return courses[username] || [];
}

function saveCourses(username, courseArr) {
  let courses = loadData("courses") || {};
  courses[username] = courseArr;
  saveData("courses", courses);
}

/* ---------------------------
   ASSIGNMENTS
--------------------------- */
function loadAssignments(username) {
  let assignments = loadData("assignments") || {};
  return assignments[username] || [];
}

function saveAssignments(username, assignmentArr) {
  let assignments = loadData("assignments") || {};
  assignments[username] = assignmentArr;
  saveData("assignments", assignments);
}

/* ---------------------------
   GRADES
--------------------------- */
function loadGrades(username) {
  let grades = loadData("grades") || {};
  return grades[username] || {};
}

function saveGrades(username, gradesObj) {
  let grades = loadData("grades") || {};
  grades[username] = gradesObj;
  saveData("grades", grades);
}

/* ---------------------------
   ATTENDANCE
--------------------------- */
function loadAttendance(username) {
  let attendance = loadData("attendance") || {};
  return attendance[username] || {};
}

function saveAttendance(username, attendanceObj) {
  let attendance = loadData("attendance") || {};
  attendance[username] = attendanceObj;
  saveData("attendance", attendance);
}

/* ---------------------------
   CURRENT USER
--------------------------- */
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}
