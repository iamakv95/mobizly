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
      keyframes: {
        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-out-right": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
        "slide-out-left": {
          "0%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
        },
        "slide-in-bottom": {
          "0%": {
            transform: "translatey(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translatey(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.3s ease",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-out-left": "slide-out-left 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
