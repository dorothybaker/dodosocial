/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#663399",
      },
      backgroundColor: {
        primary: "#663399",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        5: "5 5 0%",
      },
    },
  },
  plugins: [],
};
