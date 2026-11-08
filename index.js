import http from "http";

const students = [
  { name: "Saida", email: "saida@gmail.com" },
  { name: "Aida", email: "aida@gmail.com" },
  { name: "Alina", email: "alina@gmail.com" },
];

const managers = [
  { name: "Alexander Brown", email: "alexander@gmail.com" },
  { name: "Sophia Wilson", email: "sophia@gmail.com" },
  { name: "Daniel Smith", email: "daniel@gmail.com" },
  { name: "Emily Johnson", email: "emily@gmail.com" },
  { name: "Michael Davis", email: "michael@gmail.com" },
];

const auditoriums = [
  { name: "Auditorium", capacity: 30, building: "Main Building" },
  { name: "Auditorium", capacity: 45, building: "Science Building" },
  { name: "Computer Lab", capacity: 25, building: "IT Building" },
  { name: "Conference Room", capacity: 60, building: "Main Building" },
  { name: "Auditorium", capacity: 100, building: "Education Building" },
];

const courses = [
  { name: "JavaScript Fundamentals", duration: "3 months", level: "Beginner" },
  { name: "React Development", duration: "4 months", level: "Intermediate" },
  { name: "Node.js Backend", duration: "3 months", level: "Intermediate" },
  { name: "TypeScript Mastery", duration: "2 months", level: "Advanced" },
  { name: "UI/UX Design", duration: "3 months", level: "Beginner" },
  { name: "Database Management", duration: "2 months", level: "Intermediate" },
  { name: "Fullstack Development", duration: "6 months", level: "Advanced" },
];
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    return res.end("Hello world, server from Saida");
  } else if (req.method === "GET" && req.url === "/students") {
    return res.end(JSON.stringify(students));
  } else if (req.method === "GET" && req.url === "/managers") {
    return res.end(JSON.stringify(managers));
  } else if (req.method === "GET" && req.url === "/auditoriums") {
    return res.end(JSON.stringify(auditoriums));
  } else if (req.method === "GET" && req.url === "/courses") {
    return res.end(JSON.stringify(courses));
  }
});
const port = 5000;
server.listen(port, () => {
  console.log("Server is running");
});
