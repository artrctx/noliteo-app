import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { T } from "../components/base/text";
import { TextInput } from "../components/base/text-input";
import { ScreenView } from "../components/screen-view";
import { noliteo } from "../services/noliteo/noliteo";

export type SessionCtx = {
  token: string | null;
  ident: string | null;
  resetToken: () => Promise<void>;
};

const TOKEN_KEY = "NoliteoToken";

const SessionContext = createContext<SessionCtx | null>(null);

function SessionRegisterInput({
  generateToken,
}: {
  generateToken: (_tkn: string) => Promise<Error | null>;
}) {
  const [pending, setPending] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (pending || !token) return;
    if (error) setError(null);
    setPending(true);
    try {
      const genResult = await generateToken(token);
      if (genResult === null) return;
      setError(genResult.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <View className="items-center gap-y-2">
      {error && (
        <T className="text-center text-sm font-semibold text-red-600 dark:text-red-500">{error}</T>
      )}
      <TextInput
        className="w-40 border-b"
        placeholder="Token Please..."
        onChangeText={(txt: string) => {
          if (pending) return;
          if (error) setError(null);
          setToken(txt);
        }}
      />
      {token && token.length > 0 && (
        <Pressable onPress={onSubmit} className="rounded-sm border px-4 py-2">
          <T>{pending ? "Starting Session..." : "Register"}</T>
        </Pressable>
      )}
    </View>
  );
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitalized] = useState<boolean>(false);
  const [tokenInfo, setTokenInfo] = useState<{ token: string; ident: string } | null>(null);

  const generateToken = useCallback(
    async (tkn: string): Promise<Error | null> => {
      if (!initialized) return null;
      const genToken = await noliteo.token.generate(tkn);
      if (genToken.error) return genToken.error;
      // if validation fails should through toast
      SecureStore.setItem(TOKEN_KEY, genToken.data.jwt);
      setTokenInfo({ token: genToken.data.jwt, ident: genToken.data.ident });
      return null;
    },
    [initialized]
  );

  const value = useMemo(
    () => ({
      token: tokenInfo?.token ?? null,
      ident: tokenInfo?.ident ?? null,
      resetToken: async () => {
        if (!initialized) return;
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setTokenInfo(null);
      },
    }),
    [tokenInfo?.ident, tokenInfo?.token, initialized]
  );

  useEffect(() => {
    if (initialized) return;
    const token = SecureStore.getItem(TOKEN_KEY);
    if (!token) {
      setInitalized(true);
      return;
    }
    (async () => {
      const validationResult = await noliteo.token.validate(token);
      if (validationResult.error) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        // maybe show it in toast?
        console.error(validationResult.error);
        setInitalized(true);
        return;
      }
      setTokenInfo({ token, ident: validationResult.data.ident });
      setInitalized(true);
    })();
  }, []);

  return (
    <SessionContext.Provider value={value}>
      {tokenInfo ? (
        children
      ) : (
        <ScreenView className="items-center justify-center p-4">
          {initialized ? (
            <SessionRegisterInput generateToken={generateToken} />
          ) : (
            <ActivityIndicator />
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
