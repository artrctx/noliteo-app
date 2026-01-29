import { Text, type TextProps } from "react-native";
import { cn } from "../../styles/utils";

export type TProps = {
  weight?: "extralight" | "light" | "regular" | "medium" | "semibold" | "bold";
} & TextProps;

export function T({ children, className, weight = "regular", ...props }: TProps) {
  return (
    <Text
      className={cn(
        "text-primary",
        {
          "gm-extralight": weight === "extralight",
          "gm-light": weight === "light",
          "gm-regular": weight === "regular",
          "gm-medium": weight === "medium",
          "gm-semibold": weight === "semibold",
          "gm-bold": weight === "bold",
        },
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
}
