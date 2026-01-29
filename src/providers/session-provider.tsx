import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ScreenView } from "../components/screen-view";

export type SessionCtx = {
  token: string | null;
  setToken: (_: string) => void;
};

const tokenKey = "CoreToken";

const SessionContext = createContext<SessionCtx | null>(null);

type SessionProviderState = {
  initialized: boolean;
  requiresToken: boolean;
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(SecureStore.getItem(tokenKey));

  const value = useMemo(
    () => ({
      token,
      setToken: (t: string) => {
        // validate with server first
      },
    }),
    []
  );

  return (
    <SessionContext.Provider value={null}>
      {initialized ? (
        children
      ) : (
        <ScreenView className="items-center justify-center p-4">
          <ActivityIndicator />
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
