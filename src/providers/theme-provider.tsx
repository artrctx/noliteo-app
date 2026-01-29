import { useColorScheme } from "nativewind";
import { createContext, type ReactNode, useContext } from "react";

const ThemeContext = createContext<{ theme: "light" | "dark"; toggleTheme: () => void } | null>(
  null
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
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
