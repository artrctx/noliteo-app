import { T } from "@/src/components/base/text";
import { ScreenView } from "@/src/components/screen-view";
import { useTheme } from "@/src/providers/theme-provider";
import { useTransition } from "react";
import { Pressable } from "react-native";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable onPress={toggleTheme} className="absolute left-0 top-0 mt-4">
      <T>{theme === "dark" ? "Dark" : "Light"}</T>
    </Pressable>
  );
}
export default function HomeScreen() {
  const [isPending, setTransition] = useTransition();
  return (
    <ScreenView className="items-center justify-center gap-y-4 p-4">
      <T>Protected Page</T>
      <Pressable
        className="w-fit border border-primary p-1"
      >
        <T className="w-fit">Sign Out</T>
      </Pressable>
    </ScreenView>
  );
}
