import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { T } from "../components/base/text";
import { ScreenView } from "../components/screen-view";

export type SessionCtx = {
  token: string | null;
  resetToken: () => Promise<void>;
};

const TOKEN_KEY = "CoreToken";

const SessionContext = createContext<SessionCtx | null>(null);

function SessionRegisterInput({}: {}) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <T>Ste</T>
    </Animated.View>
  );
}

function SessionRegisterLoader() {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <ActivityIndicator />
    </Animated.View>
  );
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      token,
      resetToken: async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
      },
    }),
    [token]
  );

  useEffect(() => {
    if (initialized) return;
    const token = SecureStore.getItem(TOKEN_KEY);
    // validate token
    setToken(token);
    setInitialized(true);
  }, []);

  return (
    <SessionContext.Provider value={value}>
      {token ? (
        children
      ) : (
        <ScreenView className="items-center justify-center p-4">
          {initialized ? <SessionRegisterInput /> : <SessionRegisterLoader />}
        </ScreenView>
      )}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession should be used under SessionProvider");
  return ctx;
}
