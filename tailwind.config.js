module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-white": "#f6f6f6",
        "custom-black": " #001011 ",
        "custom-red": " #fe4a49",
        "custom-red-hover": "#e71d36",
      },
      fontFamily: {
        Heading: ["Inter", "sans-serif"],
        Content: ["Jost", "serif"],
      },
      fontSize: {
        "10px": "10px",
        "13px": "13px",
        "16px": "16px",
        "19px": "19px",
        "23px": "23px",
        "26px": "26px",
        "30px": "30px",
        "40px": "40px",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
