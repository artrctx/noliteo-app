import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/src/components/parallax-scroll-view";
import { ScreenView } from "@/src/components/screen-view";
import { Collapsible } from "@/src/components/ui/collapsible";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { Fonts } from "@/src/constants/theme";
import { Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ScreenView style={styles.titleContainer}>
        <Text
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Explore
        </Text>
      </ScreenView>
      <Text>This app includes example code to help you get started.</Text>
      <Collapsible title="File-based routing"></Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
