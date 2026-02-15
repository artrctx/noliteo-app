import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext<{ theme: "light" | "dark"; toggleTheme: () => void } | null>(
  null
);

const THEME_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const usrPrefTheme = useMemo(() => SecureStore.getItem(THEME_KEY), []);
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(
    (usrPrefTheme ?? colorScheme) === "light" ? "light" : "dark"
  );
  useEffect(() => {
    if (usrPrefTheme === colorScheme) return;
    setColorScheme(usrPrefTheme === "light" ? "light" : "dark");
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => {
          const newTheme = theme === "light" ? "dark" : "light";
          SecureStore.setItem(THEME_KEY, newTheme);
          setColorScheme(newTheme);
          setTheme(newTheme);
        },
      }}
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
