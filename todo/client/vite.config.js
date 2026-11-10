import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // запросы на /todos уходят на бэкенд
    proxy: { "/todos": "http://localhost:5001" },
  },
});
