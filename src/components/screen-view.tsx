import { View } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { useTheme } from "../providers/theme-provider";
import { themes } from "../styles/colors";
import { cn } from "../styles/utils";

export function ScreenView({ className, ...props }: SafeAreaViewProps) {
  const { theme } = useTheme();
  return (
    <View style={themes[theme]} className="flex-1 bg-background">
      <SafeAreaView className={cn("flex-1", className)} {...props} />
    </View>
  );
}
