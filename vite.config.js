import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const root = process.cwd();

  return {
    // Proxy API requests to Express backend during development
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(root, "index.html"),
          chat: resolve(root, "chat.html"),
        },
      },
    },
  };
});
