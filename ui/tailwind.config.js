/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "search-bar-content":
          "url('./src/components/homepageComponents/backgroundimage.png')",
      },
    },

    fontFamily: {
      dancing: "Dancing Script, cursive",
    },
  },
  plugins: [],
};
