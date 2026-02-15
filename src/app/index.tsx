import { Link, type LinkProps } from "expo-router";
import { type ReactNode } from "react";
import { FlatList, View } from "react-native";
import { Icon } from "../components/base/icon";
import { T } from "../components/base/text";
import { ScreenView } from "../components/screen-view";
import { ThemeToggle } from "../components/theme-toggle";

type Project = {
  name: string;
  icon?: ReactNode;
  route: LinkProps["href"];
};

const PROJS = [
  {
    name: "WalkieTalkie",
    icon: <Icon name="comment" size={28} />,
    route: "/walkie-talkie" as const,
  },
] satisfies Project[];

export default function Home() {
  return (
    <ScreenView className="p-2">
      <View className="flex-1 rounded-md border border-primary">
        <View className="flex-row justify-end border-b p-2">
          <ThemeToggle />
        </View>
        <FlatList
          data={PROJS}
          keyExtractor={(p) => p.name}
          numColumns={3}
          className="p-2"
          renderItem={({ item }) => (
            <View className="w-1/3 items-center gap-y-2 p-2">
              <Link
                href={item.route}
                className="aspect-square w-full place-items-center content-center rounded-sm border border-primary p-2"
              >
                {item.icon ?? <T className="text-xl font-bold">{item.name[0]}</T>}
              </Link>
              <T className="text-center text-sm">{item.name}</T>
            </View>
          )}
        />
      </View>
    </ScreenView>
  );
}
