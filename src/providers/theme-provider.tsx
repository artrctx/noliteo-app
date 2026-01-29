import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import { createContext, type ReactNode, useContext } from "react";
const ThemeContext = createContext<{ theme: "light" | "dark"; toggleTheme: () => void } | null>(
  null
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const defaultTheme = SecureStore.getItem("theme");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  // if (defaultTheme) NativeWindStyleSheet.setColorScheme(colorScheme);

  return (
    <ThemeContext.Provider
      value={{ theme: colorScheme ?? "light", toggleTheme: toggleColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
