const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/providers/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        /* Geist Mono */
        ".gm-thin": {
          fontFamily: "GeistMono-Thin",
        },
        ".gmi-thin": {
          fontFamily: "GeistMono-ThinItalic",
        },
        ".gm-extralight": {
          fontFamily: "GeistMono-ExtraLight",
        },
        ".gmi-extralight": {
          fontFamily: "GeistMono-ExtraLightItalic",
        },
        ".gm-light": {
          fontFamily: "GeistMono-Light",
        },
        ".gmi-light": {
          fontFamily: "GeistMono-LightItalic",
        },
        ".gm": {
          fontFamily: "GeistMono-Regular",
        },
        ".gm-regular": {
          fontFamily: "GeistMono-Regular",
        },
        ".gm-medium": {
          fontFamily: "GeistMono-Medium",
        },
        ".gmi-medium": {
          fontFamily: "GeistMono-MediumItalic",
        },
        ".gm-semibold": {
          fontFamily: "GeistMono-SemiBold",
        },
        ".gmi-semibold": {
          fontFamily: "GeistMono-SemiBoldItalic",
        },
        ".gm-bold": {
          fontFamily: "GeistMono-Bold",
        },
        ".gmi-bold": {
          fontFamily: "GeistMono-BoldItalic",
        },
        ".gm-extrabold": {
          fontFamily: "GeistMono-ExtraBold",
        },
        ".gmi-extrabold": {
          fontFamily: "GeistMono-ExtraBoldItalic",
        },
      });
    }),
  ],
};
