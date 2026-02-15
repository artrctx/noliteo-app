import { IconSymbol } from "@/src/components/base/icon-symbol";
import { ScreenView } from "@/src/components/screen-view";
import { useTheme } from "@/src/providers/theme-provider";
import { Colors } from "@/src/styles/colors";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <ScreenView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.primary : Colors.dark.primary}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <Text>{title}</Text>
      </TouchableOpacity>
      {isOpen && <ScreenView style={styles.content}>{children}</ScreenView>}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
