import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useFontForDevelopment } from "../hooks/use-font-for-development";
import { QueryProvider } from "../providers/query-provider";
import { ThemeProvider } from "../providers/theme-provider";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

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
      <StatusBar style="auto" />
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="protected/index" />
        </Stack>
      </QueryProvider>
    </ThemeProvider>
  );
}
