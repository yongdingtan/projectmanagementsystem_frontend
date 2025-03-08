/* eslint-disable no-undef */
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: process.env.PORT || 4173, // Use Render's environment variable or fallback to 4173
    host: '0.0.0.0', // Ensure it's accessible on all interfaces
  },
  preview: {
    allowedHosts: ['projectmanagementsystem-frontend.onrender.com'], // Allow the frontend host
  },
})
