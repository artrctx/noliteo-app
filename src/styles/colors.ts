import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary": "#000000",
    "--color-background": "#F8F8F8",
    // red-600
    "--color-red": "#E7000B",
    // blue-600
    "--color-blue": "#155DFC",
    // yellow-600
    "--color-yellow": "#D08700",
    // green-600
    "--color-green": "#00A63E",
  }),
  dark: vars({
    "--color-primary": "#FFFFFF",
    "--color-background": "#080808",
    // red-500
    "--color-red": "#FB2C36",
    // blue-500
    "--color-blue": "#2B7FFF",
    // yellow-500
    "--color-yellow": "#EFB100",
    // green-500
    "--color-green": "#00C951",
  }),
};
