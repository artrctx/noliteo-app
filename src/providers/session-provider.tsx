import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { TextInput } from "../components/base/text-input";
import { ScreenView } from "../components/screen-view";

export type SessionCtx = {
  token: string | null;
  resetToken: () => Promise<void>;
};

const TOKEN_KEY = "CoreToken";

const SessionContext = createContext<SessionCtx | null>(null);

function SessionRegisterInput({
  requestRegister,
}: {
  requestRegister: (_tkn: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const [token, setToken] = useState<string>();

  const onSubmit = () => {
    if (pending || !token) return;
    startTransition(async () => requestRegister(token));
  };

  return (
    <>
      <TextInput
        placeholder="Token Please..."
        onChangeText={(txt: string) => {
          if (pending) return;
          setToken(txt);
        }}
      />
      <Pressable onPress={onSubmit}>{pending ? "Starting Session..." : "Register"}</Pressable>
    </>
  );
}

function SessionRegisterLoader() {
  return <ActivityIndicator />;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [{ initialized, error }, setSessionState] = useState<{
    initialized: boolean;
    error: string | null;
  }>({ initialized: false, error: null });
  const [token, setToken] = useState<string | null>(null);

  const requestRegister = useCallback(async (token: string) => {
    if (!initialized) return;
    // validate token
    // if validation fails should through toast
    SecureStore.setItem(TOKEN_KEY, token);
    setToken(token);
  }, []);

  const value = useMemo(
    () => ({
      token,
      resetToken: async () => {
        if (!initialized) return;
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
      },
    }),
    [token, initialized]
  );

  useEffect(() => {
    if (initialized) return;
    const token = SecureStore.getItem(TOKEN_KEY);

    if (token) {
    }

    // validate token
    setToken(token);
    setSessionState((prev) => ({ ...prev, initialized: true }));
  }, []);

  return (
    <SessionContext.Provider value={value}>
      {token ? (
        children
      ) : (
        <ScreenView className="items-center justify-center p-4">
          {initialized ? (
            <SessionRegisterInput requestRegister={requestRegister} />
          ) : (
            <SessionRegisterLoader />
          )}
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
