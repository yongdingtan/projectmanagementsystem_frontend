/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}"],
theme: {
  extend: {
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    },
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
    }
  }
},
plugins: [require("tailwindcss-animate")],
}