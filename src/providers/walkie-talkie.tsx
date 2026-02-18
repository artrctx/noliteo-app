import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WalkieTalkie } from "../services/walkie-talkie/walkie-talkie";
import { useSession } from "./session-provider";

type WalkieTalkieContext = {
  status: "CONNECTING" | "OPERATIONAL" | "CLOSED" | "ERRORED";
  msg?: string;
  wt?: WalkieTalkie;
};

const WTCtx = createContext<WalkieTalkieContext | null>(null);

export function WalkieTalkieProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<WalkieTalkieContext["status"]>("CONNECTING");
  const [wt, setWalkieTalkie] = useState<WalkieTalkie>();
  const [msg, setMsg] = useState<string>();
  const { token } = useSession();

  useEffect(() => {
    if (wt || status !== "CONNECTING") return;
    void (async () => {
      const wt = new WalkieTalkie({ token: token + "2" });
      wt.registerOnOpen(() => {
        setWalkieTalkie(wt);
        setStatus("OPERATIONAL");
      });
      wt.registerOnError(() => setStatus("ERRORED"));
      wt.registerOnClose(({ reason }) => {
        setMsg(reason);
        setStatus("CLOSED");
      });
    })();
  }, []);

  const value = useMemo(() => ({ status, msg, wt }), [wt]);
  return <WTCtx.Provider value={value}>{children}</WTCtx.Provider>;
}

export function useWalkieTalkie() {
  const ctx = useContext(WTCtx);
  if (ctx === null) throw new Error("useWalkieTalkie needs to be used with WalkieTalkieProvider");
  return ctx;
}
