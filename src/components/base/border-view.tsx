import { cn } from "@/src/styles/utils";
import { View, type ViewProps } from "react-native";

export function BorderView({ className, ...props }: ViewProps) {
  return <View className={cn("flex-1 rounded-2xl border border-primary", className)} {...props} />;
}
