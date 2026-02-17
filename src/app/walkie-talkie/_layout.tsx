import { WalkieTalkieProvider } from "@/src/providers/walkie-talkie";
import { Slot } from "expo-router";

export default function WalkieTalkieLayout() {
  return (
    <WalkieTalkieProvider>
      <Slot />
    </WalkieTalkieProvider>
  );
}
