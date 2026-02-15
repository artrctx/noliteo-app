import { vars } from "nativewind";

export const Colors = {
  light: {
    primary: "#000000",
    background: "#F8F8F8",
  },
  dark: {
    primary: "#FFFFFF",
    background: "#080808",
  },
};

export const themes = {
  light: vars({
    "--color-primary": Colors.light.primary,
    "--color-background": Colors.light.background,
  }),
  dark: vars({
    "--color-primary": Colors.dark.primary,
    "--color-background": Colors.dark.background,
  }),
};
