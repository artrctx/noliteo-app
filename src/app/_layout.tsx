import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useFontForDevelopment } from "../hooks/use-font-for-development";
import { QueryProvider } from "../providers/query-provider";
import { SessionProvider } from "../providers/session-provider";
import { ThemeProvider, useTheme } from "../providers/theme-provider";
import "./global.css";

export const unstable_settings = {
  anchor: "index",
  initialinitialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

const ThemedStatusBar = () => {
  const { theme } = useTheme();
  return <StatusBar style={theme === "dark" ? "light" : "dark"} />;
};

export default function RootLayout() {
  //! for development only remove when build
  const loaded = useFontForDevelopment();
  useEffect(() => {
    if (!loaded) return;
    SplashScreen.hideAsync();
  }, [loaded]);
  if (!loaded) return null;
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <QueryProvider>
        <SessionProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SessionProvider>
      </QueryProvider>
      <Toast avoidKeyboard />
    </ThemeProvider>
  );
}
