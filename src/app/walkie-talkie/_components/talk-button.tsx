import { useTheme } from "@/src/providers/theme-provider";
import { useWalkieTalkie } from "@/src/providers/walkie-talkie";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";

export function TalkButton() {
  const { theme } = useTheme();
  const { status, test } = useWalkieTalkie();
  const disabled = status !== "OPERATIONAL";
  return (
    <Pressable
      disabled={disabled}
      onPress={test}
      className="items-center justify-center border border-primary p-5"
    >
      <MaterialCommunityIcons
        name={disabled ? "speaker-off" : "speaker-wireless"}
        size={24}
        color={theme === "dark" ? "white" : "black"}
      />
    </Pressable>
  );
}
