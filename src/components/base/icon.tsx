import { useTheme } from "@/src/providers/theme-provider";
import { Colors } from "@/src/styles/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ComponentProps } from "react";

export function Icon({
  darkColor,
  lightColor,
  ...props
}: Pick<ComponentProps<typeof FontAwesome>, "name" | "size" | "style"> & {
  darkColor?: string;
  lightColor?: string;
}) {
  const { theme } = useTheme();
  return (
    <FontAwesome
      color={
        theme === "dark" ? (darkColor ?? Colors.dark.primary) : (lightColor ?? Colors.light.primary)
      }
      {...props}
    />
  );
}
