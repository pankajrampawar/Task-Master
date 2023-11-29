/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        VDB: "hsl(217, 54%, 11%)",
        SB: "hsl(215, 51%, 70%)",
        cyan: "hsl(178, 100%, 50%)",
        DB: 'hsl(216, 50%, 16%)',
        DBL: 'hsl(215, 32%, 27%)',
      }
    },
  },
  plugins: [],
}

