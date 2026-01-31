import { View } from "react-native";
import { ScreenView } from "../components/screen-view";

export default function Home() {
  return (
    <ScreenView className="p-4">
      <View className="flex-1 items-center justify-center rounded-2xl border border-primary"></View>
    </ScreenView>
  );
}
