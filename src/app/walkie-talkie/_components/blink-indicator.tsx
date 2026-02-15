import { cn } from "@/src/styles/utils";
import { View } from "react-native";

export function BlinkIndicator() {
  return (
    <View className={cn("aspect-square h-16 w-16 rounded-full bg-primary transition-colors")} />
  );
}
