import http from "http";
import fs from "fs";
import path from "path";

// папка с собранным фронтом (npm run build в todo/client)
const DIST = path.join(import.meta.dirname, "client", "dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };

function serveStatic(req, res) {
  const urlPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const file = path.join(DIST, path.normalize(urlPath));
  if (!file.startsWith(DIST) || !fs.existsSync(file)) return false;
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
  return true;
}

let todos = [
  { id: 1, title: "Выучить Node.js", done: false },
  { id: 2, title: "Сделать todo", done: true },
];
let nextId = 3;

// читаем тело запроса (JSON)
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  const [, resource, idStr] = req.url.split("/"); // "/todos/2" -> ["", "todos", "2"]
  const id = Number(idStr);

  // фронт (если собран)
  if (req.method === "GET" && resource !== "todos" && serveStatic(req, res)) return;

  if (resource !== "todos") return sendJson(res, 404, { error: "Not found" });

  // READ — все задачи
  if (req.method === "GET" && !idStr) {
    return sendJson(res, 200, todos);
  }

  // CREATE
  if (req.method === "POST" && !idStr) {
    const { title } = await readBody(req);
    if (!title) return sendJson(res, 400, { error: "title обязателен" });
    const todo = { id: nextId++, title, done: false };
    todos.push(todo);
    return sendJson(res, 201, todo);
  }

  const todo = todos.find((t) => t.id === id);
  if (!todo) return sendJson(res, 404, { error: "Задача не найдена" });

  // READ — одна задача
  if (req.method === "GET") {
    return sendJson(res, 200, todo);
  }

  // UPDATE
  if (req.method === "PUT") {
    const { title, done } = await readBody(req);
    if (title !== undefined) todo.title = title;
    if (done !== undefined) todo.done = done;
    return sendJson(res, 200, todo);
  }

  // DELETE
  if (req.method === "DELETE") {
    todos = todos.filter((t) => t.id !== id);
    return sendJson(res, 200, { ok: true });
  }

  sendJson(res, 405, { error: "Method not allowed" });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Todo: http://localhost:${port}`);
});
