import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { type ReactNode } from "react";
import { FlatList, Pressable, View } from "react-native";
import { T } from "../components/base/text";
import { ScreenView } from "../components/screen-view";

type Project = {
  name: string;
  icon?: ReactNode;
  route: string;
};

const PROJS = [
  {
    name: "WalkieTalkie",
    icon: <FontAwesome6 name="walkie-talkie" size={24} color="black" />,
    route: "/walkie-talkie",
  },
  {
    name: "WalkieTalkie2",
    icon: <FontAwesome6 name="walkie-talkie" size={24} color="black" />,
    route: "/walkie-talkie",
  },
  {
    name: "WalkieTalkie4",
    icon: <FontAwesome6 name="walkie-talkie" size={24} color="black" />,
    route: "/walkie-talkie",
  },
  {
    name: "WalkieTalkie3",
    icon: <FontAwesome6 name="walkie-talkie" size={24} color="black" />,
    route: "/walkie-talkie",
  },
  {
    name: "WalkieTalkie8",
    icon: <FontAwesome6 name="walkie-talkie" size={24} color="black" />,
    route: "/walkie-talkie",
  },
  {
    name: "WalkieTalkie22",
    icon: <FontAwesome6 name="walkie-talkie" size={24} color="black" />,
    route: "/walkie-talkie",
  },
] satisfies Project[];

export default function Home() {
  return (
    <ScreenView className="p-2">
      <View className="grid flex-1 grid-cols-3 gap-2 rounded-md border border-primary p-2">
        <FlatList
          data={PROJS}
          keyExtractor={(p) => p.name}
          numColumns={3}
          renderItem={({ item }) => (
            <View className="w-1/3 items-center">
              <Pressable className="aspect-square w-full items-center justify-center border">
                <T>{item.name}</T>
              </Pressable>
              <T className="text-sm">{item.name}</T>
            </View>
          )}
        />
      </View>
    </ScreenView>
  );
}
