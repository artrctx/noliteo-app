import { T } from "@/src/components/base/text";
import { ScreenView } from "@/src/components/screen-view";
import { View } from "react-native";
import { BlinkIndicator } from "./_components/blink-indicator";
import { TalkButton } from "./_components/talk-button";

export default function WalkieTalkie() {
  return (
    <ScreenView className="p-2">
      <View className="flex-1 rounded-md border border-primary">
        <View className="flex-row justify-end border-b border-primary p-2">
          <BlinkIndicator />
        </View>
        <View className="flex-1 gap-y-4 p-4">
          <View className="flex-1 border border-primary">
            <T>things here</T>
          </View>
          <TalkButton />
        </View>
      </View>
    </ScreenView>
  );
}
