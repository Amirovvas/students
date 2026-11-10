import { useEffect, useState } from "react";
import { useTodoStore } from "./store";

function TodoItem({ todo }) {
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const save = () => {
    if (title.trim()) updateTodo(todo.id, { title: title.trim() });
    setEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => updateTodo(todo.id, { done: e.target.checked })}
      />

      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
          autoFocus
        />
      ) : (
        <span className={todo.done ? "done" : ""}>{todo.title}</span>
      )}

      {editing ? (
        <button onClick={save}>💾</button>
      ) : (
        <button onClick={() => setEditing(true)}>✏️</button>
      )}
      <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
    </li>
  );
}

export default function App() {
  const todos = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text.trim());
    setText("");
  };

  return (
    <div>
      <h1>Todo</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача"
        />
        <button>Добавить</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
