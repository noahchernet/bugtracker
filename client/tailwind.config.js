module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#33b3ab",
        ash: "#e8e3e4",
        brown: "#d59c85",
        dark_brown: "#393638",
      },
      fontFamily: {
        galano_gortesque: ["galano-gortesque", "sans-serif"],
        cartogothic: ["cartogothic", "system-ui"],
        cartogothic_bold: ["cartogothic-bold", "system-ui"],
      },
    },
  },
  plugins: [],
};
