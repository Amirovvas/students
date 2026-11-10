import { create } from "zustand";

const API = "/todos";
const headers = { "Content-Type": "application/json" };

export const useTodoStore = create((set) => ({
  todos: [],

  // READ
  fetchTodos: async () => {
    const res = await fetch(API);
    set({ todos: await res.json() });
  },

  // CREATE
  addTodo: async (title) => {
    const res = await fetch(API, {
      method: "POST",
      headers,
      body: JSON.stringify({ title }),
    });
    const todo = await res.json();
    set((state) => ({ todos: [...state.todos, todo] }));
  },

  // UPDATE
  updateTodo: async (id, data) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? updated : t)),
    }));
  },

  // DELETE
  deleteTodo: async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
  },
}));
