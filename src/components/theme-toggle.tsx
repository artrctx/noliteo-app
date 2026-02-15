import { ClassValue } from "clsx";
import { Pressable } from "react-native";
import { useTheme } from "../providers/theme-provider";
import { cn } from "../styles/utils";
import { Icon } from "./base/icon";

export function ThemeToggle({ className }: { className?: ClassValue }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Pressable onPress={() => toggleTheme()} className={cn(className)}>
      {theme === "light" ? <Icon name="sun-o" size={20} /> : <Icon name="moon-o" size={20} />}
    </Pressable>
  );
}
