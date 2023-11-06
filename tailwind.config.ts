import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f5f8f5",
          "100": "#e8f0ea",
          "200": "#d1e1d4",
          "300": "#acc9b2",
          "400": "#80a888",
          "500": "#5d8a66",
          "600": "#476c4e",
          "700": "#3c5942",
          "800": "#334837",
          "900": "#2b3c2f",
          "950": "#141f17",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
