/*
 * @Author: Czy
 * @Date: 2025-01-20 17:24:58
 * @FilePath: /b2b-official-website/tailwind.config.js
 *
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1710px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
