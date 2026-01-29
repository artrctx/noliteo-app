import { authClient } from "@/src/lib/auth/client";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (isPending || data) return;
    router.replace("/");
  }, [data, isPending]);

  return <Slot />;
}
