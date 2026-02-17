import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WalkieTalkie } from "../services/walkie-talkie/walkie-talkie";
import { useSession } from "./session-provider";

type WalkieTalkieContext = {
  initialized: boolean;
  wt?: WalkieTalkie;
};

const WTCtx = createContext<WalkieTalkieContext | null>(null);

export function WalkieTalkieProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<boolean>(false);
  const [wt, setWalkieTalkie] = useState<WalkieTalkie>();
  // const [error, setError] = useState<>
  const { token } = useSession();

  const value = useMemo(() => ({ initialized: !!wt }), [wt]);

  useEffect(() => {
    if (wt || pending) return;
    setPending(true);
    void (async () => {
      const inst = new WalkieTalkie(token);
    })();
  }, []);

  return <WTCtx.Provider value={value}>{children}</WTCtx.Provider>;
}

export function useWalkieTalkie() {
  const ctx = useContext(WTCtx);
  if (ctx === null) throw new Error("useWalkieTalkie needs to be used with WalkieTalkieProvider");
  return ctx;
}
