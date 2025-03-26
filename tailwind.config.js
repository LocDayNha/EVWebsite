/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: '#1E1E1E',
        primary: '#009558',
        secondary: '#E9F6F5',
        background: '#FFFFFF',

        black: '#000000',
        white: '#ffffff',
        gray1: '#EDEDED',
        gray2: '#D9D9D9',
        gray3: "#979592",
        gray4: "#C7C6C5",
        green: '#49b915',
        green2: '#039a83',
        green3: '#009558',
        green4: '#007A45',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        nomal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",

      },
      fontSize: {
        size10: "10px",
        size12: "12px",
        size14: "14px",
        size16: "16px",
        size18: "18px",
        size20: "20px",
        size24: "24px",
        size30: "30px",
        size36: "36px",
        size48: "48px",
        size50: "50px",
      },
    },
  },
  plugins: [],
};
