import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  // Base path: "/" for local dev & custom-domain hosts; set DEPLOY_BASE
  // (e.g. "/intensify/") when building for a GitHub Pages project site.
  base: process.env.DEPLOY_BASE || "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
          router: ["react-router-dom"],
          three: ["three"],
          drei: ["@react-three/drei", "@react-three/fiber"],
        },
      },
    },
  },
});
