import { type ReactNode } from "react";
import { View } from "react-native";
import { T } from "../components/base/text";
import { ScreenView } from "../components/screen-view";

type Project = {
  name: string;
  icon?: ReactNode;
  route: string;
};

const PROJS = [] satisfies Project[];

export default function Home() {
  return (
    <ScreenView className="p-2">
      <View className="grid flex-1 grid-cols-3 items-center justify-center rounded-md border border-primary">
        <T>Press</T>
      </View>
    </ScreenView>
  );
}
