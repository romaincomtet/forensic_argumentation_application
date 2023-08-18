/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue shades
        "blue-light": "#93C5FD",
        "blue-default": "#3B82F6",
        "blue-dark": "#1E3A8A",

        // Grey shades
        "grey-lightest": "#F3F4F6",
        "grey-light": "#E5E7EB",
        "grey-default": "#9CA3AF",
        "grey-dark": "#4B5563",
        "grey-darker": "#374151",

        // Additional colors
        "green-default": "#10B981",
        "red-default": "#EF4444",
        "yellow-default": "#F59E0B",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
