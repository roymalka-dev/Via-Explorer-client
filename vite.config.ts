import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://www.via-explorer-api.roymalka.dev",
        changeOrigin: true,
        secure: false, // Set to true if your target endpoint is HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
