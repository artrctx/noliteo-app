import { useTheme } from "@/src/providers/theme-provider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";

export function TalkButton() {
  const { theme } = useTheme();
  return (
    <Pressable className="items-center justify-center border border-primary p-5">
      <MaterialCommunityIcons
        name="speaker-wireless"
        size={24}
        color={theme === "dark" ? "white" : "black"}
      />
    </Pressable>
  );
}
